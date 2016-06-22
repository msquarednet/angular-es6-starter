class Profile {
  constructor($http, AppConstants) {
    'ngInject';
    
    this._$http = $http;
    this._AppConstants = AppConstants;
    
  }
  get(uname) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + uname,
      method: 'GET'
    }).then(
      (res) => {
        //console.log('RES', res)
        return res.data.profile;
      }
    );  
  }
  follow(uname) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + uname + '/follow',
      method: 'POST'
    }).then((res) => res.data);  
  }
  unfollow(uname) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + uname + '/follow',
      method: 'DELETE'
    }).then((res) => res.data);  
  }
  
};


export default Profile;