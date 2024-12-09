import { search } from "../../api/listings/search.js";

export function onSearch(event) {
  console.log("onSearch triggered");
  event.preventDefault();
  console.log("Default prevented");

  const form = document.getElementById("searchForm");
  console.log(form);
  const query = form.elements.search.value;

  search(query).then((data) => {
    if (data) {
      console.log("Search results:", data);
      // Process the search results here
    } else {
      console.log("No data returned from search");
    }
  });
  console.log(`Query: ${query}`);
}
