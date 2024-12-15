# Auction House

Welcome to the Auction House! This project is a semester exam for Noroff FED2. The app is an auction house where users can bid, view bids, and manage listings
and profiles. The application is built using Vanilla JavaScript, Vite, Tailwind CSS, and CSS modules, and it uses export modules for JavaScript components.
The app is hosted at: 
[Auction House](https://semester-exam-2-auction-house.netlify.app/)

## Features

### User Authentication

- Login: Authenticate with the application.

- Register: Create a new user account.

### Auction Listings

- Get Listings: Fetch and display a list of auction items.

- Create Listing: Post a new item for auction.

- Edit Listing: Modify details of an existing auction item.

- View Listing by ID: View detailed information about a specific auction item, including bids.

- Place Bids: Users can place bids on listings and see the current bid history.

### User Profile

- View Profile: Check user profile details.

- Edit Profile: Update personal information or profile details.

### API Integration

The app interacts with the following API endpoints:

- Auction Listing API: https://v2.api.noroff.dev/auction/listing

- Profile API: https://v2.api.noroff.dev/auction/profile

These endpoints facilitate user interactions such as bidding, creating, and managing auction listings and profiles.

## Technologies Used

- Vanilla JavaScript: Core functionality and logic.

- Vite: Module bundler and development environment.

- Tailwind CSS: For responsive and modern styling.

- CSS Modules: Additional custom styling.

- Jest: Testing framework.

## Installation and Setup

To run the project locally:

Clone this repository.
````bash
git clone https://github.com/AnnaSkudsveen/semester-project-2.git
````

Navigate to the project directory.
````bash
cd semester-project-2
````

Install the dependencies.
````bash
npm install
````

Start the development server.
````bash
npm run dev
````

Open the app in your browser at http://localhost:5173/ or the URL provided by your terminal.

## Testing

This project includes two Jest tests focused on the search functionality, ensuring it works correctly after debugging.

To run the tests:
````bash
npm test
````
or
````bash
npx jest
````
## Live Demo

You can access the live version of the application at: [Auction House](https://semester-exam-2-auction-house.netlify.app/).

## Future Improvements

- Add more comprehensive test coverage.

- Implement notifications for successful actions (e.g., placing a bid).

- Enhance UI with additional animations and interactivity.
  

## Acknowledgments

Noroff API: For providing the backend endpoints.

Vite and Tailwind CSS: For streamlining development and design.
