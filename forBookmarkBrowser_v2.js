javascript:(function () {
  let settings = {};
  let scriptName = "questionManagement_v2";
  let url = "https://anatoliy700.github.io/questionManagement/" + scriptName + ".js";
  if (typeof questionManagement === "undefined") {
    let el = document.createElement("script");
    el.src = url;
    el.type = "text/javascript";
    el.addEventListener('load', e => {
      questionManagement.init(settings)
    });
    document.getElementsByTagName("body")[0].appendChild(el);
  }
})();