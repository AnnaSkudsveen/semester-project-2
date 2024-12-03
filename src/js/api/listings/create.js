import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function createListing(title, media, body, endsAt, tags) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      title: `${title}`,
      description: `${body}`,
      endsAt: `${endsAt}`,
      tags: [`${tags}`],
      media: {
        url: `${media}`
      }
    })
  };

  try {
    const response = await fetch(`${API_AUCTION_POSTS}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error posting listing", errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    console.log("Listing created successfully:", data);

    // window.location.href = "/";
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
