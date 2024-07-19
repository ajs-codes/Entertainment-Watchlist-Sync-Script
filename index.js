// const axios = require("axios");
const readline = require("readline");
const fs = require("fs");
// Read json file
// const movies_requested_data = require("./requested_movies.json");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get user input asynchronously
function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// Getting Year and Language property from User for requested Movies list
(async () => {
  console.log(
    "Requested Movies count:" + movies_requested_data.length,
    movies_requested_data,
  );
  const log_movie_details = await getUserInput(
    "Start Logging User Details (Y/N): ",
  );

  if (log_movie_details.toUpperCase() === "Y") {
    const movieDetailsArray = require("./movie_details.json");
    console.log("No of Movies already has details: ", movieDetailsArray.length);
    for (const movie of movies_requested_data) {
      let movie_details = {
        movie: movie,
      };

      // Get user input for year
      movie_details.year = await getUserInput("Enter year for " + movie + ": ");

      // Get user input for language
      movie_details.language = await getUserInput(
        "Enter language for " + movie + ": ",
      );

      // Push the movie details object to the array
      movieDetailsArray.push(movie_details);
      console.log(movie_details);
    }

    // Close the readline interface after all input is received
    rl.close();

    // Write movie details array to a JSON file
    fs.writeFileSync("movie_details.json", "");
    fs.writeFileSync(
      "movie_details.json",
      JSON.stringify(movieDetailsArray, null, 2),
    );

    console.log("Movie details written to movie_details.json");
  }
  rl.close();
})();

// TODO: Fetch Data from TMDB API and populate required fields in movie details json file

// TODO: Using Notion API insert the movie details into Notion database
