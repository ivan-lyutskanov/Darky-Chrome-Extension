"use strict";

const toggleButton = document.getElementById("toggleButton");
const optionsLink = document.getElementById("options");
const optionsUrl = chrome.extension.getURL("options.html");
optionsLink.setAttribute("href", optionsUrl);
let checked = false;

const title = document.querySelector(".title");

chrome.storage.local.get("title", function (titleObj) {
  title.innerHTML = titleObj.title;
});

toggleButton.onclick = onToggle;

function onToggle() {
  checked = !checked;
  if (checked) {
    chrome.storage.local.get("css", function (style) {
      if (style.css) {
        chrome.tabs.insertCSS({ code: style.css });
      }
    });
    chrome.storage.local.get("js", function (script) {
      chrome.tabs.executeScript({ code: script.js });
    });
  } else {
    chrome.tabs.reload();
  }
}
