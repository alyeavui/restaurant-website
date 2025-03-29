from django.urls import path
from .views import restaurant_list, restaurant_menus, restaurant_menu_dishes, RestaurantDetailView

urlpatterns = [
    path('api/restaurants/', restaurant_list, name='restaurant-list'),
    path('api/restaurants/<int:restaurant_id>/menus/', restaurant_menus, name='restaurant-menus'),
    path('api/restaurants/<int:restaurant_id>/menus/<int:menu_id>/dishes/', restaurant_menu_dishes, name='restaurant-menu-dishes'),
     path('api/restaurants/<int:id>/', RestaurantDetailView.as_view(), name='restaurant-detail'),
]
