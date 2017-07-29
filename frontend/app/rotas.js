function RotasConfig($routeProvider) {
	$routeProvider
	.when('/', {
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
};
angular.module("SemPressao",['ngRoute','ngStorage', 'oc.lazyLoad']);
angular
.module('SemPressao')
.config(RotasConfig)