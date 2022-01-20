const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

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
		const type = interaction.options.getString('type');
		switch(type){
			case("defer_ping"):
				await interaction.deferReply();
				await wait(4000);
				await interaction.editReply('Pong!');
				break;
			case("edit_ping"):
				await interaction.reply({ content: 'Beep!' });
				await wait(2000);
				await interaction.editReply({ content: 'Oops! I meant Pong!' });
				break;
			case("ephemeral_ping"):
				await interaction.reply({ content: 'Pong!', ephemeral: true });
				break;
			case("followup_ping"):
				await interaction.reply({ content: 'Pong!' });
				await wait(1000);
				await interaction.followUp({ content: 'Pong again!'});
				break;
			case("ping"):
			default:
				await interaction.reply({ content: 'Pong!' });
				break;
		}
	},
};
