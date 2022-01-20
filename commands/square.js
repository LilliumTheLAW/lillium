const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('square')
		.setDescription(`Makes a square`)
		.addIntegerOption(option =>
			option.setName('size')
						.setDescription('How much square.')
						.setRequired(false)
					),
	async execute(interaction) {
		await interaction.deferReply();

		let response = ">>> ";
		let num = (interaction.options.getInteger('size') != null ? interaction.options.getInteger('size') : 1);
		for(let i = 0; i < num; i++) {
			for(let j = 0; j < num; j++) {
				const color = Math.floor(Math.random() * 8) + 1;
				switch (color) {
					case 1:
						response += "🟦";
						break;
					case 2:
						response += "🟩";
						break;
					case 3:
						response += "🟥";
						break;
					case 4:
						response += "🟪";
						break;
					case 5:
						response += "🟧";
						break;
					case 6:
						response += "🟨";
						break;
					case 7:
						response += "⬛";
						break;
					case 8:
					response += "⬜";
				}
			}
			response += "\n"
		}
		await interaction.editReply({ content: `${response}` });
	},
};
