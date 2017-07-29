from flask import Flask
from flask_wtf import FlaskForm
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy import desc
from flask_security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask_cors import CORS

app = Flask("server")
CORS(app)

APP_SETTINGS="config.Config"
app.config.from_object(APP_SETTINGS)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

'''Declarações dos Models'''
from server.backend_database.model_usuario import modelUsuario
from server.backend_database.model_chat import modelChat
from server.backend_database.model_role import modelRole
from server.backend_database.model_iniciar_chat import modelIniciarChat

'''Declaração Flask_Security'''
user_datastore = SQLAlchemyUserDatastore(db, modelUsuario, modelRole)
security = Security(app, user_datastore)

'''import blueprint'''
from server.backend_api.api_chat import api_blueprint_chat
from server.backend_api.api_usuario import api_blueprint_usuario

'''Declarações Blueprints'''
app.register_blueprint(api_blueprint_chat)
app.register_blueprint(api_blueprint_usuario)