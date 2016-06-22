import angular from 'angular';
import SettingsConfig from './settings.config';
import SettingsCtrl from './settings.controller';

let settingsModule = angular.module('app.settings', []);
settingsModule.config(SettingsConfig);
settingsModule.controller('SettingsCtrl', SettingsCtrl);


export default settingsModule;