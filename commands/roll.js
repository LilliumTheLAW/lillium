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
					)
		.addStringOption(option =>
			option.setName('secret')
				.setDescription('Whether or not the roll is private or not')
				.setRequired(false)
				.addChoice('True', 'true')
				.addChoice('False', 'false')),
		async execute(interaction) {
			let ephemeral = false;

			const secret = interaction.options.getString('secret');
			switch(secret){
				case("true"):
					ephemeral = true;
					break;
				case("false"):
				default:
					ephemeral = false;
					break;
			}

			await interaction.deferReply({ ephemeral: ephemeral });

			let count = 0;
			let rolls = '';
			let total = 0;
			let num = (interaction.options.getInteger('num') != null ? interaction.options.getInteger('num') : 1);
			let sides = (interaction.options.getInteger('sides') != null ? interaction.options.getInteger('sides') : 6);
			do {
				const roll = Math.floor(Math.random() * sides) + 1;
				total+=roll;
				rolls = `${rolls} [${roll}]`;
				count++;
			} while(count < num);
			await interaction.editReply({ ephemeral: ephemeral, content: `:game_die: **Result:** ${num}d${sides} ${rolls}!\n:game_die: **Total:** ${total}` });
	},
};
