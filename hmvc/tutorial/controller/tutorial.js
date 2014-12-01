const mongoose = require('mongoose');
const Article = require('../models/article');
const Task = require('../models/task');
const _ = require('lodash');
const ArticleRenderer = require('../renderer/articleRenderer');

exports.get = function *get(next) {

  /*
  var renderedArticle = yield CacheEntry.getOrGenerate({
    key:  'article:rendered:' + this.params.slug,
    tags: ['article']
  }, _.partial(renderArticle, this.params.slug));
*/

  var locals = yield* renderTutorial();
  locals.sitetoolbar = true;

  this.body = this.render('tutorial', locals);
};

// body
// metadata
// modified
// title
// isFolder
// prev
// next
// path
// siblings
function* renderTutorial() {
  const tree = yield* Article.findTree();

  var treeRendered = yield* renderTree(tree);

  console.log(treeRendered);
  var result = {
    js: treeRendered[0],
    ui: treeRendered[1],
    more: treeRendered[2]
  };

  // render top-level content
  for (var key in result) {
    var child = result[key];
    yield* populateContent(child);
  }

  // and render "more" content
  for (var i = 0; i < result.more.children.length; i++) {
    var child = result.more.children[i];
    yield* populateContent(child);
  }

  return result;

}


function* renderTree(tree) {
  var children = [];

  for (var i = 0; i < tree.children.length; i++) {
    var child = tree.children[i];

    var childRendered = {
      id: child._id,
      url:   Article.getUrlBySlug(child.slug),
      title: child.title
    };

    if (child.isFolder) {
      childRendered.children = yield* renderTree(child);
    }

    children.push(childRendered);

  }
  return children;
}


function* populateContent(articleObj) {
  var article = yield Article.findById(articleObj.id).exec();
  var renderer = new ArticleRenderer();
  articleObj.body = yield renderer.render(article);
}