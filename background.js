"use strict";

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

const defaultTitle = "Let's get darky!";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    defaultCSS: defaultStyles,
    css: defaultStyles,
    js: `console.warn('Darky (Chrome Extension): This message was injected from "background.js". You can implement your custom scripts there!')`,
    title: defaultTitle,
  });
});
