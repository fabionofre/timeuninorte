function ConfigLogin ($scope, $http, $location, $localStorage) {
	delete $localStorage.authentication_token;
	delete $localStorage.user_id;
	$scope.login=(dadosLogin)=>{
		$http.post(config_server.init()+'/login', dadosLogin).then((data)=>{
				$localStorage.user_id = data.data.response.user.id;
				$localStorage.authentication_token = data.data.response.user.authentication_token;
				$location.path("/principal");
		}).catch((data, status)=>{
			if (data.data.response.errors.email || data.data.response.errors.password){
				$scope.menssagem = "Email ou Senha Inválido";
			}
		});
	}
};

angular
	.module('SemPressao')
	.controller('SemPressaoLogin', ConfigLogin)