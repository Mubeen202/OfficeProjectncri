# Author ashsepra@gmail.com

# This load test for example

# Scope on load test at wikipedia



import time

from locust import HttpUser, TaskSet, task, between



class SubClassTest(TaskSet):



    @task

    def main_page(self):

        self.client.get('/api/jobs')



"""   @task(2)

    def perihal_page(self):

        self.client.get('/api/candidateSubmitApp') """




class MainClassTest(HttpUser):

    tasks = [SubClassTest]

    wait_time = between(5, 10)