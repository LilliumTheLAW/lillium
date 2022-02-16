const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sort')
		.setDescription(`Replies with 'Pong!'`)
		.addStringOption(option =>
			option.setName('list')
				.setDescription('the list of numbers to be sorted')
				.setRequired(true)),
	async execute(interaction) {
				//await interaction.reply({ content: 'Pong!' });
				const sent = await interaction.reply({ content: 'Sorting...', fetchReply: true });

				const listString = interaction.options.getString('list');
				let listArray = listString.split(' ');

				let switched = false;
				do{
					switched = false;
					for(let i = 1; i < listArray.length; i++){
						if(listArray[i] < listArray[i-1]){
							switched = true;
							let temp = listArray[i];
							listArray[i] = listArray[i-1];
							listArray[i-1] = temp;
						}
					}
				}while(switched)
				interaction.editReply(`List sorted!: ${listArray}\n${sent.createdTimestamp - interaction.createdTimestamp}ms\n`);

	},
};
