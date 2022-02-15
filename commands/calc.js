const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

/*
 *	Much of the code in this command was authored by u/dimden on Reddit,
 *	Please see this thread for the original!
 *	https://www.reddit.com/r/discordapp/comments/st1qaz/ive_made_working_casio_calculator/
 */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calc')
		.setDescription(`Provides a gui interface for wrote calculation.`),
	async execute(interaction) {
		let components = [
				new MessageActionRow().addComponents([
						new MessageButton().setCustomId('off').setLabel('OFF').setStyle('DANGER'),
						new MessageButton().setCustomId('mc').setLabel('MC').setStyle('PRIMARY').setDisabled(true),
						new MessageButton().setCustomId('mr').setLabel('MR').setStyle('PRIMARY').setDisabled(true),
						new MessageButton().setCustomId('mplus').setLabel('M+').setStyle('PRIMARY').setDisabled(true),
						new MessageButton().setCustomId('mminus').setLabel('M-').setStyle('PRIMARY').setDisabled(true),
				]),
				new MessageActionRow().addComponents([
						new MessageButton().setCustomId('c').setLabel('C').setStyle('DANGER').setDisabled(true),
						new MessageButton().setCustomId('7').setLabel('7').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('8').setLabel('8').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('9').setLabel('9').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('divide').setLabel('÷').setStyle('SECONDARY').setDisabled(true),
				]),
				new MessageActionRow().addComponents([
						new MessageButton().setCustomId('plusminus').setLabel('±').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('4').setLabel('4').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('5').setLabel('5').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('6').setLabel('6').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('multiply').setLabel('×').setStyle('SECONDARY').setDisabled(true),
				]),
				new MessageActionRow().addComponents([
						new MessageButton().setCustomId('sqrt').setLabel('√').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('1').setLabel('1').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('2').setLabel('2').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('3').setLabel('3').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('minus').setLabel('-').setStyle('SECONDARY').setDisabled(true),
				]),
				new MessageActionRow().addComponents([
						new MessageButton().setCustomId('0').setLabel('0').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('dot').setLabel('.').setStyle('SECONDARY').setDisabled(true),
						new MessageButton().setCustomId('equal').setLabel('ㅤㅤㅤ=ㅤㅤㅤㅤ').setStyle('SUCCESS').setDisabled(true),
						new MessageButton().setCustomId('plus').setLabel('+').setStyle('SECONDARY').setDisabled(true),
				])
		];
		let ops = ["plus", "minus", "multiply", "divide"];
		let text = " ";
		await interaction.reply({
				content: `\`${text.padStart(47, " ")}\``,
				components
		});
		let offCount = 0;
		let d = 0;
		let acc = 0;
		let m = 0;
		let op = "";
		let toUpdate = false;
		let off = true;
		let dot = false;
		let collector = interaction.channel.createMessageComponentCollector({ filter: buttonInteraction => buttonInteraction.user.id === interaction.user.id && buttonInteraction.message.interaction.id === interaction.id, time: 120_000 });
		collector.on('collect', buttonInteraction => {
				for(let row of components) {
						for(let btn of row.components) {
								if(ops.includes(btn.customId)) btn.setStyle('SECONDARY');
						}
				}
				if(buttonInteraction.customId === "off") {
						if(off) {
								text = "0";
								off = false;
								for(let row of components) {
										for(let btn of row.components) {
												btn.setDisabled(false);
										}
								}
								offCount++;
						} else {
							if(offCount < 5){
								m = 0; acc = 0; d = 0; op = ""; toUpdate = false; dot = false;
								text = " ";
								off = true;
								for(let row of components) {
										for(let btn of row.components) {
												if(btn.customId !== 'off') btn.setDisabled(true);
										}
								}
							}else{
								collector.stop();
							}
						}
				} else if(buttonInteraction.customId === "c") {
						d = 0;
						acc = 0;
						op = "";
						toUpdate = false;
						text = d.toString();
				} else if(isFinite(+buttonInteraction.customId)) {
						let n = +buttonInteraction.customId;
						if(toUpdate) {
								acc = d;
								d = n;
								toUpdate = false;
						} else {
								if(dot) d = +`${d}.${n}`;
								else d = +`${d}${n}`;
								dot = false;
						}
						text = d.toString();
				} else if(ops.includes(buttonInteraction.customId)) {
						op = buttonInteraction.customId;
						for(let row of components) {
								for(let btn of row.components) {
										if(btn.customId === op) btn.setStyle('PRIMARY');
								}
						}
						toUpdate = true;
				} else if(buttonInteraction.customId === "equal") {
						let res;
						if(!isFinite(d)) d = 0;
						if(!isFinite(acc)) d = 0;
						if(op === "plus") res = acc+d;
						if(op === "minus") res = acc-d;
						if(op === "multiply") res = acc*d;
						if(op === "divide") res = acc/d;
						toUpdate = true;
						if(isNaN(+res)) res = 0;
						d = +res.toFixed(10);
						text = d.toString();
				} else if(buttonInteraction.customId === "dot") {
						if(d.toString().includes('.')) return;
						text = `${d}.`;
						dot = true;
				} else if(buttonInteraction.customId === "sqrt") {
						d = Math.sqrt(d);
						text = d.toString();
				} else if(buttonInteraction.customId === "plusminus") {
						if(d !== 0) d = -d;
						text = d.toString();
				} else if(buttonInteraction.customId === "mc") {
						m = 0;
				} else if(buttonInteraction.customId === "mplus") {
						m += d;
				} else if(buttonInteraction.customId === "mminus") {
						m -= d;
				} else if(buttonInteraction.customId === "mr") {
						d = m;
						text = d.toString();
				}
				buttonInteraction.update({
						content: `\`${text.padStart(47, " ")}\`\n`,
						components
				})
		});

		collector.on('end', async collected => {
			//await wait(1000);
			console.log(`Collected ${collected.size} interactions.`);

			for(let row of components) {
					for(let btn of row.components) {
							btn.setDisabled(true);
					}
			}

			await interaction.editReply({
					content: `\`${text.padStart(47, " ")}\`\n`,
					components
			})
		});
	},
};
