from django.db import models
from db_connection import db

# Define MongoDB collections and their schemas

# Collection for users
users_collection = db["users"]

# Collection for products
products_collection = db["products"]

# Collection for orders
orders_collection = db["orders"]

from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)