var highlighter = function (resultItem) {
  resultItem.matches.forEach((matchItem) => {
    var text = resultItem.item[matchItem.key];
    var result = [];
    var matches = [].concat(matchItem.indices);
    var pair = matches.shift();
    for (var i = 0; i < text.length; i++) {
      var char = text.charAt(i);
      if (pair && i == pair[0]) {
        result.push("<b>");
      }
      result.push(char);
      if (pair && i == pair[1]) {
        result.push("</b>");
        pair = matches.shift();
      }
    }
    resultItem.highlight = result.join("");
    if (resultItem.children && resultItem.children.length > 0) {
      resultItem.children.forEach((child) => {
        highlighter(child);
      });
    }
  });
};

export default highlighter;
