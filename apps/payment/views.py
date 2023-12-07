from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.cart.models import Cart, CartItem
from apps.orders.models import Order, OrderItem
from apps.product.models import Product
from apps.shipping.models import Shipping

from django.core.mail import send_mail
import braintree

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=settings.BT_ENVIRONMENT,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY
    )
)

class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try :
            token = gateway.client_token.generate()

            return Response(
                {'braintree_token': token},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving braintree token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        tax = 0.19

        shipping_id = request.query_params.get('shipping_id')
        shipping_id = str(shipping_id)

        try:
            cart = Cart.objects.get(user=user)

            # Revisar si existen items
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Need to have items in cart'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            cart_items = CartItem.objects.filter(cart=cart)

            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'A product with ID provided does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'Not enough items in stock'},
                        status=status.HTTP_200_OK
                    )
                
                total_amount = 0.0
                total_compare_amount = 0.0

                for cart_item in cart_items:
                    total_amount += (float(cart_item.product.price)
                                     * float(cart_item.count))
                    total_compare_amount += (float(cart_item.product.compare_price)
                                     * float(cart_item.count))
                    
                total_compare_amount = round(total_compare_amount, 2)
                original_price = round(total_amount, 2)

                # Posibles Cupones
                #
                #


                # impuesto estimado
                estimated_tax = round(total_amount * tax, 2)

                total_amount += (total_amount * tax)

                shipping_cost = 0.0
                # Verificar que el envio sea valido
                if Shipping.objects.filter(id__iexact=shipping_id).exists():
                    # Agregar shipping a total amount
                    shipping = Shipping.objects.get(id=shipping_id)
                    shipping_cost	 = shipping.price
                    total_amount += float(shipping_cost)

                total_amount = round(total_amount, 2)

                return Response(
                    {
                        'original_price': f'{original_price:.2f}',
                        'total_amount': f'{total_amount:.2f}',
                        'total_compare_amount': f'{total_compare_amount:.2f}',
                        'estimated_tax': f'{estimated_tax:.2f}',
                        'shipping_cost': f'{shipping_cost:.2f}',
                    },
                        status=status.HTTP_200_OK
                )

        except:
            return Response(
                {'error': 'Something went wrong when retrieving payment total information'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )