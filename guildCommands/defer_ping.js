const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('defer_ping')
		.setDescription(`Replies with 'Pong!' after 4 seconds.`),
	async execute(interaction) {
		await interaction.deferReply();
		await wait(4000);
		await interaction.editReply('Pong!');
	},
};
