const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);
// const { map } = require('../tanki/map.json')

// const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

/*var serviceAccount = require("../config/lillium-539a5-firebase-adminsdk-53lnz-89d62a60d3.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://lillium-539a5-default-rtdb.firebaseio.com"
});*/

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


		var database = admin.database();



	}
}
