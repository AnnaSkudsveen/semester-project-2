import { headers } from "../headers.js";
export async function updateProfile(username, bio, avatar, banner) {
  const headersConfig = headers();
  try {
    fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        bio: `${bio}`,
        avatar: {
          url: `${title}`
        },
        banner: {
          url: `${body}`
        }
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        headers: headers
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.location.href = "/index.html";
      });
  } catch (error) {
    console.error("Error during editing:", error);
    throw error; // Rethrow the error to handle it in `onRegister`
  }
}
