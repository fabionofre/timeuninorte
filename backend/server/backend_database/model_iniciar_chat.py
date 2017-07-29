from server import db
from server.backend_database.model_usuario import modelUsuario
from server.backend_database.model_chat import modelChat

class modelIniciarChat(db.Model):
	__tablename__='iniciar_chat'
	id_inciar_chat=db.Column(db.Integer,primary_key=True)
	id_usuario=db.Column(db.ForeignKey('user.id'))
	id_chat=db.Column(db.ForeignKey('chat.id_chat'))
	init_chat_and_usuario = db.relationship('modelUsuario')
	init_chat_and_chat = db.relationship('modelChat')
