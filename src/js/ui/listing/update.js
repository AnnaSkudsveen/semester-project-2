import { updateListing } from "../../api/listings/update.js";

export async function onUpdateListing(event) {
  event.preventDefault();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlId = params.get("id");
  const form = document.forms.updateListing;
  const title = form.title.value;
  const image = form.image.value;
  const body = form.body.value;

  updateListing(urlId, title, body, image);
}
