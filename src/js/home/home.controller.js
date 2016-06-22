class HomeCtrl {
  constructor(AppConstants, Tags, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    
    Tags.getAll().then(
      res => {this.tags = res; this.tagsLoaded=true;},
      err => console.log('ERR', err)
    )
    
    this.listConfig = {
      type: (User.current) ? 'feed' : 'all' 
    }

  }
  
  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
