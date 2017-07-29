from flask import Blueprint, request, jsonify, \
	make_response
from flask_security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required, current_user, auth_token_required, \
    http_auth_required
from server import app,db
from server.backend_database.model_usuario import modelUsuario
from sqlalchemy import desc
import json

api_blueprint_usuario = Blueprint('api_blueprint_usuario',__name__)

def AtualizarData(data):
	if(data != None):
		return str(data.strftime('%d/%m/%Y'))
	else:
		return data

def ConverterData(data):
	strdata = data.split('/')
	dia = strdata[2]
	mes = strdata[1]
	ano = strdata[0]
	newdate = ano+'-'+mes+'-'+dia
	return newdate


@app.route('/api/usuario', methods=['GET'])
# @auth_token_required
def ListaUsuario():
	valores = []
	listausuario = modelUsuario.query.filter(
		modelUsuario.active=='True'
		).order_by(desc(modelUsuario.id))
	for und in listausuario:
		usuario = {
			'id':und.id,
			'nome_usuario':und.nome_usuario,
			'email':und.email,
			'telefone':und.telefone,
			'sexo':und.sexo,
			'data_nascimento':AtualizarData(und.data_nascimento)
		}
		valores.append(usuario)
	return jsonify(valores)

@app.route('/api/usuario/<int:id>', methods=['GET'])
# @auth_token_required
def UsuarioUnico(id):
	valores = []
	listausuario = modelUsuario.query.filter(
		modelUsuario.id==id,
		modelUsuario.active=='True'
		).all()
	for und in listausuario:
		usuario = {
			'id':und.id,
			'nome_usuario':und.nome_usuario,
			'email':und.email,
			'telefone':und.telefone,
			'sexo':und.sexo,
			'data_nascimento':und.data_nascimento.strftime('%d/%m/%Y'),
			'confirmed_at':und.confirmed_at.strftime('%d/%m/%Y')
		}
		valores.append(usuario)
	return jsonify(valores)
	
@app.route('/api/usuario', methods=['POST'])
# @auth_token_required
def InserirUsuario():
	nome_usuario=request.json.get('nome')
	email=request.json.get('email')
	password=request.json.get('password')
	data_nascimento=request.json.get('data_nascimento')
	sexo=request.json.get('sexo')
	telefone=request.json.get('telefone')
	active='True'
	confirmed_at='now()'
	result = modelUsuario.query.filter(
		modelUsuario.email == email,
		modelUsuario.active == 'true').count()
	if(result == 0):
		user = {
			'nome_usuario':nome_usuario,
			'email':email,
			'password':password,
			'data_nascimento':ConverterData(data_nascimento),
			'sexo':sexo,
			'telefone':telefone,
			'active':active,
			'confirmed_at':confirmed_at,
		}
		addUsuario=modelUsuario(**user)
		db.session.add(addUsuario)
		db.session.commit()
		msg = "Inserido com Sucesso!"
		return msg
	else:
		msg = "Existe"
		return msg
		


@app.route('/api/usuario/<int:id>', methods=['PUT'])
# @auth_token_required
def AtualizarUsuario(id):
	valores=request.json
	modelUsuario.query.filter(modelUsuario.id == id).update(valores)
	db.session.commit()
	msg = 'Atualizado com Sucesso!'
	return msg


@app.route('/api/usuario/<int:id>', methods=['DELETE'])
# @auth_token_required
def DeletarUsuario(id):
	user = {
		'active':False
	}
	modelUsuario.query.filter(modelUsuario.id==id).update(user)
	db.session.commit()
	msg='Deletado com Sucesso!'
	return msg

@app.route('/api/qtd_users', methods=['GET'])
# @auth_token_required
def QtdUsuario():
	result = modelUsuario.query.filter(
		modelUsuario.active == "True"
		).count()
	return str(result)