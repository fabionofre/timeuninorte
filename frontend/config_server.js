class config_server{
	static init(){
		let host = '172.16.60.78';
		let port = 5000;
		return `http://${host}:${port}`;
	}
};