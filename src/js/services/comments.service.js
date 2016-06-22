class Comments {
  constructor($http, AppConstants) {
    'ngInject';
    
    this._AppConstants = AppConstants;
    this._$http = $http;    
  }
  add(slug, payload) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/comments',
      method: 'POST',
      data: {comment: {body: payload}}
    }).then((res) => res.data.comment);      
  }
  getAll(slug) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/comments',
      method: 'GET'
    }).then((res) => res.data.comments);      
  }
  destroy(slug, id) {
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/comments/' + id,
      method: 'DELETE'
    });//.then((res) => console.log('DELETE:',res));      
  }
}

export default Comments;