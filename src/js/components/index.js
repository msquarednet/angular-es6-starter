import angular from 'angular';
import ListErrors from './list-errors.component';
import ShowAuthed from './show-authed.directive';
import FollowBtn from './buttons/follow-btn.component';
import FavBtn from './buttons/favorite-btn.component';
import ArticleMeta from './article-helpers/article-meta.component';
import ArticlePreview from './article-helpers/article-preview.component';
import ArticleList from './article-helpers/article-list.component';
import ListPagination from './article-helpers/list-pagination.component';

let componentsModule = angular.module('app.components', [])
  .component('listErrors', ListErrors)
  .directive('showAuthed', ShowAuthed)
  .component('followBtn', FollowBtn)
  .component('favBtn', FavBtn)
  .component('articleMeta', ArticleMeta)
  .component('articlePreview', ArticlePreview)
  .component('articleList', ArticleList)
  .component('listPagination', ListPagination)

export default componentsModule;
