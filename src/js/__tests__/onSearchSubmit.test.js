import { onSearch } from "../ui/listing/search";
import fetch from "node-fetch";

global.fetch = fetch;

jest.mock("node-fetch", () => jest.fn());

test("pressing the search button triggers onSearch and prevents default form submission", async () => {
  document.body.innerHTML = `
    <form id="searchForm" name="searchForm" class="hidden md:block">
          <label for="search"></label>

          <input type="text" name="search" id="search" placeholder="Search" value="testQuery">

          <button id="searchBtn">Search</button>
        </form>
  `;

  const searchFormBtn = document.getElementById("searchBtn");

  searchFormBtn.addEventListener("submit", onSearch);

  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ data: { media: [] } })
  });

  const event = new Event("submit", {
    bubbles: true,
    cancelable: true
  });

  jest.spyOn(event, "preventDefault");

  searchFormBtn.dispatchEvent(event);

  expect(event.preventDefault).toHaveBeenCalled();

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("/search?q=testQuery"),
    expect.any(Object)
  );
});
