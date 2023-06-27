from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from apps.category.models import Category

from django.db.models import Q


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)

            product = ProductSerializer(product)

            return Response({'product': product.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Product with this ID does not exist'},
                status=status.HTTP_404_NOT_FOUND)
        
class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name'):
            sortBy = 'date_created'

        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6

        try:
            limit = int(limit)
        except:
            return Response(
                {'error': 'Limit must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        if limit <= 0:
            limit = 6
        
        if order == 'desc':
            sortBy = '-' + sortBy
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        else:
            products = Product.objects.order_by(sortBy).all()

        products = ProductSerializer(products, many=True)

        if products:
            return Response(
                {'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND
            )
        
class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        search = data['search']

        # Chequear si algo input ocurrio en la busqueda
        if len(search) == 0:
            # mostrar todos los productos si no hay input en la busqueda
            search_results = Product.objects.order_by('-date_created').all()
        else:
            # si hay criterio de busqueda filtrar a traves de descripcion tambien con nombre contiene
            search_results = Product.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search)
            )

        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True)
            return Response(
                {'search_products': search_results.data},
                status=status.HTTP_200_OK
            )
        
        # Revisar si existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        category = Category.objects.get(id=category_id)

        # Si la categoria tiene un padre, filtrar por la categoria y no el padre tambien
        if category.parent:
            search_results = search_results.order_by(
                '-date_created'
            ).filter(category=category)

        else:
            # Si esta categoria padre no tiene hijos filtrar solo la categoria
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by(
                '-date_created'
            ).filter(category=category)
            else:
                categories = Category.objects.filter(parent=category)
                filtered_categories = [category]

                for cat in categories:
                    filtered_categories.append(cat)

                filtered_categories = tuple(filtered_categories)

                search_results = search_results.order_by(
                '-date_created'
                ).filter(category__in=filtered_categories)
        
        search_results = ProductSerializer(search_results, many=True)
        return Response(
            {'search_products': search_results.data},
            status=status.HTTP_200_OK
        )
    
class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )
        # Existe product id
        if not Product.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'Product with this product ID does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        category = Product.objects.get(id=product_id).category

        if Product.objects.filter(category=category).exists():
            # Si la categoria tiene padre filtrar solo por la categoria y no del padre tambien
            if category.parent:
                related_products = Product.objects.order_by(
                    '-sold'
                ).filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = related_products.order_by(
                        '-sold'
                    ).filter(category=category)

                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)
                    
                    filtered_categories = tuple(filtered_categories)
                    related_products = related_products.order_by(
                        '-sold'
                    ).filter(category__in=filtered_categories)

            # Excluir producto que estamos viendo
            related_products = related_products.exclude(id=product_id)
            related_products = ProductSerializer(related_products, many=True)

            if len(related_products.data) >3:
                return Response(
                    {'related_products': related_products.data[:3]},
                    status=status.HTTP_200_OK
                )
            elif len(related_products.data) >0:
                return Response(
                    {'related_products': related_products.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'No related products found'},
                    status=status.HTTP_200_OK
                )
        else:
            return Response(
                {'error': 'No related products found'},
                status=status.HTTP_200_OK
            )