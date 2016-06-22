class Articles{
  constructor($http, AppConstants, $q) {
    'ngInject';
    
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q
    
  }
  get(slug) {
    let d = this._$q.defer();
    if (!slug) {
      d.reject('Article slug is empty');
      return d.promise;
    }
    this._$http({
      url: `${this._AppConstants.api}/articles/${slug}`,
      method: 'GET'
    }).then(
      res => d.resolve(res.data.article),
      err => d.reject(err)
    );
    return d.promise;
    // return this._$http({
    //   url: `${this._AppConstants.api}/articles/${slug}`,
    //   method: 'GET'
    // }).then(res => res.data.article);
  }
  /* Config object spec: {
    type: String [REQUIRED] - Accepts "all", "feed"
    filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
  } */
  query(config) {
    let req = {
      url: this._AppConstants.api + '/articles/' + ((config.type==='feed') ? 'feed' : ''),
      method: 'GET',
      params: config.filters ? config.filters : null
    }
    // console.log(config)
    // console.log(req)
    return this._$http(req).then(
      res => res.data
    );
  }
  
  destroy(slug) {
    return this._$http({
      url: `${this._AppConstants.api}/articles/${slug}`,
      method: 'DELETE'
    })//.then(res => console.log('deleted article ', res));
  }
  save(article){
    //insert
    let req = {
      url: `${this._AppConstants.api}/articles`,
      method: 'POST',
      data: {article: article}
    };
    //update
    if (article.slug) {      
      req = {
        url: `${this._AppConstants.api}/articles/${article.slug}`,
        method: 'PUT',
        data: {article: article}
      };
      delete article.slug;  //bogus, should be handled on server, in my opinion
    }
    return this._$http(req).then(res => res.data.article)
  }
  
  fav(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/favorite',
      method: 'POST'
    }).then((res) => res.data.article);  
  }
  unfav(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/favorite',
      method: 'DELETE'
    }).then((res) => res.data.article);  
  }  
  

}


export default Articles;