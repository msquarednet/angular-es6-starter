class SettingsCtrl {
  constructor(User, $state) {
    'ngInject';
    this._User = User;
    this._$state = $state;
    //console.log(User.current)
    this.formData = {
      image: User.current.image,
      username: User.current.username,
      bio: User.current.bio, 
      email: User.current.email         
    };
    this.logout = User.logout.bind(User);
    // this.submitForm = User.updateUser.bind(User, this.formData);
  }
  submitForm() {
    this.isSubmitting = true;
    this._User.updateUser(this.formData)
      .then(res => {
        // console.log('update complete!', res);
        //this._$state.go('app.home');
        this.isSubmitting = false;
        this._$state.go('app.profile.main', {username: res.username});  //url-param thingy
      }).catch(err => {
        // console.log('ERRORs!', err);
        this.isSubmitting = false;
        this.errors = err.data.errors;
      });
  }
  
  /*
  // constructor(User) {
  //   'ngInject';
    
  //   this._User = User;
  //   this.init();
  // }
  // init() {
  //   let c = this._User.current;
  //   this.formData = {
  //     image: c.url,
  //     username: c.username,
  //     bio: c.bio, 
  //     email: c.email      
  //   };
  // }
  // logout(){    this._User.logout();  }
  */
}


export default SettingsCtrl;