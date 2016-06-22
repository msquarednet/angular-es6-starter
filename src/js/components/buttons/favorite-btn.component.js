class FavBtnCtrl {
  constructor(User, Articles, $state) {
    'ngInject';
    
    this._User = User;
    this._Articles = Articles;
    this._$state = $state;

  }
  submit() {
    //console.log(this.article);
    
    this.isSubmitting = true;
    if(!this._User.current) {
      this._$state.go('app.register');
      return;
    }    
    if (this.article.favorited) {
      this._Articles.unfav(this.article.slug).then(
        res => {
          this.isSubmitting = false;
          this.article = res;
          //console.log('UNfav: ', res)
        }
      );
    } else {
      this._Articles.fav(this.article.slug).then(
        res => {
          this.isSubmitting = false;
          this.article = res;
          //console.log('FAV: ', res)
        }
      );
    }
  }
}

let FavBtn = {
  bindings: {
    article: '='
  },
  controller: FavBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html', 
  transclude: true
}

export default FavBtn;