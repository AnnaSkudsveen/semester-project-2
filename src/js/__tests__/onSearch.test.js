import { onSearch } from "../ui/listing/search";
import fetch from "node-fetch";

global.fetch = fetch;

jest.mock("node-fetch", () => jest.fn());

test("pressing the search button triggers onSearch and prevents default form submission", async () => {
  document.body.innerHTML = `
    <form id="searchForm">
      <input type="text" name="search" id="search" value="test query">
      <button type="submit" id="searchBtn">Search</button>
    </form>
  `;

  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", onSearch);

  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ data: { media: [] } })
  });

  const event = new Event("submit", {
    bubbles: true,
    cancelable: true
  });

  jest.spyOn(event, "preventDefault");

  searchForm.dispatchEvent(event);

  expect(event.preventDefault).toHaveBeenCalled();

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("/search?q=test query"),
    expect.any(Object)
  );
});
