from django.db import models
from apps.product.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(user, on_delete=models.CASCADE)
    total_items = models.IntegerField(default=0)