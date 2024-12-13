import { updateCountdown } from "../../api/profile/posts.js";

const listingsSection = document.querySelector(".listingsSection");

export function paginate(items, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end));
  }

  return pages;
}

export function renderPagination(paginatedListings) {
  const pagination = document.querySelector(".paginationSection");
  pagination.innerHTML = "";

  paginatedListings.forEach((page, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;
    button.addEventListener("click", () => {
      listingsSection.innerHTML = "";
      showListingsPaginated(page);
    });
    pagination.append(button);
  });
}

export function showListingsPaginated(postData) {
  listingsSection.innerHTML = "";
  console.log(postData);

  for (let i = 0; i < postData.length; i++) {
    const mediaUrl =
      postData[i].media.length > 0
        ? postData[i].media[0].url
        : "default-image-url.jpg";
    listingsSection.innerHTML += `
    <section class="listing-post flex-1 w-32 basis-1/3 md:basis-1/4 lg:basis-1/5 gap-5 max-w-48 items-center justify-center">
      <a class="post-link-card " href="html/listing/?id=${postData[i].id}">
        <section class="listing-post h-64 flex flex-col gap-3 mb-3">
          <div class="img-header relative h-36">
          
            <img src="${mediaUrl}" alt="" class="h-36 w-full object-cover rounded-t-md">

            <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
            
            <div class="absolute bottom-2 left-2 flex flex-col items-center justify-center ">
              <p class="text-lightText font-bold">${postData[i]._count.bids} bids</p>
            </div>
          </div>
            <h2 class="text-base font-bold overflow-hidden break-words">${postData[i].title}</h2>

            <div class="flex flex-col">
              <p class="countdown text-alertRed-700" data-end-date="${postData[i].endsAt}">${postData[i].endsAt}</p>

              <p class="text-xs text-left">Time left</p>
            </div>
              
            </section>
            </a>
            </section>
            `;
  }
  const countdownElements = document.querySelectorAll(".countdown");
  countdownElements.forEach((element) => {
    const endDate = element.getAttribute("data-end-date");
    updateCountdown(element, endDate);
    setInterval(() => updateCountdown(element, endDate), 1000);
  });
}
