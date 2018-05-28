'use strict';

function alphabetizeBookNodes(a, b) {
  if (typeof a.title !== "undefined") {
    var aTitle = _removeArticles(a.title.toLowerCase()),
      bTitle = _removeArticles(b.title.toLowerCase());
  } else {
    var aTitle = _removeArticles(a.book.title.toLowerCase()),
      bTitle = _removeArticles(b.book.title.toLowerCase());
  }

  if (aTitle > bTitle) return 1;
  if (aTitle < bTitle) return -1;
  return 0;
}

function _removeArticles(str) {
  let words = str.split(" ");
  if (words.length <= 1) return str;
  if (words[0] == 'a' || words[0] == 'the' || words[0] == 'an') {
    return words.splice(1).join("");
  }
  return str;
}

module.exports = { alphabetizeBookNodes: alphabetizeBookNodes };