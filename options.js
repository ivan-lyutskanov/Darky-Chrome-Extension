"use strict";
const storage = chrome.storage.local;
const saveButton = document.querySelector("button.save");
const clearButton = document.querySelector("button.clear");
const resetButton = document.querySelector("button.reset");
const textarea = document.querySelector("textarea");
const backButton = document.querySelector(".back");
const popupUrl = chrome.extension.getURL("popup.html");
backButton.setAttribute("href", popupUrl);
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

saveButton.addEventListener("click", saveStyles);
clearButton.addEventListener("click", clearInput);
resetButton.addEventListener("click", resetStyles);
backButton.addEventListener("click", goBack);

loadStyles();

function saveStyles() {
  const styles = textarea.value;
  if (!styles) {
    return notify("Error! Please provide some styles.", true);
  }

  storage.set({ css: styles }, function () {
    notify("Styles was saved");
  });
}

function loadStyles() {
  storage.get("css", function (style) {
    if (style.css) {
      textarea.value = style.css;
    }
  });
}

function resetStyles() {
  storage.set({ css: defaultStyles }, function () {
    textarea.value = defaultStyles;
    notify("Styles was reset");
  });
}

function clearInput() {
  textarea.value = "";
}

function goBack() {
  chrome.tabs.reload();
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
