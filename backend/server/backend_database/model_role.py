from server import db, RoleMixin

class modelRole(db.Model, RoleMixin):
	__tablename__='role'
	id_tipo_usuario=db.Column(db.Integer(), primary_key=True)
	descricao=db.Column(db.String(255))