# Metadata Fetcher App CLIENT

This application is a simple React front-end that allows users to input a list of URLs and fetch metadata (such as title, description, and image) for each URL by communicating with a back-end Express server.

It allows users to add or remove URLs dynamically.
Sends a POST request with the URLs to the backend.
Displays fetched metadata or an error message.
Includes basic error handling for user inputs and server responses.

## Design 

1. State Management
useState is used to manage form inputs (urls), the fetched metadata, and any potential error messages.


2. Form Validation
A simple form validation is used to ensure at least 3 URLs are provided before allowing the form to be submitted.

3. Error Handling
Errors are handled both on the client side and server-side.

4. Styling 
Basic styling is applied using CSS classes. The focus was kept on functionality.

## Setup Instructions

### Frontend (React):
1. Navigate to the `/client` folder.
2. Run `npm install` to install the dependencies.
3. Change the serverRoute constant to local use: `http://localhost:3000/fetch-metadata`
4. Run `npm start` to start the React app on `http://localhost:3000`.