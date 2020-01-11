const qMaths = require('../utils/quickmaths.js');
const hol = require('../utils/higherLower.js');
module.exports = async(client) => {
 console.log(`Harry has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
 console.log("Harry is ready!");     
 qMaths.start(client);
 hol.start(client);
 }