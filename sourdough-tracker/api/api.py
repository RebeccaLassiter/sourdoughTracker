import time
import os
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


def get_env_variable(name):
	try:
		return os.environ[name]
	except KeyError:
		message = "Expected environment variable '{}' not set.".format(name)
		raise Exception(message)


DB_URL = get_env_variable("DATABASE_URL")
print("db url is: ", DB_URL)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL #os.environ["DATABASE_URL"] #postgresql://postgres:postgres@localhost:5432/sourdoughDB"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class BakesModel(db.Model):
	__tablename__ = 'bakes'

	id = db.Column(db.Integer, primary_key=True)
	gramsFlour = db.Column(db.Float())
	gramsWater = db.Column(db.Float())
	gramsStarter = db.Column(db.Float())

	numStretchFold = db.Column(db.Integer())

	autolyseTime = db.Column(db.Float())
	bulkFermentTime = db.Column(db.Float())
	bakeTime = db.Column(db.Float())

	overallQuality = db.Column(db.Integer())
	rise = db.Column(db.Integer())
	crumb = db.Column(db.Integer())
	crust = db.Column(db.Integer())
	flavor = db.Column(db.Integer())

	def __init__(self, gramsFlour, gramsWater, gramsStarter, numStretchFold, autolyseTime, bulkFermentTime, bakeTime, overallQuality, rise, crumb, crust, flavor):
		self.gramsFlour = gramsFlour
		self.gramsWater = gramsWater
		self.gramsStarter = gramsStarter

		self.numStretchFold = numStretchFold
		self.autolyseTime = autolyseTime
		self.bulkFermentTime = bulkFermentTime
		self.bakeTime = bakeTime

		self.overallQuality = overallQuality
		self.rise = rise
		self.crumb = crumb
		self.crust = crust
		self.flavor = flavor


	def __repr__(self):
		#maybe give the bakes names? do something with this..
		return f"<Bake {self.gramsFlour}>"


@app.route('/bakes', methods=['POST', 'GET'])
def handle_bakes():
	if request.method == 'POST':
		if request.is_json:
			data = request.get_json()
			new_bake = BakesModel(gramsFlour=data['gramsFlour'], gramsWater = data['gramsWater'], gramsStarter = data['gramsStarter'], numStretchFold = data['numStretchFold'], autolyseTime = data['autolyseTime'], bulkFermentTime = data['bulkFermentTime'], bakeTime = data['bakeTime'], overallQuality = data['overallQuality'], rise = data['rise'], crumb = data['crumb'], crust = data['crust'], flavor = data['flavor'])
			db.session.add(new_bake)
			db.session.commit()
			print('commited')
			return {"message": f"bake has been created successfully."}
		else:
			return {"error": "The request payload is not in JSON format"}

	elif request.method == 'GET':
		bakes = BakesModel.query.all()
		results = [
			{
				"gramsFlour": bake.gramsFlour,
				"gramsWater": bake.gramsWater,
				"gramsStarter": bake.gramsStarter,
				"numStretchFold": bake.numStretchFold,
				"autolyseTime": bake.autolyseTime,
				"bulkFermentTime": bake.bulkFermentTime,
				"bakeTime": bake.bakeTime,
				"overallQuality": bake.overallQuality, 
				"rise": bake.rise,
				"crumb": bake.crumb,
				"crust": bake.crust, 
				"flavor": bake.flavor 
			} for bake in bakes]

		return {"count": len(results), "bakes": results}


@app.route('/space')
def get_current_time():
	return {'time': time.time()}


