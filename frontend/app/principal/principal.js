angular.module("SemPressao").controller("SemPressaoPrincipal", function($scope, $http, $location, $localStorage){
	let qtd_users = ()=>{
		$scope.qtd_user = 0;
		$http.get(config_server.init()+'/api/qtd_users').then((data)=>{
			countUp(data.data);
		});
	};
	qtd_users();


	let lista_usuarios=()=>{
		$http.get(config_server.init()+'/api/usuario').then((data)=>{
			$scope.listarUsers = data.data;
		});		
	};
	lista_usuarios();


	$scope.novo_usuario = (data)=>{
		if(data == 'undefined'){
			$scope.newuser = {};
			$('#modalNovoUsuario').modal('show');
		}else{
			$scope.newuser = data;
			$('#modalNovoUsuario').modal('show');
		}
	};


	$scope.cadastrar_usuario = (data)=>{	
		if(data.password != data.repeat_password){
			$scope.message = "Senhas não conferem";
			$('#modalError').modal('show');
			$scope.newuser.password = [];
			$scope.newuser.repeat_password = [];
		}else if(typeof(data.id) === 'undefined'){
			$http.post(config_server.init()+'/api/usuario', data).then((data)=>{
				if (data.data == "Existe"){
					$scope.message = "Email já cadastrado!";
					$('#modalError').modal('show');
				}else{
					$scope.message = "Usuário cadastrado com sucesso!";
					$('#modalNovoUsuario').modal('hide');
					$scope.newuser = {};
					$('#modalSucesso').modal('show');
					lista_usuarios();
					qtd_users();
				}
			});
		}else{
			$http.put(config_server.init()+'/api/usuario/'+data.id, data).then(()=>{
				$scope.message = "Usuário alterado com sucesso!";
				lista_usuarios();
				$('#modalNovoUsuario').modal('hide');
				$('#modalSucesso').modal('show');
			});
		}
	};

	$scope.logout = ()=>{
		$location.path('/');
		$http.get(config_server.init()+'/logout').then((data)=>{}).catch((data)=>{})
		delete $localStorage.authentication_token;
		delete $localStorage.user_id;
	};

	$scope.visualizar_usuario=(data)=>{
		$scope.user = data;
		$('#modalVisualizarUsuario').modal('show');
	};

	$scope.editar_usuario=(data)=>{
		$scope.newuser = data;
		$('#modalNovoUsuario').modal('show');
	};

	$scope.excluir_usuario=(data)=>{
		$('#modalDecisaoUsuario').modal('show');
		window.id_usuario_deletar=data;
	};

	$scope.decidi_excluir_usuario=(data)=>{
		$http.delete(config_server.init()+'/api/usuario/'+id_usuario_deletar).then((data)=>{
			$('#modalDecisaoUsuario').modal('hide');
			$scope.message = 'Usuário deletado com Sucesso.';
			$('#modalSucesso').modal('show');
			lista_usuarios();
			qtd_users();
		});
	};

	$scope.gerenciar_usuarios=function(){
		$('#modalGerenciaUsuario').modal('show');
	};
});