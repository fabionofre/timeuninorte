import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
	PORT = 5000
	THREADED = True
	DEBUG = False
	TESTING = False
	CSRF_ENABLED = True
	SQLALCHEMY_DATABASE_URI = \
		'postgresql://postgres:root@localhost:5432/db_sempressao'
	SECRET_KEY = 'KJwkjadWURdhsdwEy' 
	WTF_CSRF_ENABLED = False
	SECURITY_PASSWORD_HASH = 'pbkdf2_sha512'
	SECURITY_PASSWORD_SALT = 'server'

class Development(Config):
	DEVELOPMENT = True 
	DEBUG = True