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
      return `<button class="bg-primary mx-auto px-5 py-2 rounded-lg ${
        button.category === "All" ? "bg-red-400 text-white" : "bg-primary"
      }">${button.category}</button>`;
    })
    .join(" ");
}
// Display cards function
function displayCards(data) {
  const cardContainer = document.querySelector("[card-container]");

  cardContainer.innerHTML = data
    .map((card) => {
      return `<div class="rounded-[10px] shadow-xl"> <!-- Added padding -->
            <div class='h-[150px]'><img class='h-full object-cover w-full rounded-tr-lg rounded-tl-lg' src="${
              card.thumbnail
            }" alt="" /></div>
            <div class="px-3 py-4 space-y-1"> 
              <div class="flex gap-3">
                <img class="h-10 w-10 rounded-full object-cover" src="${
                  card.authors[0].profile_picture
                }" />
                <h2 class="card-title text-[14px] md:text-[20px]">${
                  card.title
                }</h2>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-light-text inline">${
                  card.authors[0].profile_name
                }</span>
                <span class="${card.authors[0].verified ? "verified" : ""}">${
        card.authors[0].verified ? "&check;" : ""
      }</span>
              </div>
              <p class="text-light-text">${
                card.others.views ? card.others.views : "No"
              } views</p>
            </div>
          </div>`;
    })
    .join("");
}

//

getData();
