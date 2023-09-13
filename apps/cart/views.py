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