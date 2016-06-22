class EditorCtrl {
  constructor(Articles, article, $state) {  //Articles=service, article = resolve
    'ngInject';
    
    this._Articles = Articles;
    this._$state = $state;
    
    this.article = article || {
      title:'', 
      description:'',
      body:'',
      tagList:[]
    };
  }
  addTag() {
    if (!this.article.tagList.includes(this.tagField)) {
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }
  removeTag(tagName) {
    this.article.tagList = this.article.tagList.filter(val=>val!==tagName);
  }
  submit() {
    this.isSubmitting = true;
    this._Articles.save(this.article)
      .then(res => {
        this.isSubmitting = false;
        //console.log(res);
        this._$state.go('app.article', {slug: res.slug})
      })
      .catch( err => {
        this.isSubmitting = false;
        // console.log(err);
        this.errors = err.data.errors;
      })
  }
}


export default EditorCtrl;