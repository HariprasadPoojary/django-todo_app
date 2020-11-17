from django.db import models

# Create your models here.
class Todo(models.Model):

    STATE_MODEL = (
        ("P", "Pending"),
        ("IP", "In-Progress"),
        ("C", "Completed"),
    )

    TAG = (
        ("Important", "Important"),
        ("Urgent", "Urgent"),
    )

    title = models.CharField(max_length=120, null=False)
    state = models.CharField(max_length=15, choices=STATE_MODEL)
    tag = models.CharField(max_length=15, choices=TAG, null=True)

    def __str__(self) -> str:
        return self.title