from django.urls import path
# from .views import restaurant_list, restaurant_menus, restaurant_menu_detail,RestaurantDetailView, ReviewAPIView, DishAPIView, ReviewsList
from . import views

urlpatterns = [
    path('api/restaurants/', views.restaurant_list, name='restaurant-list'),
    path('api/restaurants/<int:restaurant_id>/menus/', views.restaurant_menus, name='restaurant-menus'),
    path('api/restaurants/<int:restaurant_id>/menus/<int:menu_id>/', views.restaurant_menu_detail, name='restaurant-menus'),
    path('api/restaurants/<int:restaurant_id>/menus/<int:menu_id>/dishes/', views.DishAPIView.as_view(), name='restaurant-menu-dishes'),
    path('api/restaurants/<int:id>/', views.RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('api/restaurants/<int:restaurant_id>/reviews/', views.ReviewsList.as_view(), name='restaurant-reviews'),
    path('api/restaurants/<int:restaurant_id>/reviews/<int:review_id>/', views.ReviewAPIView.as_view(), name='restaurant-reviews'),
    path('api/registration/', views.RegistrationView.as_view(), name='registration')
]