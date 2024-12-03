import { headers } from "../headers.js";
import { API_AUCTION_POSTS } from "../constants.js";

export async function updateListing(id, title, body, image) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      title: `${title}`,
      media: [{ url: `${image}` }],
      description: `${body}`
    })
  };

  try {
    const response = await fetch(`${API_AUCTION_POSTS}/${id}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    console.log("listing updated successfully:", data);
    window.location.href = `/html/listing/?id=${id}`;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
