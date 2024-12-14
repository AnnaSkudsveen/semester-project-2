import { search } from "../../api/listings/search.js";

export function onSearch(event) {
  alert("onSearch called");
  event.preventDefault();
  alert("Default prevented");
  const form = document.forms.searchForm;
  console.log(form);
  const query = form.elements["search"].value;
  console.log("Query:", query);
  search(query);
  console.log(`Query: ${query}`);
  alert("search called in onSearch");
}
