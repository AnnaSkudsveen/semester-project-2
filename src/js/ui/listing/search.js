import { search } from "../../api/listings/search.js";

export function onSearch(event) {
  console.log("onSearch triggered");
  event.preventDefault();
  console.log("Default prevented");

  const form = document.forms.searchForm;
  console.log(form);
  const query = form.elements["search"].value;
  console.log("Query:", query);

  search(query);
  console.log(`Query: ${query}`);
}
