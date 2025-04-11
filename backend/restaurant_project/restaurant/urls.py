from django.urls import path
from .views import restaurant_list, restaurant_menus, restaurant_menu_detail,RestaurantDetailView, ReviewAPIView, DishAPIView, ReviewsList

urlpatterns = [
    path('api/restaurants/', restaurant_list, name='restaurant-list'),
    path('api/restaurants/<int:restaurant_id>/menus/', restaurant_menus, name='restaurant-menus'),
    path('api/restaurants/<int:restaurant_id>/menus/<int:menu_id>/', restaurant_menu_detail, name='restaurant-menus'),
    path('api/restaurants/<int:restaurant_id>/menus/<int:menu_id>/dishes/', DishAPIView.as_view(), name='restaurant-menu-dishes'),
    path('api/restaurants/<int:id>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('api/restaurants/<int:restaurant_id>/reviews/', ReviewsList.as_view(), name='restaurant-reviews'),
    path('api/restaurants/<int:restaurant_id>/reviews/<int:review_id>/', ReviewAPIView.as_view(), name='restaurant-reviews'),
]