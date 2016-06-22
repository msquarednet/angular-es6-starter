function EditorConfig($stateProvider) {
  'ngInject';
  
  $stateProvider
  .state('app.editor', {
    url: '/editor/:slug',   //reminder, slug is optional  (new/edit)
    controller: 'EditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'editor/editor.html',
    title: 'Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      article: function(Articles, User, $state, $stateParams){
        if ($stateParams.slug) {
          return Articles.get($stateParams.slug)
            .then(res => {
              if (User.current.username===res.author.username) {
                return res; //article
              } else {
                $state.go('app.home')  //informative error should go here
              }
            }).catch(err => {
               $state.go('app.home')  //informative error should go here (slug typo?)
            }) 
        } else { 
          return null; 
        }
      }
    }
  });  
}


export default EditorConfig;