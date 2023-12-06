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