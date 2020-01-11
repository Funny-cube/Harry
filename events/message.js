const channels = require('../channels.json');
const qMaths = require('../utils/quickmaths.js');
const koh = require('../utils/koh.js');
const hol = require('../utils/higherLower.js');
module.exports = (client, msg) => {

    //Return if member is null (happens when offline and using browser)
    if (msg.member == null) return;

    //Don't let bots talk to harry, cause we don't know we've they've been...
    if (msg.author.bot) return;

    //Quickmaths
    if (msg.channel.id == channels.QUICK_MATHS) qMaths.check(client, msg);

    //KOH
    if (msg.channel.id == channels.KING_OF_THE_HILL) koh.check(client, msg);

    //Hi-or-Lo
    if (msg.channel.id == channels.HIGHER_LOWER) hol.check(client, msg);

    //Command events
    if (msg.content.indexOf(client.config.prefix) !== 0) return;
    const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if (!cmd) {
        console.log('[CMD] ' + msg.member.user.tag + ' -> ' + msg.content + ' [Unknown CMD]');
        return;
    }
    console.log('[CMD] ' + msg.member.user.tag + ' -> ' + msg.content);
    cmd.execute(client, msg, args);
}