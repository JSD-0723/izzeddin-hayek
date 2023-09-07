//Check for system's mode and if it has a previous preference in the Local Storage
const checkForSystemDefault = () => {
  if (localStorage.getItem("darkmode") == null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("darkmode");
    }
  }
};

window.addEventListener("DOMContentLoaded", checkForSystemDefault);

//Toggle Modes
const toggleDarkMode = () => {
  const rootElement = document.documentElement;

  if (rootElement.classList.contains("darkmode")) {
    rootElement.classList.remove("darkmode");
    localStorage.setItem("darkmode", "light");
  } else {
    rootElement.classList.add("darkmode");
    localStorage.setItem("darkmode", "dark");
  }
};

//Check for Stored modes in the Local Storage
const checkForDarkMode = () => {
  const storedMode = localStorage.getItem("darkmode");
  if (storedMode === "dark") {
    document.documentElement.classList.add("darkmode");
  }
};
window.addEventListener("DOMContentLoaded", checkForDarkMode);

const darkModeButton = document.getElementById("darkModeButton");
darkModeButton.addEventListener("click", toggleDarkMode);

const favButton = document.getElementById("favButton");
const favouritesMenu = document.querySelector(".favourites-menu");

favButton.addEventListener("click", () => {
  favouritesMenu.classList.toggle("visible");
});
