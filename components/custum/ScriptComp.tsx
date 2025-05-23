"use client";

import Script from "next/script";
import React from "react";

export default function ScriptComp() {
  return (
    <Script
      id="tabscript"
      dangerouslySetInnerHTML={{
        __html: `
  function openTab(evt, tabName) {
var i, tabcontent, tabbuttons;
tabcontent = document.getElementsByClassName("tab-content");
for (i = 0; i < tabcontent.length; i++) {
tabcontent[i].style.display = "none";
}
tabbuttons = document.getElementsByClassName("tab-button");
for (i = 0; i < tabbuttons.length; i++) {
tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
}
document.getElementById(tabName).style.display = "block";
evt.currentTarget.className += " active";
}
document.querySelectorAll(".tab-button").forEach((button) => {
button.addEventListener("click", function () {
let content = this.getAttribute("data-content");
openTab(event, content);
});
});
`,
      }}
      onLoad={() => {
        console.log("Script has loaded");
      }}
    />
  );
}
