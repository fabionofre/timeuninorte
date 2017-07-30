function RotasConfig($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/app/cliente/home.html',
		resolve:{
			lazy:['$ocLazyLoad', ($ocLazyLoad)=>{
				return $ocLazyLoad.load([{
					insertBefore:'#loadhome',
					name:'SemPressao',
					files:[
						'./app/cliente/src/bootstrap.min.css',
						'./app/cliente/src/style.css',
					]
				}])
			}]
		}
	})
	.when('/login', {
		templateUrl: '/app/login/login.html',
		controller: 'SemPressaoLogin',
		resolve:{
			lazy:['$ocLazyLoad', ($ocLazyLoad)=>{
				return $ocLazyLoad.load([{
					insertBefore:'#loadBefore',
					name:'SemPressao',
					files:[
						'./app/login/login.js',
						'./app/login/loginInterceptor.js'	
					]
				}])
			}]
		}

	})
	.when('/principal', {
		templateUrl: 'app/principal/principal.html',
		controller: 'SemPressaoPrincipal',
		resolve:{
			lazy:['$ocLazyLoad', ($ocLazyLoad)=>{
				return $ocLazyLoad.load([{
					insertBefore:'#loadBefore',
					name:'SemPressao',
					files:[
						'./app/principal/principal.js',	
					]
				}])
			}]
		}
	})
	.when('/gerenciar/usuario', {
		templateUrl: 'app/gerenciar/gerencia_usuario.html',
		controller: 'SemPressaoPrincipal',
		resolve:{
			lazy:['$ocLazyLoad', ($ocLazyLoad)=>{
				return $ocLazyLoad.load([{
					insertBefore:'#loadBefore',
					name:'SemPressao',
					files:[
						'./app/principal/principal.js',	
					]
				}])
			}]
		}
	})
	.when('/novo_cadastro', {
		templateUrl: 'app/novousuario/novo_usuario.html',
		controller: 'SemPressaoPrincipal',
		resolve:{
			lazy:['$ocLazyLoad', ($ocLazyLoad)=>{
				return $ocLazyLoad.load([{
					insertBefore:'#loadBefore',
					name:'SemPressao',
					files:[
						'./app/principal/principal.js',	
					]
				}])
			}]
		}
	})
	.when('/novo_chat', {
		templateUrl: 'app/chat/chat.html',
	})
};
angular.module("SemPressao",['ngRoute','ngStorage', 'oc.lazyLoad']);
angular
.module('SemPressao')
.config(RotasConfig)