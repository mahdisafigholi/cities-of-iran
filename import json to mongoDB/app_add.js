const mongoose = require('mongoose');

mongoose
    .connect("mongodb://127.0.0.1:27017/MY_DATABASE_NAME")
    .then(() => console.log("mongoDB connected successfully"))
    .catch(() => console.log("error in mongoDB connection!"));

//init city
setTimeout(async ()=> {
	const City = require('./models/City');
	const cities = require("./../cities_of_IRAN.json");
	
	let ostanPromise = [];
	let city = await City.findOne();
	if (!city) {
		await City.deleteMany({});
		ostanPromise = cities.map(ostan => {
			let newOstan = new City({
				name: ostan.name,
				sub: ""
			});
			return newOstan.save();
		});
	}
	ostanPromise = await Promise.all(ostanPromise);
	for (let i = 0; i < ostanPromise.length; i++) {
		const { _id: ostanID } = ostanPromise[i];
		cities[i].sub.forEach(async town => {
			let newTown = new City({
				name: town,
				sub: ostanID
			});
			await newTown.save();
		});
	}
	console.log("cities added to DB :)");
},2000);