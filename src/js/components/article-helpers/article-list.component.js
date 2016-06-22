class ArticleListCtrl {
  constructor(Articles, $scope) {
    'ngInject';

    this._Articles = Articles;
    this.setListTo(this.listConfig);  
    
    $scope.$on('setListTo', (e, obj) => {
      this.setListTo(obj);
    })
    $scope.$on('setPageTo', (e, num) => {
      this.setPageTo(num);
    })
  }
  setListTo(newList) {
    this.list = [];
    this.listConfig = newList;
    this.runQuery();
  }
  setPageTo(num) {
    this.listConfig.currentPage = num;
    this.runQuery();
  }
  runQuery() {
    this.loading = true;
    let queryConfig = {
      type: this.listConfig.type,
      filters: this.listConfig.filters || {}
    };
    queryConfig.filters.limit = this.limit;
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
    this._Articles.query(queryConfig).then(
      (res) => {
        this.loading = false;
        this.list = res.articles;
        this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit);
      }
    );
  }
}

let ArticleList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: ArticleListCtrl,  
  templateUrl: 'components/article-helpers/article-list.html'
}

export default ArticleList;