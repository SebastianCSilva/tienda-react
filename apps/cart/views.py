from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Cart, CartItem

from apps.product.models import Product
from apps.product.serializers import ProductSerializer

class GetItemsView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.order_by('product').filter(cart=cart)

            result = []

            if CartItem.objects.filter(cart=cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)
            return Response({'cart': result}, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong whrn retrieving cart items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AddItemView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        count = 1

        try:
            if not Product.object.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)

            cart = Cart.objects.get(user=user)

            if CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {'error': 'Item is already in cart'},
                    status=status.HTTP_409_CONFLICT
                )
            
            if int(product.quantity)>0:
                CartItem.objects.create(
                    product=product,
                    cart=cart,
                    count=count
                )

                if CartItem.objects.filter(cart=cart, product=product).exists():
                    total_items = int(cart.total_items) +1
                    Cart.objects.filter(user=user).update(
                        total_items=total_items
                    )

                    cart_items = CartItem.objects.order_by(
                        'product').filter(cart=cart)
                    
                    result = []

                    for cart_item in cart_items:
                        item = {}

                        item['id'] = cart_item.id
                        item['count'] = cart_item.count
                        product = Product.objects.get(id=cart_item.product.id)
                        product = ProductSerializer(product)

                        item['product'] = product.data

                        result.append(item)

                    return Response({'cart': result}, status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {'error': 'Not enough of this item in stock'},
                        status=status.HTTP_200_OK
                    )

        except:
            return Response(
                {'error': 'Something went wrong when adding item to cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class GetTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)

            total_cost = 0.0
            total_compare_cost = 0.0

            if cart_items.exists():
                for cart_item in cart_items:
                    total_cost += (float(cart_item.product.price)
                                   * float(cart_item.count))
                    
                    total_compare_cost += (float(cart_item.product.compare_price)
                                           * float(cart_item.count))
                    
                total_cost = round(total_cost, 2)
                total_compare_cost = round(total_compare_cost, 2)
            return Response(
                {'total_cost': total_cost, 'total_compare_cost': total_compare_cost},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving total costs'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )