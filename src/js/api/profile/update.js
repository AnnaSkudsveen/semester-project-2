import { headers } from "../headers.js";

export async function updateProfile(username, bio, image, banner) {
  const headersConfig = headers();
  try {
    fetch(`${API_SOCIAL_POSTS}/${username}`, {
      method: "PUT",
      body: JSON.stringify({
        bio: `${bio}`,
        avatar: {
          url: `${image}`
        },
        banner: {
          url: `${banner}`
        }
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...headersConfig
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/html/profile/";
      });
  } catch (error) {
    console.error("Error during editing:", error);
    throw error;
  }
}
