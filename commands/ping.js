module.exports = {
	name: 'ping',
    aliases: ['pong', 'pp'],
    execute(client, msg, args) {
        //Ping
        EditMessage(client,msg);
            async function EditMessage(client, msg) {
                const m = await msg.channel.send({embed: {
                    color: 13574669,
                    author: {
                        name: '🏓 Pong!'
                    },
                        title: 'Waiting for mother ship to respond...'
                    }
                    }); 
                
                m.edit({embed: {
                    color: 13574669,
                    author: {
                        name: '🏓 Pong!'
                    },
                        title: `Replied in ${m.createdTimestamp - msg.createdTimestamp}ms. API Ping is ${Math.round(client.ping)}ms`
                    }
                    })
            }
	}
}