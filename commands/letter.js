const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('letter')
		.setDescription(`Replies with a random letter`)
		.addIntegerOption(option =>
			option.setName('num')
						.setDescription('How many letters.')
						.setRequired(false)
					),
		async execute(interaction) {
			await interaction.deferReply();
			let letters = '';
			let count = 0;
			let num = (interaction.options.getInteger('num') != null ? interaction.options.getInteger('num') : 1);
			do {
				const letter = Math.floor(Math.random() * 26) + 1;
				letters = `${letters}[**${String.fromCharCode(letter + 65)}**] `;
				count++;
			} while(count < num);
			await interaction.editReply({ content: `Your letter${(num == 1 ? ' is' : 's are')} ${letters}!` });
	},
};
