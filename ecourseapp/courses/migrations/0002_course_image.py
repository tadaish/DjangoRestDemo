# Generated by Django 4.1.7 on 2023-02-19 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='image',
            field=models.ImageField(null=True, upload_to='courses/%Y/%M'),
        ),
    ]
