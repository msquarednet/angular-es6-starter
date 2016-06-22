import angular from 'angular';
import ArticleConfig from './article.config';
import ArticleCtrl from './article.controller';
import ArticleActions from './article-actions.component';
import CommentComponent from './comment.component';


let articleModule = angular.module('app.article', [])
  .config(ArticleConfig)
  .controller('ArticleCtrl', ArticleCtrl)
  .component('articleActions', ArticleActions)
  .component('comment', CommentComponent);


export default articleModule;








// import angular from 'angular';

// // Create the module where our functionality can attach to
// let articleModule = angular.module('app.article', []);

// // Include our UI-Router config settings
// import ArticleConfig from './article.config';
// articleModule.config(ArticleConfig);


// // Controllers
// import ArticleCtrl from './article.controller';
// articleModule.controller('ArticleCtrl', ArticleCtrl);


// export default articleModule;
