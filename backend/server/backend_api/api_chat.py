from flask import Blueprint, request, jsonify, \
	make_response
from flask_security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required, current_user, auth_token_required, \
    http_auth_required
from server import app,db
from server.backend_database.model_chat import modelChat
import json
from server.backend_database.model_usuario import modelUsuario
from sqlalchemy import asc, desc
api_blueprint_chat = Blueprint('api_blueprint_chat',__name__)

@app.route('/api/chat', methods=['GET'])
def mensagens():
	valores = []
	lista_mensagens = modelChat.query.filter(
			modelChat.activate == 'true',
			modelChat.cod_usuario == modelUsuario.cod_usuario
		)
	for und in lista_mensagens:
		json={
			'id_menssagem':und.id_chat,
			'id_usuario':und.id_usuario,
			'menssagem':und.menssagem,
			'data_hora':und.data_hora,
		}
		valores.append(json)
	return jsonify(valores)

# @app.route('/api/chat/<int:>', methods=['GET'])
# def mensagens():
# 	valores = []
# 	lista_mensagens = modelChat.query.filter(
# 			modelChat.activate == 'true',
# 			modelChat.cod_usuario == modelUsuario.cod_usuario
# 		)
# 	for und in lista_mensagens:
# 		json={
# 			'id_menssagem':und.id_chat,
# 			'id_usuario':und.id_usuario,
# 			'menssagem':und.menssagem,
# 			'data_hora':und.data_hora,
# 		}

# 		valores.append(json)
# 	return jsonify(valores)