from server import db
from server.backend_database.model_usuario import modelUsuario

class modelChat(db.Model):
	__tablename__='chat'
	id_chat=db.Column(db.Integer,primary_key=True)
	id_usuario=db.Column(db.Integer,db.ForeignKey('user.id'))
	mensagem=db.Column(db.Text())
	data_hora=db.Column(db.DateTime())
	activate=db.Column(db.Boolean())
	chat_and_usuario = db.relationship('modelUsuario')
