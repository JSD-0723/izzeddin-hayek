const showLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
};

const hideLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
};

let data;

async function fetchData() {
  showLoader();
  try {
    const res = await fetch("https://tap-web-1.herokuapp.com/topics/list");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const fetchedData = await res.json();
    return fetchedData;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}

function populateCards(data) {
  const cardContainer = document.getElementById("cardContainer");
  const cardTemplate = document.querySelector(".card");

  data.map((dataItem) => {
    const cardClone = cardTemplate.cloneNode(true);

    cardClone.style.display = "flex";
    cardClone.querySelector("img").src = "assets/" + dataItem.image;
    cardClone.querySelector(".image-description").textContent =
      dataItem.category;
    cardClone.querySelector("h5").textContent = dataItem.topic;

    const ratingStars = cardClone.querySelectorAll(".star");
    for (let i = 0; i < dataItem.rating; i++) {
      ratingStars[i].style.color = "gold";
    }
    cardClone.querySelector(".author").textContent = `Author: ${dataItem.name}`;

    cardContainer.appendChild(cardClone);
  });
  hideLoader();
  console.log(data);
  const topicsTotalNumber = document.getElementById("search-output");
  topicsTotalNumber.innerHTML =
    '"' + data.length.toString() + '" ' + topicsTotalNumber.innerHTML;
}

async function fetchDataAndPopulateCards() {
  try {
    const fetchedData = await fetchData();
    if (fetchedData) {
      populateCards(fetchedData);
    }
  } catch (error) {
    console.error("Something went wrong. Web topics failed to load", error);
  }
}

// Call the function to fetch data and populate cards
fetchDataAndPopulateCards();
