const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, servers } = require('./config/config.json');

console.log('Started cataloguing application (/) commands.');
console.log('Started cataloguing global commands.');
const globalCommands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/global/${file}`);
	globalCommands.push(command.data.toJSON());
}

console.log('Started cataloguing local commands.');
console.log('Started cataloguing rucs commands.');
const rucsCommands = [];
const rucsCommandFiles = fs.readdirSync('./commands/rucs').filter(file => file.endsWith('.js'));

for (const file of rucsCommandFiles) {
	const rucsCommand = require(`./commands/rucs/${file}`);
	rucsCommands.push(rucsCommand.data.toJSON());
}

console.log('Started cataloguing testing commands.');
const testingCommands = [];
const testingCommandFiles = fs.readdirSync('./commands/testing').filter(file => file.endsWith('.js'));

for (const file of testingCommandFiles) {
	const testingCommand = require(`./commands/testing/${file}`);
	testingCommands.push(testingCommand.data.toJSON());
}
console.log('Successfully catalogued application (/) commands.');


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		console.log('Started refreshing global commands.');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: globalCommands },
		);

		console.log('Started refreshing local commands.');
		console.log('Started refreshing rucs commands.');
		let rucsId = servers.find(server => server.name === 'rucs').guildId
		await rest.put(
			Routes.applicationGuildCommands(clientId, rucsId),
			{ body: rucsCommands },
		);

		console.log('Started refreshing testing commands.');
		let testingIds = []
		for(server of servers.filter(server => server.testing)){
			testingIds.push(server.guildId);
		}
		for(let i = 0; i < testingIds.length; i++){
			await rest.put(
				Routes.applicationGuildCommands(clientId, testingIds[i]),
				{ body: testingCommands },
			);
		}

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
/*
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
*/


/*
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
  */
