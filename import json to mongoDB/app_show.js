const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const app = express();

mongoose
	.connect("mongodb://127.0.0.1:27017/MY_DATABASE_NAME")
	.then(() => console.log("mongoDB connected successfully"))
	.catch(() => console.log("error in mongoDB connection!"));

app.get("/", async (req, res) => {
	const City = require('./models/City');

	let cities = [];
	let citiesBlank = await City.find({});
	let level0 = await _.filter(citiesBlank, { sub: "" });
	for (let i = 0; i < level0.length; i++) {
		let level1 = await _.filter(citiesBlank, { sub: level0[i]._id.toString() });
		let level1_data = [];
		for (let j = 0; j < level1.length; j++) {
			level1_data.push({
				id: level1[j]._id,
				name: level1[j].name,
			});
		}
		cities.push({
			id: level0[i]._id,
			name: level0[i].name,
			sub: level1_data
		});
	}

	return res.json(cities);
});

app.listen(80, () => {
	console.log("app is running on port 80");
});