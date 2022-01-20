const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spoopy')
		.setDescription(`Replies with a spoopy link`),
	async execute(interaction) {
		await interaction.reply({ content: '[Spoopy Link](https://asoftmurmur.com/)' });
	},
};
