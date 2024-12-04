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
    listingsSection.innerHTML += `
            <a class="post-link-card" href="html/listing/?id=${postData[i].id}">
            <section class="listing-post">
              <div class="img-header">
                <img src="${postData[i].media.url}" alt="">
                <h2>${postData[i].title}</h2>
                <p>${postData[i].endsAt}</p>
                <p>${postData[i]._count.bids}</p>
              </div>
            </section>
            </a>
            `;
  }
}
