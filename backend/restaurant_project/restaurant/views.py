from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Restaurant, Menu, Dish, Review
from .serializers import RestaurantSerializer, MenuSerializer, DishSerializer, ReviewSerializer, RegistrationSerializer
from .permissions import IsAdminOrOwner

from rest_framework_simplejwt.tokens import RefreshToken, TokenError


# Restaurant model: CBV + FBV
@api_view(['GET','POST'])
def restaurant_list(request):
    if request.method == 'GET':
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors)

class RestaurantDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field = 'id'

# Restaurant menus: full FBV
@api_view(['GET', 'POST'])
def restaurant_menus(request, restaurant_id):
    if request.method == 'GET':
        menus = Menu.objects.filter(restaurant_id=restaurant_id)
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(restaurant_id=restaurant_id)
            return Response(serializer.data)
        return Response(serializer.errors)
    
@api_view(['GET','PUT', 'DELETE'])
def restaurant_menu_detail(request, restaurant_id, menu_id):
    try:
        menu = Menu.objects.get(id=menu_id, restaurant_id=restaurant_id)
    except Menu.DoesNotExist:
        return Response({"error": "Menu not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MenuSerializer(instance=menu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        menu.delete()
        return Response({"message": "Menu deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# Full CBV
class DishAPIView(APIView):
    def get(self, request, restaurant_id, menu_id):
        dishes = Dish.objects.filter(menu__id=menu_id, menu__restaurant_id=restaurant_id)
        serializer = DishSerializer(dishes, many=True)
        return Response(serializer.data)

    def post(self, request, restaurant_id, menu_id):
        serializer = DishSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(menu_id=menu_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
# RUD With authenticated users
class ReviewAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOwner]

    def get(self, request, *args, **kwargs):
        review_id = kwargs.get('review_id', None)
        restaurant_id = kwargs.get('restaurant_id', None)
        review = get_object_or_404(Review, pk=review_id, restaurant=restaurant_id)
        return Response(ReviewSerializer(review).data)
    
    def put(self, request, *args, **kwargs):
        review_id = kwargs.get('review_id',None)
        restaurant_id = kwargs.get('restaurant_id',None)
        review = get_object_or_404(Review, pk=review_id, restaurant=restaurant_id)

        self.check_object_permissions(request,review)

        serializer = ReviewSerializer(instance=review, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        review_id = kwargs.get('review_id',None)
        restaurant_id = kwargs.get('restaurant_id',None)
        review = get_object_or_404(Review, pk=review_id, restaurant=restaurant_id)

        self.check_object_permissions(request,review)

        review.delete()
        return Response({'message': 'Review deleted successfully'})

# CR with authenticated users
class ReviewsList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]

    def get(self, request, *args, **kwargs):
        restaurant_id = kwargs['restaurant_id']
        # reviews = Review.objects.all()
        reviews = Review.objects.filter(restaurant_id=restaurant_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, restaurant_id, *args, **kwargs):
        restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, restaurant=restaurant)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User registration
class RegistrationView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = RegistrationSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'User created succesfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            return Response({"error": "Refresh token required."}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
