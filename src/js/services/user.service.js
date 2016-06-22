class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
    this._$state = $state;
    this._$q = $q;
    
    this.current = null;    
  }
  attemptAuth(type, credentials) {
    let route = (type==='login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this.current = res.data.user; //'this' is okay, not self=this alternative
        this._JWT.save(res.data.user.token);
        return res;
      }
    )
  }
  
  updateUser(fields) {
    return this._$http({
      url: this._AppConstants.api + '/user',
      method: 'PUT',
      data: {
        user: fields
      }      
    }).then(
      (res) => {
        this.current = res.data.user;
        return res.data.user;
      }
    );//.catch(err => console.log(err));  //NO!! this prevents 'password too short', etc erros
  }
  
  logout() {
    this._JWT.destroy();
    this.current = null;
    this._$state.go(this._$state.$current, null, {reload:true});
  }
  verifyAuth() {
    let dfd = this._$q.defer();

    // Check for JWT token first
    if (!this._JWT.get()) {
      dfd.resolve(false);
      return dfd.promise;
    }

    // If there's a JWT & user is already set
    if (this.current) {
      dfd.resolve(true);

    // If current user isn't set, get it from the server.
    // If server doesn't 401, set current user & resolve promise.
    } else {
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
        // headers: {   // no longer needed due to $http interceptor (auth.interceptor used in app.config)
        //   Authorization: 'Token ' + this._JWT.get()
        // }
      }).then(
        (res) => {
          this.current = res.data.user;
          dfd.resolve(true);
        },
        // If an error happens, that means the user's token was invalid.
        (err) => {
          this._JWT.destroy();
          dfd.resolve(false);
        }
        // Reject automatically handled by auth interceptor
        // Will boot them to homepage
      );
    }

    return dfd.promise;
  }  
  ensureAuthIs(bool){
    let dfd = this._$q.defer();
    this.verifyAuth()
      .then(
        (authValid) => {
          if (authValid !== bool) {
            this._$state.go('app.home');
            dfd.resolve(false);
          } else {
            dfd.resolve(true);
          }
        }
      );
    return dfd.promise;
  }
  
}

export default User; 
