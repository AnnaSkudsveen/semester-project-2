import { bidOnItem } from "../../api/listings/bid.js";
export function onBidOnItem(event) {
  event.preventDefault();
  const form = document.forms.bidModal;
  const bid = form.bid.value;

  bidOnItem(bid);
}
