import angular from 'angular';
import AuthConfig from './auth.config';
import AuthCtrl from './auth.controller';

let authModule = angular.module('app.auth', []);
authModule.config(AuthConfig);
authModule.controller('AuthCtrl', AuthCtrl);



export default authModule;