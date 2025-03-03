# Generated by Django 5.1.6 on 2025-02-18 07:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wildfire',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=255)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('radius', models.PositiveIntegerField()),
                ('status', models.CharField(choices=[('Ongoing', 'Ongoing'), ('Inactive', 'Inactive')], default='Inactive', max_length=10)),
            ],
        ),
    ]
