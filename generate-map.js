const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);
// const { map } = require('../tanki/map.json')

// const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

var serviceAccount = require("./config/lillium-539a5-firebase-adminsdk-53lnz-89d62a60d3.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://lillium-539a5-default-rtdb.firebaseio.com"
});

var database = admin.database();
var ref = database.ref("gridz/map");

(async () => {
	let map = [];
	let mapSize = 50;
	//Generate Empty Map
	for(let y = 0; y < mapSize; y++){
		map.push([]);
		for(let x = 0; x < mapSize; x++){
			map[y].push('empty');
		}
	}

	let obstacles = [];
	for(let i = 0; i < mapSize; i++){
		let randX = 0;
		let randY = 0;
		let randCoord = [];
		do{
			randY = Math.floor(Math.random() * mapSize);
			randX = Math.floor(Math.random() * mapSize);
			randCoord.push(randY);
			randCoord.push(randX);
		}while((randCoord in obstacles))

		obstacles[i] = randCoord;
		map[randY][randX] = 'obstacle';
	}

	let randX = 0;
	let randY = 0;
	let randCoord = [];
	do{
		randY = Math.floor(Math.random() * mapSize);
		randX = Math.floor(Math.random() * mapSize);
		randCoord.push(randY);
		randCoord.push(randX);
	}while((randCoord in obstacles))

	map[randY][randX] = 'player';

	//console.log(map);

	ref.set(map, (error) => {
		if (error) {
			console.log('Data could not be saved.' + error);
		} else {
			console.log('Data saved successfully.');
		}
	});
})();
