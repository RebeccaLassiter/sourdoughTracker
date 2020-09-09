import time
import os
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

###This section works!!

# app = Flask(__name__)

def get_env_variable(name):
	try:
		return os.environ[name]
	except KeyError:
		message = "Expected environment variable '{}' not set.".format(name)
		raise Exception(message)

# # the values of those depend on your setup
# DB_URL = get_env_variable("DATABASE_URL")
# # APP_SETTINGS = get_env_variable("APP_SETTINGS")
# # FLASK_ENV = get_env_variable("FLASK_ENV")
# # POSTGRES_URL = get_env_variable("POSTGRES_URL")
# print("database url is: ", DB_URL)
# # print(APP_SETTINGS)
# # print(FLASK_ENV)
# # print(POSTGRES_URL)
# #app.config.from_object(os.environ['APP_SETTINGS'])
# #app.config.from_object("config.DevelopmentConfig")
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)



DB_URL = get_env_variable("DATABASE_URL")
print("db url is: ", DB_URL)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL #os.environ["DATABASE_URL"] #postgresql://postgres:postgres@localhost:5432/sourdoughDB"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class CarsModel(db.Model):
	__tablename__ = 'carsTest3'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String())
	model = db.Column(db.String())
	doors = db.Column(db.Integer())

	def __init__(self, name, model, doors):
		self.name = name
		self.model = model
		self.doors = doors

	def __repr__(self):
		return f"<Car {self.name}>"


@app.route('/cars', methods=['POST', 'GET'])
def handle_cars():
	if request.method == 'POST':
		if request.is_json:
			data = request.get_json()
			new_car = CarsModel(name=data['name'], model=data['model'], doors=data['doors'])
			db.session.add(new_car)
			db.session.commit()
			print('commited')
			return {"message": f"car {new_car.name} has been created successfully."}
		else:
			return {"error": "The request payload is not in JSON format"}

	elif request.method == 'GET':
		cars = CarsModel.query.all()
		results = [
			{
				"name": car.name,
				"model": car.model,
				"doors": car.doors
			} for car in cars]

		return {"count": len(results), "cars": results}


# @app.route('/cars/<car_id>', methods=['GET', 'PUT', 'DELETE'])
# def handle_car(car_id):
#     car = CarsModel.query.get_or_404(car_id)

#     if request.method == 'GET':
#         response = {
#             "name": car.name,
#             "model": car.model,
#             "doors": car.doors
#         }
#         return {"message": "success", "car": response}

#     elif request.method == 'PUT':
#         data = request.get_json()
#         car.name = data['name']
#         car.model = data['model']
#         car.doors = data['doors']
#         db.session.add(car)
#         db.session.commit()
#         return {"message": f"car {car.name} successfully updated"}

#     elif request.method == 'DELETE':
#         db.session.delete(car)
#         db.session.commit()
#         return {"message": f"Car {car.name} successfully deleted."}


@app.route('/space')
def get_current_time():
	return {'time': time.time()}


