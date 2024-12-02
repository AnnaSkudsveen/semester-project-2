import { createListing } from "../../api/listings/create";

export async function onCreateListing(event) {
  event.preventDefault();

  const form = document.forms.createListing;
  const title = form.title.value;
  const body = form.body.value;
  const media = form.image.value;
  const endsAt = form.endsAt.value;
  const tags = form.tags.value;

  createListing(title, media, body, endsAt, tags);
}
