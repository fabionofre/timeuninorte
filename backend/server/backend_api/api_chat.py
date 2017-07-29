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


def hello():
	msg = "teste"
	return msg