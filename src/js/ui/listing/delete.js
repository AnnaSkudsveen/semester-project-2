import { deleteListing } from "../../api/listings/delete";

export async function ondeleteListing(event) {
  event.preventDefault();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlId = params.get("id");

  deleteListing(urlId);
}
