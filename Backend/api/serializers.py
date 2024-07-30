from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    CreatedAt = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ', read_only=True)  # Ensure ISO format

    class Meta:
        model = Product
        fields = '__all__'
