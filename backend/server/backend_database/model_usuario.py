from server import db, UserMixin
from server.backend_database.model_role import modelRole

roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), 
        		db.ForeignKey('role.id_tipo_usuario')))

class modelUsuario(db.Model, UserMixin):
	__tablename__='user'
	id=db.Column(db.Integer, primary_key=True)
	nome_usuario=db.Column(db.String(80))
	email=db.Column(db.String(255))
	password=db.Column(db.String(255))
	data_nascimento=db.Column(db.DateTime())
	sexo=db.Column(db.String(1))
	telefone=db.Column(db.String(25))
	active=db.Column(db.Boolean())
	confirmed_at=db.Column(db.DateTime())
	roles = db.relationship('modelRole', secondary=roles_users,
                            backref=db.backref('user', lazy='dynamic'))
	