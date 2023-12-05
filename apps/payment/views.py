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

