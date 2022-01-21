const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tanki')
		.setDescription('Control a little tank'),
	async execute(interaction) {
		const topRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('heal')
					.setLabel('⛑️')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('move_up')
					.setLabel('🔼')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('gift')
					.setLabel('🎁')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('top_sidebar')
					.setLabel('🟢')
					.setStyle('SECONDARY')
					//.setEmoji('')
					.setDisabled(true),
			);
		const middleRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('move_left')
					.setLabel('◀️')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('shoot')
					.setLabel('🔫')
					.setStyle('DANGER')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('move_right')
					.setLabel('▶️')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('middle_sidebar')
					.setLabel('🟡')
					.setStyle('SECONDARY')
					//.setEmoji('')
					.setDisabled(true),
			);
		const bottomRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('stop')
					.setLabel('🚫')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('move_down')
					.setLabel('🔽')
					.setStyle('PRIMARY')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('upgrade')
					.setLabel('🔭')
					.setStyle('SUCCESS')
					//.setEmoji('')
					.setDisabled(false),
				new MessageButton()
					.setCustomId('bottom_sidebar')
					.setLabel('🔴')
					.setStyle('SECONDARY')
					//.setEmoji('')
					.setDisabled(true),
			);

			await interaction.reply({ content: `> **__Controls:__**\n\\🔼\\▶️\\◀️\\🔽 = Move,\n> \\🎁 = Gift, \\⛑️ = Heal,\n> \\🔫 = Shoot, \\🔭 = Upgrade Range, \\🚫 = End\n\n>>> ⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬜⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛`, components: [topRow, middleRow, bottomRow] });




		const message = await interaction.fetchReply();
		const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 30000, max: 10 });

		let lastID = '';
		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) {
				await i.deferUpdate();
				let actionRows = i.message.components;
				//actionRows[0].components[0].setDisabled(true);
				await i.editReply({ content: `> **__Controls:__**\n\\🔼\\▶️\\◀️\\🔽 = Move,\n> \\🎁 = Gift, \\⛑️ = Heal,\n> \\🔫 = Shoot, \\🔭 = Upgrade Range, \\🚫 = End\n\n${i.user.username} pressed **__${i.customId}__**${lastID === i.customId ? " again!" : "!"}\n\n>>> ⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬜⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛`, components: actionRows });
				lastID = i.customId;

				if(i.customId === 'stop'){
					collector.stop("User pressed stop");
				}

			} else {
				i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
			}
		});

		collector.on('end', async collected => {
			await wait(1000);
			console.log(`Collected ${collected.size} interactions.`);
			await interaction.editReply({ content: `> ${interaction.user.username} played **__Tanki__**\n\n>>> ⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬜⬛⬛\n⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛`, components: [] });
		});




	},
};
