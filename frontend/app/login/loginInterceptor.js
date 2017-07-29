angular.module('SemPressao').config(function($httpProvider){
	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				if ($localStorage.authentication_token) {
					config.headers.authentication_token = $localStorage.authentication_token;
				} else {
					$location.path('/');
				}
				return config;
			},
			'responseError': function(response) {
				if(response.status === 401 || response.status === 403) {
					$location.path('/');
				}
				return $q.reject(response);
			}
		};
	}]);
	$httpProvider.interceptors.push('loadingInterceptor');
});