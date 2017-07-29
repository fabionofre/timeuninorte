import os 
from flask_script import Manager
from flask_migrate import MigrateCommand, Migrate
from server import app, db 

APP_SETTINGS="config.Development"
app.config.from_object(APP_SETTINGS)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
	manager.run()

''' Instalar o gunicorn sempre na versão 19.6.0 (compatível com python 3.*, a versão atual aprenseta erro).'''