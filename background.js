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

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ css: defaultStyles }, function () {
    console.info("Default styles are set!");
  });
});
