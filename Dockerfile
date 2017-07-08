FROM ubuntu:14.04

WORKDIR /
ADD . /

RUN apt-get update
RUN apt-get install -y nginx python python-dev python-setuptools 
RUN apt-get install -y python-pip
RUN pip install --upgrade pip

RUN pip install gunicorn django
EXPOSE 8000
CMD ["sh","-c"," gunicorn --pythonpath '/home/ec2-user/wheelappeal/website' website.wsgi:application"]
