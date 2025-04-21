from django.db import models
from django.contrib.auth.models import User


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name
    
class Menu(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="menus")
    name = models.CharField(max_length=100)
    image_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.restaurant.name} - {self.name}"
    
class Dish(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="dishes")
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image_url = models.URLField(max_length=500, blank=True, null=True)
   
    def __str__(self):
        return f"{self.name} - {self.price}₸"

class ReviewManager(models.Manager):
    def good_reviews(self):
        return self.filter(rating=5)
    def bad_reviews(self):
        return self.filter(rating__lte=3)

class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects=ReviewManager()

    def __str__(self):
        return f"Review by {self.user.username} for {self.restaurant.name}"

