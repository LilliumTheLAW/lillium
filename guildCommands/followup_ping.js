const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('followup_ping')
		.setDescription(`Replies with 'Pong!' and then 'Pong!' again.`),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!' });
		await wait(1000);
		await interaction.followUp({ content: 'Pong again!'});
	},
};
