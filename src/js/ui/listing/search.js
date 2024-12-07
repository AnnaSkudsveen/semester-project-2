import { search } from "../../api/listings/search.js";

export async function onSearch(event) {
  console.log("onSearch triggered");
  event.preventDefault();
  console.log("Default prevented");

  const form = document.forms.searchForm;
  const query = form.search.value;
  console.log(query);

  search(query);
}
