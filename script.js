const darkModeButton = document.getElementById("darkModeButton");

darkModeButton.addEventListener("click", function () {
  document.documentElement.classList.toggle("darkmode");
});

const favButton = document.getElementById("favButton");
const favouritesMenu = document.querySelector(".favourites-menu");

favButton.addEventListener("click", () => {
  favouritesMenu.classList.toggle("visible");
});
