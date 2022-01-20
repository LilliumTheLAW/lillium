const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription(`Rolls a die`)
		.addIntegerOption(option =>
			option.setName('num')
						.setDescription('How many flips.')
						.setRequired(false)
					)
		.addIntegerOption(option =>
			option.setName('sides')
						.setDescription('How many sides the die has.')
						.setRequired(false)
					),
		async execute(interaction) {
			await interaction.deferReply();
			let count = 0;
			let rolls = '';
			let num = (interaction.options.getInteger('num') != null ? interaction.options.getInteger('num') : 1);
			let sides = (interaction.options.getInteger('sides') != null ? interaction.options.getInteger('sides') : 6);
			do {
				const roll = Math.floor(Math.random() * sides) + 1;
				rolls = `${rolls}[${roll}] `;
				count++;
			} while(count < num);
			await interaction.editReply({ content: `${(num == 1 ? 'It' : 'They')} landed on ${rolls}!` });
	},
};
