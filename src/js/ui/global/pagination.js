import { updateCountdown } from "../../api/profile/posts.js";

const listingsSection = document.querySelector(".listingsSection");

/**
 * Paginates an array of items into smaller chunks based on the specified number of items per page.
 *
 * The function divides the array into multiple pages, each containing a specified number of items.
 * It returns an array where each element is an array representing a page of items.
 *
 * @param {Array} items - The array of items to paginate.
 * @param {number} itemsPerPage - The number of items to display per page.
 *
 * @returns {Array} An array of pages, where each page is an array of items.
 *
 * @example
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const pages = paginate(items, 3);
 * console.log(pages);
 * // Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 */
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

/**
 * Renders pagination buttons for the paginated listings and handles page navigation.
 *
 * This function creates pagination buttons based on the number of pages in the `paginatedListings` array.
 * When a pagination button is clicked, it updates the active state of the buttons and displays the corresponding page of listings.
 *
 * @param {Array} paginatedListings - An array of paginated listings, where each element represents a page of items.
 * Each page is an array of listings that should be displayed when the button for that page is clicked.
 *
 * @returns {void} This function does not return anything. It modifies the DOM to render pagination buttons and handle page navigation.
 *
 * @example
 * const paginatedListings = [
 *   [{ title: 'Item 1' }, { title: 'Item 2' }, { title: 'Item 3' }],
 *   [{ title: 'Item 4' }, { title: 'Item 5' }, { title: 'Item 6' }],
 *   [{ title: 'Item 7' }]
 * ];
 * renderPagination(paginatedListings);
 */
export function renderPagination(paginatedListings) {
  const pagination = document.querySelector(".paginationSection");
  pagination.innerHTML = "";

  paginatedListings.forEach((page, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;
    button.className =
      "pagination-button bg-primary-100 text-darkText w-5 rounded-sm hover:border hover:border-primary-600 active:bg-primary-600 active:text-lightText transition";

    button.addEventListener("click", () => {
      document.querySelectorAll(".pagination-button").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      listingsSection.innerHTML = "";
      showListingsPaginated(page);
    });
    if (index === 0) {
      button.classList.add("active");
    }
    pagination.append(button);
  });
}

/**
 * Displays a list of paginated listings on the page.
 *
 * This function populates the `listingsSection` element with listings, each containing an image, title, bid count, and countdown timer.
 * It generates HTML for each listing in the `postData` array and appends it to the DOM.
 *
 * @param {Array} postData - An array of listings to be displayed on the current page. Each listing should have properties such as `id`, `media`, `title`, `endsAt`, and `_count` for bids.
 *
 * @returns {void} This function does not return any value. It modifies the DOM to display the listings and their countdowns.
 *
 * @example
 * const postData = [
 *   {
 *     id: 1,
 *     media: [{ url: 'image1.jpg' }],
 *     title: 'Item 1',
 *     endsAt: '2024-12-25T12:00:00Z',
 *     _count: { bids: 5 }
 *   },
 *   {
 *     id: 2,
 *     media: [{ url: 'image2.jpg' }],
 *     title: 'Item 2',
 *     endsAt: '2024-12-26T12:00:00Z',
 *     _count: { bids: 3 }
 *   }
 * ];
 * showListingsPaginated(postData);
 */
export function showListingsPaginated(postData) {
  listingsSection.innerHTML = "";

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
