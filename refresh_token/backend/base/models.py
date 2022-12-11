from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()



class Contract(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='buyer')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='seller')
    body = models.TextField()

    buyer_state = models.CharField(max_length=100,
                                      choices=[('pending', 'pending'), ('accepted', 'accepted'), ('rejected', 'rejected')], 
        default='pending')



class Message(models.Model):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, null=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='receiver')
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body

    class Meta:
        ordering = ['timestamp']