from django.core.management.base import BaseCommand

from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
from django.utils import timezone
from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Drop collections directly using pymongo to avoid Djongo ORM issues
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]
        for coll in ['activities', 'leaderboard', 'workouts', 'users', 'teams']:
            db[coll].drop()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel),
            User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel),
            User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc),
            User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc),
        ]

        # Create activities
        Activity.objects.create(user=users[0], type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Yoga', duration=20, date=timezone.now().date())

        # Create workouts
        Workout.objects.create(name='Super Strength', description='Strength workout for heroes', suggested_for='All')
        Workout.objects.create(name='Flight Training', description='Aerobic workout for flyers', suggested_for='DC')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
