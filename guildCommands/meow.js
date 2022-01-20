const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meow')
		.setDescription(`Meow`),
	async execute(interaction) {
		await interaction.reply({ content: `Meow!` });
	},
};
