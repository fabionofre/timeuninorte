angular.module("SemPressao").config(function($httpProvider){
	$httpProvider.interceptors.push("loadingInterceptor");
});