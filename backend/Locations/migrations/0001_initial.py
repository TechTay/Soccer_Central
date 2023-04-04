# Generated by Django 4.2 on 2023-04-04 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
            ],
        ),
    ]
