"use strict";
const storage = chrome.storage.local;
const titleInput = document.getElementById("title");
const setTitleButton = document.querySelector("button.set-title");
const saveButtonCSS = document.querySelector("button.save-css");
const clearButtonCSS = document.querySelector("button.clear-css");
const resetButtonCSS = document.querySelector("button.reset-css");
const textareaCSS = document.querySelector("textarea.css");
const textareaJS = document.querySelector("textarea.js");
const saveButtonJS = document.querySelector("button.save-js");
const clearButtonJS = document.querySelector("button.clear-js");
const resetButtonJS = document.querySelector("button.reset-js");

setTitleButton.addEventListener("click", setTitle);
saveButtonCSS.addEventListener("click", saveStyles);
clearButtonCSS.addEventListener("click", clearStyles);
resetButtonCSS.addEventListener("click", resetStyles);
saveButtonJS.addEventListener("click", saveJS);
clearButtonJS.addEventListener("click", clearJS);
resetButtonJS.addEventListener("click", resetJS);

loadTitle();
loadStyles();
loadJS();

function loadTitle() {
  storage.get("title", function (titleObj) {
    titleInput.value = titleObj.title;
  });
}

function loadStyles() {
  storage.get("css", function (style) {
    if (style.css) {
      textareaCSS.value = style.css;
    }
  });
}

function loadJS() {
  storage.get("js", function (script) {
    if (script.js) {
      textareaJS.value = script.js;
    }
  });
}

function setTitle() {
  storage.set({ title: titleInput.value }, function () {
    notify("Title was updated");
  });
}

function saveStyles() {
  const styles = textareaCSS.value;
  if (!styles) {
    return notify("Error! Please provide some styles.", true);
  }

  storage.set({ css: styles }, function () {
    notify("Styles was saved");
  });
}

function resetStyles() {
  storage.get("defaultCSS", function (defaultStyles) {
    const defaultCSS = defaultStyles.defaultCSS;
    storage.set({ css: defaultCSS }, function () {
      textareaCSS.value = defaultCSS;
      notify("Styles was reset");
    });
  });
}

function clearStyles() {
  textareaCSS.value = "";
}

function saveJS() {
  const script = textareaJS.value;
  if (!script) {
    return notify("Error! Please provide some JS (or click Reset).", true);
  }

  storage.set({ js: script }, function () {
    notify("Script was saved");
  });
}

function clearJS() {
  textareaJS.value = "";
}

function resetJS() {
  storage.get("defaultJS", function (defaultScript) {
    const defaultJS = defaultScript.defaultJS;
    storage.set({ js: defaultJS }, function () {
      textareaJS.value = defaultJS;
      notify("Script was reset");
    });
  });
}

function notify(msg, isErr) {
  const message = document.querySelector(".message");
  if (isErr) {
    message.classList.add("error");
  } else {
    message.classList.remove("error");
  }
  message.innerText = msg;
  message.classList.add("show");
  setTimeout(function () {
    message.classList.remove("show");
    message.innerText = "";
  }, 3000);
}
