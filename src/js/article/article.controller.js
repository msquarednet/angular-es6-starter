import marked from 'marked';

class ArticleCtrl {
  constructor(article, User, Comments, $sce, $rootScope) {
    'ngInject';
    
    //console.log(article)
    
    this.article = article;
    this.article.body = $sce.trustAsHtml( marked(this.article.body, {sanitize: true}) );
    $rootScope.setPageTitle(this.article.title);
    
    this.currentUser = User.current;
    this._Comments = Comments;
    
    this.initCommentForm();
    this.getComments();
  }
  
  initCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }
  
  addComment() {
    this.commentForm.isSubmitting = true;
    this._Comments.add(this.article.slug, this.commentForm.body).then(
      res => {
        this.commentForm.isSubmitting = false;
        this.initCommentForm();
        this.getComments();
      }, 
      err => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;        
      }
    );
  }
  
  getComments() {
    this._Comments.getAll(this.article.slug).then(
      res => {
        //console.log(res)
        this.comments = res;
      },
      err => console.log(err)
    );
  }
  
  deleteComment(id, idx){
    //this.isDeleting = true;
    this._Comments.destroy(this.article.slug, id).then(
      (res) => {
        //this.isDeleting = false;  
        this.comments.splice(idx, 1);
      },
      (err) => {
        //this.isDeleting = false; // this._$state.go('app.home')
        console.log(err);
      }
    )
  }  
}


export default ArticleCtrl;
