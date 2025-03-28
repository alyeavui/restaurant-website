from django.contrib import admin
from .models import Restaurant, Menu, Dish  # Import your models

admin.site.register(Restaurant)
admin.site.register(Menu)
admin.site.register(Dish)
