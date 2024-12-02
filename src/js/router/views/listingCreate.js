import { onCreateListing } from "../../ui/listing/create.js";

const form = document.forms.createListing;
console.log(form);

form.addEventListener("submit", onCreateListing);
