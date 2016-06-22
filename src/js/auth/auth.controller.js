class AuthCtrl {
  constructor(User, $state) {
    'ngInject';
    this._User = User;
    this._$state = $state;
    
    this.isSubmitting = false;
    this.formData = {};
    
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    
  }
  submitForm() {
    this.isSubmitting = true;
    console.dir(this.formData)
    this._User.attemptAuth(this.authType, this.formData)
      .then(
        (res) => {
          // this.isSubmitting = false;
          // console.log("RES", res);
          this._$state.go('app.home');
        }
      )
      .catch(
        (err) => {
          this.isSubmitting = false;
          console.log("ERR", err.data.errors);
          this.errors = err.data.errors;
        }
      )
  }
}


export default AuthCtrl;