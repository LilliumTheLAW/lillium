const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edit_ping')
		.setDescription(`Replies with 'Pong!', but makes a mistake first.`),
	async execute(interaction) {
		await interaction.reply({ content: 'Beep!' });
		await wait(2000);
		await interaction.editReply({ content: 'Oops! I meant Pong!' });
	},
};
