const getData = async () => {
  // getting data from network request
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await res.json();
  const category = data.data;
  console.log(category);
  showTabButtons();
  //`Display card invocation
  displayCards(category);
};

// displaying feature buttons
async function showTabButtons() {
  const buttonContainer = document.querySelector("[data-btn-container]");
  console.log(buttonContainer);
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const category = await response.json();
  const buttons = category.data;
  console.log(buttons);

  buttonContainer.innerHTML += buttons
    .map((button) => {
      return `<button class="bg-primary px-5 py-2 rounded-lg ${
        button.category === "All" ? "bg-red-400 text-white" : "bg-primary"
      }">${button.category}</button>`;
    })
    .join(" ");
}

// displaying all cards
function displayCards(data) {
  const cardContainer = document.querySelector("[card-container]");
}

//

getData();
