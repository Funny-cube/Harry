const Discord = require('discord.js');
const {
  readdir
} = require('fs');
const {
  Collection
} = require('discord.js');
const client = new Discord.Client({
  autoReconnect: true
});
client.config = require('./config.json');

const activities_list = [
  "Crab Rave on repeat",
  "You",
  "a Magic Show",
  "with a spider",
  "with buttons",
  "with my pet rock",
  "Meme review"
];
const status_list = [
  "LISTENING",
  "WATCHING",
  "WATCHING",
  "PLAYING",
  "PLAYING",
  "PLAYING",
  "WATCHING"
];

client.commands = new Collection();

//Login to discord
client.login(client.config.token);

//On ready
client.on('ready', function () {
  console.log('Setting Activity and Status...');
  client.user.setActivity("with Barrys's emotions", {
    type: 'PLAYING'
  });
  client.user.setStatus('online')

  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index], {
      type: status_list[index]
    });
  }, 60000); //60s
})

//Error handling
client.on('error', console.error);

//Load Events
readdir('./events/', (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading ${eventName} event...`);
    client.on(eventName, event.bind(null, client));
  });
});

//Load Commands
readdir('./commands/', (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loading ${commandName} command...`);
    client.commands.set(commandName, props);
  });
})