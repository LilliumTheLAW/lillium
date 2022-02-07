const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Replies with 'Pong!'`),
	async execute(interaction) {
				//await interaction.reply({ content: 'Pong!' });
				const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
				interaction.editReply(`**Pong!**\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat: ${interaction.client.ws.ping}ms.`);

	},
};
