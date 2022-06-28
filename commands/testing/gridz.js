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
	async execute(commandInteraction) {
		const components = [
			new MessageActionRow().addComponents([
				new MessageButton().setCustomId('heal').setLabel('⛑️').setStyle('SUCCESS').setDisabled(false),
				new MessageButton().setCustomId('move_up').setLabel('🔼').setStyle('PRIMARY').setDisabled(false),
				new MessageButton().setCustomId('gift').setLabel('🎁').setStyle('SUCCESS').setDisabled(false),
				new MessageButton().setCustomId('top_sidebar').setLabel('🟢').setStyle('SECONDARY').setDisabled(true),
			]),
			new MessageActionRow().addComponents([
				new MessageButton().setCustomId('move_left').setLabel('◀️').setStyle('PRIMARY').setDisabled(false),
				new MessageButton().setCustomId('shoot').setLabel('🔫').setStyle('DANGER').setDisabled(false),
				new MessageButton().setCustomId('move_right').setLabel('▶️').setStyle('PRIMARY').setDisabled(false),
				new MessageButton().setCustomId('middle_sidebar').setLabel('🟡').setStyle('SECONDARY').setDisabled(true),
			]),
			new MessageActionRow().addComponents([
				new MessageButton().setCustomId('stop').setLabel('🚫').setStyle('SUCCESS').setDisabled(false),
				new MessageButton().setCustomId('move_down').setLabel('🔽').setStyle('PRIMARY').setDisabled(false),
				new MessageButton().setCustomId('upgrade').setLabel('🔭').setStyle('SUCCESS').setDisabled(false),
				new MessageButton().setCustomId('bottom_sidebar').setLabel('🔴').setStyle('SECONDARY').setDisabled(true),
			])
		];

		await commandInteraction.deferReply();

		await commandInteraction.editReply({
			content: `Work in progress!`,
			components: components,
		});

		var database = admin.database();


	}
}
