const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sortSelect");

let currentSortOption = "Default";
let data = []; //state
let searchData = []; //state
let sortedData = []; //state

const showLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
};

const hideLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
};

async function fetchData() {
  //api

  showLoader();
  try {
    const res = await fetch("https://tap-web-1.herokuapp.com/topics/list");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  } finally {
    hideLoader();
  }
}

const createCard = (dataItems) => {
  //presentation

  const card = document.createElement("div");
  card.classList.add("card");
  const anchor = document.createElement("a");
  anchor.href = `details.html?id=${dataItems.id}`;

  //Decide what stars to generate
  const fullStars = Math.floor(dataItems.rating);
  let decimalPart = dataItems.rating - fullStars;

  let starType = "";
  if (decimalPart >= 0.75) {
    starType = "star";
  } else if (decimalPart >= 0.25) {
    starType = "star-half-outline";
  } else {
    starType = "star-outline";
  }

  anchor.innerHTML = `
    <img src="../assets/${dataItems.image}" alt="Card Image" />
    <div class="card-content">
      <p class="image-description">${dataItems.category}</p>
      <h5>${dataItems.topic}</h5>
      <div class="rating-wrapper">
        <div class="rating">
            ${generateStars("star", fullStars)}
            ${`<ion-icon name="${starType}" class="star"></ion-icon>`}
            ${
              fullStars == 4
                ? ""
                : `<ion-icon name="star-outline" class="star"></ion-icon>`
            }
        </div>
        <p class="author">Author: ${dataItems.name}</p>
      </div>
    </div>
    `;
  card.appendChild(anchor);
  return card;
};

const generateStars = (type, count) => {
  //presentation

  const starIcon = `<ion-icon name="${type}" class="star"></ion-icon>`;
  return starIcon.repeat(count);
};

function populateCards(data) {
  //presentation

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";
  data.map((dataItems) => {
    const card = createCard(dataItems);
    cardContainer.appendChild(card);
  });

  console.log(data);
  //   const topicsTotalNumber = document.getElementById("search-output");
  //   topicsTotalNumber.innerHTML =
  //     '"' + data.length.toString() + '" ' + topicsTotalNumber.innerHTML;
}

populateCards(await fetchData());

// async function fetchDataAndPopulateCards() {
//   try {
//     data = await fetchData();
//     if (data) {
//       populateCards(data);
//     }
//   } catch (error) {
//     console.error("Something went wrong. Web topics failed to load", error);
//   }
// }

// // Call the function to fetch data and populate cards
// fetchDataAndPopulateCards();

// Function to display search results

// function displayResults(data) {
//   const resultsContainer = document.getElementById("cardContainer");
//   // Clear previous results
//   resultsContainer.innerHTML = "";

//   // Loop through the data and display it
//   data.map((item) => {
//     const card = createCard(item);
//     cardContainer.appendChild(card);
//   });
// }

const liveSearch = () => {
  //api

  // Get references to HTML elements
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener(
    "input",
    debounce(async () => {
      // Mark the arrow function as async
      try {
        const query = searchInput.value.trim();
        const res = await fetch(
          `https://tap-web-1.herokuapp.com/topics/list?phrase=${query}`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json(); // Use await to parse the JSON response
        searchData = data;
        sortData(searchData, currentSortOption);
        populateCards(searchData);
        console.log(data);

        // You can call a function to display results here if needed
        // displayResults(data);
      } catch (error) {
        console.error("Error fetching data", error);
        throw error;
      }
    }, 300)
  );
};

sortSelect.addEventListener("change", () => {
  currentSortOption = sortSelect.value;
  sortedData = sortData(searchData.slice(), currentSortOption);
  if (sortedData.length > 0) {
    populateCards(sortedData);
  } else {
    sortedData = sortData(data, currentSortOption);
    populateCards(sortedData);
  }
});

const sortData = (data, sortOption) => {
  //utility
  if (sortOption === "Topic Title") {
    // Make sure it matches the case of your data property
    return data.sort((a, b) => a.topic.localeCompare(b.topic));
  } else if (sortOption === "Author Name") {
    // Make sure it matches the case of your data property
    return data.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return data;
  }
};

// Debounce function to limit the frequency of API requests
function debounce(func, wait) {
  //debouncing
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}
liveSearch();

const fetchDetails = async (id) => {
  const res = await fetch(
    `https://tap-web-1.herokuapp.com/topics/details/${id}`
  );
  try {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("There was a problem");
  }
};

const createDetailsPage = (data) => {
  const page = document.createElement("div");
  page.classList.add("topic");

  page.innerHTML = `
    
    <div class="topic-content">
      <div class="topic-details">
        <h3>${data.category}</h3>
        <h1>${data.topic}</h1>
        <div class="rating-details">
          <ion-icon name="star" class="star"></ion-icon>
          <ion-icon name="star" class="star"></ion-icon>
          <ion-icon name="star" class="star"></ion-icon>
          <ion-icon name="star" class="star"></ion-icon>
          <ion-icon name="star-outline" class="star"></ion-icon>
        </div>
      </div>
      <p class="shared-width">
        ${data.description}
      </p>
    </div>
    <div class="detailed-card">
      <img src="assets/${data.image}" alt="Card Image" />
      <div class="detailed-card-content">
        <div class="detailed-card-author">
        ${data.topic}&nbsp;by &nbsp;<span>${data.name}</span>
        </div>
        <div class="detailed-card-fav">
          <span>Interested about this topic?</span>
          <button>
            Add to Favourites &nbsp;
            <ion-icon name="heart-outline" class="heart-fav"></ion-icon>
          </button>
          <span style="text-align: center; color: #989898; font-size: 16px"
            >Unlimited Credits</span
          >
        </div>
      </div>
    </div>
 
    `;
  return page;
};
