import { bidOnItem } from "../../api/listings/bid.js";

/**
 * Handles the form submission for placing a bid on an item.
 *
 * This function prevents the default form submission, retrieves the bid amount entered by the user, and calls the `bidOnItem` function to process the bid.
 *
 * @param {Event} event - The event object from the form submission. It contains the details of the user interaction.
 */
export function onBidOnItem(event) {
  event.preventDefault();
  const form = document.forms.bidModal;
  const bid = form.bid.value;

  bidOnItem(bid);
}
