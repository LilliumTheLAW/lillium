const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);
// const { map } = require('../tanki/map.json')

// const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deathnote')
		.setDescription('Plays a game of Deathnote'),
	async execute(interaction) {
		const mainMenu = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('newGame')
					.setLabel('New Game!')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('resumeGame')
					.setLabel('Resume')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('exit')
					.setLabel('Exit')
					.setStyle('DANGER')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('help')
					.setLabel('Help')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
		);

		var db = admin.database();

		const header = "This command is a work in progress!"
		let statusMessage = "";

		await refreshGame(header, statusMessage, `Content coming soon!`, [mainMenu], false );


		const message = await interaction.fetchReply();
		const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000, max: 10 });

		let lastID = '';
		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) {
				await i.deferUpdate();
				let actionRows = i.message.components;

				if(i.customId === 'newGame'){
					statusMessage = `**This command isn't quite ready. Perhaps try again later?**`;

				}else if(i.customId === 'resumeGame'){
					statusMessage = `**This command isn't quite ready. Perhaps try again later?**`;

				}else if(i.customId === 'exit'){
					statusMessage = `**This command isn't quite ready. Perhaps try again later?**`;

				}else if(i.customId === 'help'){
					statusMessage = `**Thanks for playing!**`;

				}

				await refreshGame(header, statusMessage, "Content Coming soon!", [mainMenu]);
				lastID = i.customId;

				if(i.customId === 'exit'){
					collector.stop('User selected exit');
				}

			} else {
				i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		});

		collector.on('end', async collected => {
			await wait(1000);
			console.log(`Collected ${collected.size} interactions.`);
			await refreshGame("", "", `${interaction.user.username} started a game of **__Title Pending__**!`, []);
		});
	},
};


async function refreshGame(header, status, content, components, edit = true) {

	let messageContent = { content: `${header}\n${status}\n>>> ${content}`, components: components };

	if(edit){
		await interaction.editReply(messageContent);
	}else{
		await interaction.reply(messageContent);
	}
}


/* Get Data. This example gets a map


				var ref = db.ref("gridz/map");
				var snap = await ref.once("value", function(snapshot) {
					//console.log('contacting firebase...')
					return snapshot;
				});

				let map = snap.val(); */