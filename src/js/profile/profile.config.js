function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true, //!!!!
    //url: '/profile',
    //url: '/profile/:username',  //normal
    url: '/@:username',            //sexy (?)
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {        //console.log('PROFILE RESOLVE');
        return Profile.get( $stateParams.username ).then(
          (res) => res,
          (err) => {console.log('ERR', err); return $state.go('app.home')}  
        )
      }
    }
  })
  
  .state('app.profile.main', {
    url: '',  //inherits url from above
    controller: 'ProfileArticlesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Profile...'
  })
  .state('app.profile.favorites', {
    url: '/favorites',  //inherits url from above
    controller: 'ProfileArticlesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Favorites...'
  });

};

export default ProfileConfig;
