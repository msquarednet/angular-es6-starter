class ArticleActionsCtrl {
  constructor(User, Articles, $state){
    'ngInject';
    
    this._Articles = Articles;
    this._$state = $state;
    
    this.canModify = false;
    if (User.current) {
      this.canModify = (this.article.author.username===User.current.username);
    }
  }
  deleteArticle(){
    this.isDeleting = true;
    this._Articles.destroy(this.article.slug).then(
      (res) => {
        this.isDeleting = false;  
        this._$state.go('app.home')
      },
      (err) => {
        this.isDeleting = false; // this._$state.go('app.home')
        console.log(err);
      }
    )
  }
}

let ArticleActions = {
  bindings: {
    article: '='
  },
  controller: ArticleActionsCtrl,
  templateUrl: 'article/article-actions.html'
}

export default ArticleActions;