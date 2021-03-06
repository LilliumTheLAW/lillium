// require JS basics
const fs = require('fs');

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config/config.json');
var admin = require("firebase-admin");


var serviceAccount = require("./config/lillium-539a5-firebase-adminsdk-53lnz-89d62a60d3.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://lillium-539a5-default-rtdb.firebaseio.com"
});


// Create a new client instance
const client = new Client({ allowedMentions: { parse: ['users', 'roles'] }, intents: [Intents.FLAGS.GUILDS] });

// Create a collection of commands
client.commands = new Collection();
const commandDirectories = fs.readdirSync('./commands'); // .filter(directory => directory);
for(const directory of commandDirectories){
	const commandFiles = fs.readdirSync(`./commands/${directory}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${directory}/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}
}

// Create a collection of events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// When the client is ready, run this code (only once)
/*
client.once('ready', () => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
*/

/*
// React to interactions
client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

	/*
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
	* /
});
*/


// Login to Discord with your client's token
client.login(token);
