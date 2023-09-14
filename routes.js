import { createCard } from "./fetchdata.js";

// Now you can use cardDataId wherever you need it in this file
console.log("test >>>>>> cardDataId", createCard); // Example usage

window.addEventListener("DOMContentLoaded", navigate());
function navigate() {
  const content = document.getElementById("home");
  const hash = window.location.hash;

  switch (hash) {
    case "#/index.html":
      content.innerHTML;
      break;
    case "#/about":
      content.innerHTML = `<h1>About Us</h1>`;
      break;
    default:
      content.innerHTML = "<h1>Page Not Found</h1>";
  }
}

// Add an event listener for changes in the URL hash
window.addEventListener("hashchange", navigate);
