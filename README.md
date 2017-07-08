WheelAppeal
===================
This repository contains the code for the WheelAppeal mobile app, REST api, and website. This document will explain the usage of each component. First, clone the repository:

```
git clone https://github.com/tomplarge/wheelappeal.git
```
----------


Mobile App
-------------
You must have the following requirements:
- Xcode (latest version)
- React Native (see 'Building Projects with Native Code' at <href> <href> https://facebook.github.io/react-native/docs/getting-started.html </href>)

To run, do the following:
```
cd wheelappeal/mobile_app
react-native run-ios
```

This should start up a terminal window for the JS development server and an iPhone simulator containing the mobile app.

REST API
----------
The REST Api is used for querying our MySQL database for food truck data. Currently, the API can be reached by a GET request at the following address:
> ec2-13-59-2-226.us-east-2.compute.amazonaws.com/v1/menu

This API currently utilizes Docker as a container for the API and gunicorn as an HTTP server.

To run the API, you must have the following requirements:
- Docker (see <href> https://docs.docker.com/engine/installation/ </href>)

To run, do the following:
```
cd wheelappeal/api
docker build -t api .
docker run -p 80:5000 api
```
You should see messages indicating the docker container is running with the api. To confirm, open up another terminal window and run:
```
docker ps
```

You should see the container you just started as a running process. Then, to confirm the api is reachable, run:
```
curl localhost:80
```
You should see text returned.

Website
----------
The website currently holds information about WheelAppeal, and is hosted at <href> www.wheealappeal.co </href>

If you are starting up the server, you must have the following prerequisites:
- Django (see <href> https://docs.djangoproject.com/en/1.11/topics/install/ </href>)
- Nginx (see <href> https://www.nginx.com/resources/wiki/start/topics/tutorials/install/ </href>)

Then, to begin hosting the website, run the following:
```
cd wheelappeal/website
python manage.py runserver
```

To confirm the website is running properly, navigate to the following address in your browser:
```
localhost:80
```
