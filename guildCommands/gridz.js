const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const { map } = require('../tanki/map.json')

// const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

var serviceAccount = require("../config/lillium-539a5-firebase-adminsdk-53lnz-89d62a60d3.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://lillium-539a5-default-rtdb.firebaseio.com"
});

var db = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gridz')
		.setDescription('Control a little tank'),
	async execute(interaction) {
		const topRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('heal')
					.setLabel('⛑️')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('move_up')
					.setLabel('🔼')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('gift')
					.setLabel('🎁')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('top_sidebar')
					.setLabel('🟢')
					.setStyle('SECONDARY')
					//.setEmoji('')
					.setDisabled(true),
		);
		const middleRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('move_left')
					.setLabel('◀️')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('shoot')
					.setLabel('🔫')
					.setStyle('DANGER')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('move_right')
					.setLabel('▶️')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('middle_sidebar')
					.setLabel('🟡')
					.setStyle('SECONDARY')
					//.setEmoji('')
					.setDisabled(true),
		);
		const bottomRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('stop')
					.setLabel('🚫')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('move_down')
					.setLabel('🔽')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('upgrade')
					.setLabel('🔭')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('bottom_sidebar')
					.setLabel('🔴')
					.setStyle('SECONDARY')
					//.setEmoji('')
					.setDisabled(true),
		);



		const header = "**__Controls:__**\n> \\🔼\\▶️\\◀️\\🔽 = Move,\n> \\🎁 = Gift, \\⛑️ = Heal,\n> \\🔫 = Shoot, \\🔭 = Upgrade Range, \\🚫 = End\n**__Key__**:\n> 🔳 = Out of Bounds, ⬜ = Empty Space\n> 🟥 = Enemy Tank, 🟨 = Obstacle, 🟩 = You!\n"
		let statusMessage = "\n";

		await interaction.reply({ content: `${header}${statusMessage}>>> ${getMap()}`, components: [topRow, middleRow, bottomRow] });

		var ref = db.ref("gridz/map");
		var snap = await ref.once("value", function(snapshot) {
			return snapshot;
		});

		let onlineMap = snap.val()

		//console.log(onlineMap);

		for(let i = 0; i < onlineMap.length; i++){
			for(let j = 0; j < onlineMap[i].length; j++){
				//console.log(onlineMap[i][j]);
			}
		}

		const message = await interaction.fetchReply();
		const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000, max: 10 });

		let lastID = '';
		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) {
				await i.deferUpdate();
				let actionRows = i.message.components;
				//actionRows[0].components[0].setDisabled(true);
				if(i.customId === 'move_right'){
					let x = getPlayerX();
					let y = getPlayerY();
					if(x+1 <= map.length - 1){
						moveRight();
						statusMessage = `\n${i.user.username} moved **__right__**${lastID === i.customId ? " again!" : "!"}\n`;
					}else{
						statusMessage = `\n${i.user.username}, you can't go any further right.\n`;
					}
				}else if(i.customId === 'move_left'){
					let x = getPlayerX();
					let y = getPlayerY();
					if(x-1 >= 0){
						moveLeft();
						statusMessage = `\n${i.user.username} moved **__left__**${lastID === i.customId ? " again!" : "!"}\n`;
					}else{
						statusMessage = `\n${i.user.username}, you can't go any further left.\n`;
					}
				}else if(i.customId === 'move_down'){
					let x = getPlayerX();
					let y = getPlayerY();
					if(y+1 <= map.length - 1){
						moveDown();
						statusMessage = `\n${i.user.username} moved **__down__**${lastID === i.customId ? " again!" : "!"}\n`;
					}else{
						statusMessage = `\n${i.user.username}, you can't go any further down.\n`;
					}
				}else if(i.customId === 'move_up'){
					let x = getPlayerX();
					let y = getPlayerY();
					if(y-1 >= 0){
						moveUp();
						statusMessage = `\n${i.user.username} moved **__up__**${lastID === i.customId ? " again!" : "!"}\n`;
					}else{
						statusMessage = `\n${i.user.username}, you can't go any further up.\n`;
					}
				}

				await i.editReply({ content: `${header}${statusMessage}\n>>> ${getMap()}`, components: actionRows });
				lastID = i.customId;

				if(i.customId === 'stop'){
					collector.stop('User pressed stop');
				}

			} else {
				i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		});

		collector.on('end', async collected => {
			await wait(1000);
			console.log(`Collected ${collected.size} interactions.`);
			await interaction.editReply({ content: `> ${interaction.user.username} played **__Tanki__**\n\n>>> ${getMap()}`, components: [] });
		});




	},
};

function getMap(){
	let x = getPlayerX();
	let y = getPlayerY();

	let count = 0;
	let output = '◼️';
	let coords = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮"];

	for(let i = 0; i < 9; i++){
		output += coords[i] + "​"; //The charater in quotes is a zero-width space, REQUIRED for the emojis to render properly
	}

	for(let i = y - 4; i < y + 5; i++) {
		output += `\n${coords[count]}`;
		count++;
		for(let j = x - 4; j < x + 5; j++) {
			//console.log(`${i}, ${j}`)
			if(i < 0 || j < 0 || i > map.length - 1 || j > map.length - 1){
				output += '🔳';
			}else{
				output += map[i][j];
			}
		}
	}
	return output;
}

function getPlayerX(){
	for(let i = 0; i < map.length; i++) {
		for(let j = 0; j < map[i].length; j++) {
			if(map[i][j] === '🟩'){
				return j;
			}
		}
	}
}

function getPlayerY(){
	for(let i = 0; i < map.length; i++) {
		for(let j = 0; j < map[i].length; j++) {
			if(map[i][j] === '🟩'){
				return i;
			}
		}
	}
}

function moveRight(){
	let x = getPlayerX();
	let y = getPlayerY();

	map[y][x] = '⬜';
	map[y][x+1] = '🟩';
}

function moveLeft(){
	let x = getPlayerX();
	let y = getPlayerY();

	map[y][x] = '⬜';
	map[y][x-1] = '🟩';
}

function moveDown(){
	let x = getPlayerX();
	let y = getPlayerY();

	map[y][x] = '⬜';
	map[y+1][x] = '🟩';
}

function moveUp(){
	let x = getPlayerX();
	let y = getPlayerY();

	map[y][x] = '⬜';
	map[y-1][x] = '🟩';
}
