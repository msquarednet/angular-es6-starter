import angular from 'angular';
import EditorConfig from './editor.config';
import EditorCtrl from './editor.controller';


let editorModule = angular.module('app.editor', [])
  .config(EditorConfig)
  .controller('EditorCtrl', EditorCtrl);


export default editorModule;