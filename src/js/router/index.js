export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/html/auth/":
      await import("./views/auth.js");
      break;
    case "/html/listing/":
      await import("./views/listing.js");
      break;
    case "/html/listing/edit/":
      await import("./views/listingEdit.js");
      break;
    case "/html/listing/create/":
      await import("./views/listingCreate.js");
      break;
    case "/html/profile/":
      await import("./views/profile.js");
      break;
    case "/html/profile/edit/":
      await import("./views/profileUpdate.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
