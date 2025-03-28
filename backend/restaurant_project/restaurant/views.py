from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Restaurant, Menu, Dish, Review
from .serializers import RestaurantSerializer, MenuSerializer, DishSerializer, ReviewSerializer

@api_view(['GET'])
def restaurant_list(request):
    restaurants = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def restaurant_menus(request, restaurant_id):
    menus = Menu.objects.filter(restaurant_id=restaurant_id)
    serializer = MenuSerializer(menus, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def restaurant_menu_dishes(request, restaurant_id, menu_id):
    dishes = Dish.objects.filter(menu__id=menu_id, menu__restaurant_id=restaurant_id)
    serializer = DishSerializer(dishes, many=True)
    return Response(serializer.data)

# Allow users to add reviews
class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


