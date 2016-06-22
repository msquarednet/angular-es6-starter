class ProfileCtrl {
  constructor(profile, User) {  // 'profile' comes from resolve (in config)
    'ngInject';
    
    this.profile = profile;
    
    if (User.current) {
      this.isUser = (User.current.username===this.profile.username);
    } else {
      this.isUser = false;
    }
    //console.log('isUser', this.isUser)

  }
}


export default ProfileCtrl;
