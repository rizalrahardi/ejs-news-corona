const express = require("express");
const app = express();
const axios = require("axios");
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage",
  });
});

app.get("/greet", (req, res) => {
  res.render("greet", {
    title: "greet",
    nama: req.query.name,
    daerah: req.query.from,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
  });
});

const url = "https://berita-indo-api.vercel.app/v1";

app.get("/news", (req, res) => {

  axios.get(`${url}/cnbc-news`).then((result) => {
    res.render("news", {
      title: "news",
			news: result.data.data
    });
  });
});

app.get('/republika-news', (req, res) => {

	axios.get(`${url}/republika-news`)
	.then((result) => {
		res.render('republika-news', {
			title: 'republika news',
			cnn_news: result.data.data
		})
	})
})

app.get('/corona', (req, res) => {
	const url = 'https://api.kawalcorona.com/indonesia'

	axios.get(`${url}/provinsi`)
	.then((result) => {
		res.render('corona', {
			title: 'corona',
			corona: result.data
		})
	})
})

app.listen(port, () => console.log("server ready"));
