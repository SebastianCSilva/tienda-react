from django.db import models
from apps.product.models import Product
from .countries import Countries
from datetime import datetime
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        not_processed = 'not_processed'
        processed = 'processed'
        shipping = 'shipping'
        delivered = 'delivered'
        cancelled = 'cancelled'

