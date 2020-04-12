"use strict";

const toggleButton = document.getElementById("toggleButton");
const optionsLink = document.getElementById("options");
const optionsUrl = chrome.extension.getURL("options.html");
optionsLink.setAttribute("href", optionsUrl);
let checked = false;

function toggleDarkMode() {
  checked = !checked;
  if (checked) {
    chrome.storage.local.get("css", function (style) {
      if (style.css) {
        chrome.tabs.insertCSS({ code: style.css }, function () {
          console.log(style);
        });
      }
    });
  } else {
    chrome.tabs.reload();
  }
}

toggleButton.onclick = toggleDarkMode;
