from flask import Flask, jsonify
from flask_restful import Resource, Api
import os, sys

flask_app = Flask(__name__)
flask_api = Api(flask_app)

class Menu(Resource):
    def __init__(self):
        self.tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

    def get(self):
        return self.tasks

base_endpoint = "/v1"
menu_endpoint = '/'.join((base_endpoint, "menu"))
print menu_endpoint
flask_api.add_resource(Menu, menu_endpoint)

if __name__ == '__main__':
    debug = os.environ.get('DEBUG')
    if debug:
        print 'debug'
        flask_app.run(debug=True)
    else:
        flask_app.run(host="0.0.0.0")
