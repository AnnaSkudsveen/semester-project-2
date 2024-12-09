import { onSearch } from "../ui/listing/search";
import fetch from "node-fetch";

global.fetch = fetch;

jest.mock("node-fetch", () => jest.fn());

test("onSearch triggers and prevents default form submission", async () => {
  document.getElementById = jest.fn().mockReturnValue({
    search: { value: "test query" }
  });

  const event = {
    preventDefault: jest.fn()
  };

  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ data: { media: [] } })
  });

  await onSearch(event);

  expect(event.preventDefault).toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("/search?q=test query"),
    expect.any(Object)
  );
});
