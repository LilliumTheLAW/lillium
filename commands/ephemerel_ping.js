const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ephemeral_ping')
		.setDescription(`Replies with 'Pong!' but quietly.`),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};
