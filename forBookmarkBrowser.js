javascript:(function () {
  let scriptName = "questionManagement";
  let url = "https://anatoliy700.github.io/questionManagement/" + scriptName + ".js";
  if (typeof questionManagement === "undefined") {
    let e = document.createElement("script");
    e.src = url;
    e.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(e);
  }
})();