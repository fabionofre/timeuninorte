from server import db

class modelDados(db.Model):
	__tablename__='dados'
	id_dado=db.Column(db.Integer,primary_key=True)
	num_doentes=db.Column(db.Integer)
	recuperados=db.Column(db.Integer)