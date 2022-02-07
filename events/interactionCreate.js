module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		var client = interaction.client;
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;


		try {
			console.log(`${interaction.user.tag} in ${interaction.channel ? `${interaction.guild}#${interaction.channel.name}` : 'DMs'} triggered an interaction: ${interaction.commandName}`);
			//console.log(interaction);
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if(interaction.replied){
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

	},
};
