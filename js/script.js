let isSorted = false;

// sort data
// Define a variable to store the clicked id
var clickedId = "";
var buttonElement;

// Function to handle button click and toggle isSorted
function sortData(target) {
  isSorted = !isSorted; // Toggle the value of isSorted

  if (isSorted) {
    // target.classList.toggle("bg-primary");
    target.classList.toggle("bg-red-500");
    target.classList.toggle("text-white");
    const buttonContainerToSort = document.querySelector(
      "[data-btn-container]"
    );

    // Event delegation for click handling
    buttonContainerToSort.addEventListener("click", function (e) {
      if (e.target && e.target.id) {
        clickedId = e.target.id;
        buttonElement = e.target;
        getData(clickedId, buttonElement);
      }
    });
  } else {
    target.classList.remove("bg-red-500");
    target.classList.remove("text-white");
    target.classList.add("text-black");
  }

  // Call getData with the stored clicked id
  clickedId = clickedId == "" ? 1000 : clickedId;

  console.log(buttonElement);
  getData(clickedId, buttonElement);
}

// Getting all the data here by fetching
const getData = async (id = 1000, thisButton) => {
  const buttonContainerToSort = document.querySelector("[data-btn-container]");

  // =================== Active button ================================
  const buttonList = buttonContainerToSort.children;
  const buttonListArray = [...buttonList];

  buttonListArray.forEach((e) => {
    e.classList.remove("bg-red-400");
    e.classList.remove("md:text-white");
    e.classList.add("md:text-black");
  });

  if (thisButton) {
    thisButton.classList.toggle("bg-red-400");
    thisButton.classList.add("text-white");
    thisButton.classList.remove("md:text-black");
  }
  // =================== end Active button functionality here ============

  // getting data from network request
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  let category = data.data;
  // =======================
  if (isSorted) {
    category = category.sort((view1, view2) => {
      return parseInt(view2.others.views) - parseInt(view1.others.views);
    });
  }

  //`Display card invocation
  displayCards(category);
  //   when no content available
  ZeroContent(category.length <= 0);
};

// displaying feature buttons
async function showTabButtons() {
  const buttonContainer = document.querySelector("[data-btn-container]");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const category = await response.json();
  const buttons = category.data;

  buttonContainer.innerHTML = buttons
    .map((button) => {
      return `
    <button id="${button.category_id}" onclick="getData('${
        button.category_id
      }', this)"
      class="md:btn hover:bg-red-400 ${
        button.category_id == 1000 ? "bg-red-400 md:text-white" : "bg-primary"
      } md:text-black rounded-lg hover:text-white md:px-5 md:py-3 md:-border-[10px] text-white font-bold md:font-normal bg-primary">${
        button.category
      }</button>
    `;
    })
    .join("");
}

showTabButtons();

// Display cards function
function displayCards(data) {
  //data = customSortData(data);
  const cardContainer = document.querySelector("[card-container]");

  cardContainer.innerHTML = data
    .map((card) => {
      return `<div class="rounded-[10px] shadow-xl"> <!-- Added padding -->
            <div class='h-[150px] relative'><img class='h-full object-cover w-full rounded-tr-lg rounded-tl-lg' src="${
              card.thumbnail
            }" alt="" />
            ${
              card.others.posted_date
                ? `<p class='absolute bottom-3 right-2'>
                        <span class="bg-[#00000072] rounded-[8px] text-[12px] px-3 py-2 text-white font-bold">
                          ${convertSecondsToTime(card.others.posted_date)}
                        </span>
                      </p>`
                : ""
            }
            </div>
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

                <span>${
                  card.authors[0].verified
                    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_11_34)">
                  <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                  <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_11_34">
                        <rect width="20" height="20" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>`
                    : ""
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

// Is there no content?
function ZeroContent(isTrue) {
  const noContentParent = document.querySelector("[data-no-content]");
  if (isTrue) {
    noContentParent.innerHTML = `
    <img src="./Icon.png" class=" w-[40%] sm:w-[100px] lg:w-[12%]" />
    <h1
    class="text-1xl md:text-2xl text-[#393737] lg:text-[25px] font-bold">
    Oops!! Sorry, There is no content here
    </h1>    
    `;
  } else {
    noContentParent.innerHTML = "";
  }
}

// mobile menu
function showMenuBar() {
  const element = document.querySelector("[data-menu-container]");
  // element.style.display = " grid";
  element.classList.toggle("hidden");
  element.classList.toggle("grid");
  element.classList.add("sm:w-[60%]");
  element.classList.add("w-[100%]");
}

function showMenuItem() {
  var container = document.querySelector("[data-btn-container]");
  var clickableImg = document.querySelector("[data-stacked]");

  function toggleImageSrc() {
    const img = clickableImg;
    if (
      img.src === "https://img.icons8.com/?size=512&id=c_bKk61RMFLX&format=png"
    ) {
      img.src = "https://img.icons8.com/?size=512&id=9JZ2d8m_PeKK&format=png"; // Set to an empty string or the new source URL
    } else {
      img.src = "https://img.icons8.com/?size=512&id=c_bKk61RMFLX&format=png"; // Set to the original source URL
    }
  }
  toggleImageSrc();

  container.classList.toggle("hidden");
  container.classList.toggle("grid");
}

getData();
