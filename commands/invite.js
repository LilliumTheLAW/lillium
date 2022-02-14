const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { invite, serverInvite } = require('../config/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite Lillium to another server'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Bot Invite')
					.setStyle('LINK')
					.setURL(`${invite}`)
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setLabel('Suport Server')
					.setStyle('LINK')
					.setURL(`${serverInvite}`)
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setLabel('Something Neat!')
					.setStyle('LINK')
					.setURL(`http://weavesilk.com/`)
					//.setEmoji('')
					.setDisabled(false),
			);

		await interaction.reply({ content: `Here are some links!`, components: [row] });



		/*
		const message = await interaction.fetchReply();
		const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000, max: 1 });

		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) {
				await i.deferUpdate();
				let actionRows = i.message.components;
				actionRows[0].components[0].setDisabled(true);
				await i.editReply({ content: `<@${i.user.id}> clicked on the ${i.customId} button.`, components: actionRows });

			} else {
				i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} interactions.`);
		});
		*/



	},
};
