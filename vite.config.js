import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    target: "esnext",
    input: {
      main: resolve(__dirname, "./index.html"),
      profile: resolve(__dirname, "./html/profile/index.html"),
      editProfile: resolve(__dirname, "./html/profile/edit/index.html"),
      listing: resolve(__dirname, "./html/listing/index.html"),
      editListing: resolve(__dirname, "./html/listing/edit/index.html"),
      createListing: resolve(__dirname, "./html/listing/create/index.html")
    }
  }
});
