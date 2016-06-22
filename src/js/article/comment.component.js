class CommentCtrl {
  constructor(User){
    'ngInject';
    
    this.canModify = false;
    if (User.current) {
      this.canModify = (this.comment.author.username===User.current.username);
    }
  }
}

let Comment = {
  bindings: {
    comment: '=',
    deleteCb: '&'
  },
  templateUrl: 'article/comment.html',
  controller: CommentCtrl
}

export default Comment;





  /*
  // deleteComment(){   nah, follow tut, put this in ArticlCtrl, instead
  //   this.isDeleting = true;
  //   this._Comments.destroy(this.article.slug, this.comment.id).then(
  //     (res) => {
  //       this.isDeleting = false;  
  //       ////this._$state.go('app.home')
  //     },
  //     (err) => {
  //       this.isDeleting = false; // this._$state.go('app.home')
  //       console.log(err);
  //     }
  //   )
  // }
  */