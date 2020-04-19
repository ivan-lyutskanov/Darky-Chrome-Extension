"use strict";
const storage = chrome.storage.local;
const titleInput = document.getElementById("title");
const setTitleButton = document.querySelector("button.set-title");
const saveButton = document.querySelector("button.save");
const clearButton = document.querySelector("button.clear");
const resetButton = document.querySelector("button.reset");
const textarea = document.querySelector("textarea");

const defaultStyles = `*,
*::after,
*::before {
  background-color: #000 !important;
  color: #eee !important;
  border-color: #eee !important;
}

h1,
h2,
h3,
h4 {
  color: #ff6363 !important;
}

pre,
pre * {
  background-color: #202040 !important;
}

a,
a * {
  color: #fff !important;
  text-decoration: underline !important;
}`;
setTitleButton.addEventListener("click", setTitle);
saveButton.addEventListener("click", saveStyles);
clearButton.addEventListener("click", clearInput);
resetButton.addEventListener("click", resetStyles);

loadTitle();
loadStyles();

function loadTitle() {
  storage.get("title", function (titleObj) {
    titleInput.value = titleObj.title;
  });
}

function loadStyles() {
  storage.get("css", function (style) {
    if (style.css) {
      textarea.value = style.css;
    }
  });
}

function setTitle() {
  storage.set({ title: titleInput.value }, function () {
    notify("Title was updated");
  });
}

function saveStyles() {
  const styles = textarea.value;
  if (!styles) {
    return notify("Error! Please provide some styles.", true);
  }

  storage.set({ css: styles }, function () {
    notify("Styles was saved");
  });
}

function resetStyles() {
  let defaultCSS;

  storage.get("defaultCSS", function (defaultStyles) {
    defaultCSS = defaultStyles.defaultCSS;
  });

  storage.set({ css: defaultCSS }, function () {
    textarea.value = defaultCSS;
    notify("Styles was reset");
  });
}

function clearInput() {
  textarea.value = "";
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
