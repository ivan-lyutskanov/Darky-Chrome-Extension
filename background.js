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

const defaultScript = `console.warn('Darky (Chrome Extension): This message was injected from plugin option page (follow ${chrome.extension.getURL(
  "options.html"
)}). You can add your custom script there!')`;

const defaultTitle = "Let's get darky!";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    defaultCSS: defaultStyles,
    css: defaultStyles,
    defaultJS: defaultScript,
    js: defaultScript,
    title: defaultTitle,
  });
});
