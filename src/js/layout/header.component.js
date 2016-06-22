class AppHeaderCtrl {
  constructor(AppConstants, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;
    
    //the following is silly since 'show-authed' attr on navbar takes care of this, it seems
    $scope.$watch('User.current', (newval) => this.currentUser = newval)
    
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
