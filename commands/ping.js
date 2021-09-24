const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Replies with 'Pong!'`)
		.addStringOption(option =>
			option.setName('type')
						.setDescription('The type of ping to use.')
						.setRequired(false)
						.addChoice('Deffered', 'defer_ping')
						.addChoice('Edited', 'edit_ping')
						.addChoice('Private', 'ephemeral_ping')
						.addChoice('Followed Up', 'followup_ping')
						.addChoice('Normal', 'ping')
					),
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!' });
	},
};
