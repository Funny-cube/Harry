
module.exports.check = (client,msg) => {
    checkAnswer(client,msg);
}
module.exports.start = (client) => {
    newNumber(client);
}
var currentAsnwer = 0;

function newNumber(client){
    let hlChannel = client.channels.find(channel => channel.name === "higher-lower");
    currentAsnwer = Math.floor(Math.random() * Math.floor(10000));

    hlChannel.send({embed: {
        color: 4886754,
        fields: [{
            name: "I'm thinking of a new number:",
            value: "Guess a number and i'll tell you if it's higher or lower then your guess!"
          }],
          footer: {
            text: "It's between 1 and 10000"
            }
        }
    });
}

function checkAnswer (client,msg){
    if (msg.content == currentAsnwer){
        msg.reply({embed: {
            color: 8311585,
            fields: [{
                name: "Correct Guess:",
                value: `I was thinking of the number **${currentAsnwer}**`
              }],
            }
        });
        newNumber(client);
    } else if (!isNaN(msg.content)) {
        //Checking number:
        if (msg.content < currentAsnwer) {
            sendResult(msg,"Higher");
        } else {
            sendResult(msg,"Lower");
        }
    }
}

function sendResult(msg,direction){
    msg.channel.send({embed: {
        color: 8311585,
        fields: [{
            name: `${direction}:`,
            value: `It's ${direction.toLowerCase()} than **${msg.content}**`
          }],
        }
    }); 
}