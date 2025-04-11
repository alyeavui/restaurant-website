from rest_framework import serializers
from .models import Restaurant, Menu, Dish, Review
from django.contrib.auth.models import User

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

# 2 Serializer

class DishSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    price = serializers.DecimalField(max_digits=6, decimal_places=2)

    def create(self, validated_data):
        return Dish.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.menu = validated_data.get('menu', instance.menu)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.save()
        return instance

class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    restaurant = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    text = serializers.CharField()
    rating = serializers.IntegerField(min_value=1, max_value=5)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Review.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()
        return instance
