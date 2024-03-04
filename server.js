const express = require("express");
const app = express();
const ejs = require("ejs");
app.use(express.json());
var cors = require("cors");
app.use(cors());
let imgArr = [];
app.get("/", (req, res) => {
  async function getDetails() {
    const url = "https://api.themoviedb.org/3/trending/all/day";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTgyMWVkY2I0YTUyYmExYzA5MzMzZjRjODQ2MmQ2YiIsInN1YiI6IjY1MmJiMGI4MzU4ZGE3MDBjNmYxODE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8xbRSZkYI7dN8sGAYIAwozVQvXUzSD7zUnoZWsQjnE",
      },
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => (imgArr = json.results))
      .catch((err) => console.error("error:" + err));
    res.json(imgArr);
  }

  getDetails();
});
app.get("/find/:id", (req, res) => {
  async function getDetails(title) {
    const url = `https://api.themoviedb.org/3/search/multi?query=${title}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTgyMWVkY2I0YTUyYmExYzA5MzMzZjRjODQ2MmQ2YiIsInN1YiI6IjY1MmJiMGI4MzU4ZGE3MDBjNmYxODE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T8xbRSZkYI7dN8sGAYIAwozVQvXUzSD7zUnoZWsQjnE",
      },
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => (imgArr = json.results))
      .catch((err) => console.error("error:" + err));
    console.log(imgArr);
    res.json(imgArr);
  }
  getDetails(req.params.id);
});
app.listen(3000, () => {
  console.log("server running");
});
