var king;
var newKingmsg;
const giphyRandom = require("giphy-random");
const tags = ["fail", "fail"];

module.exports.check = (client, msg) => {
  stealCrown(client, msg);
}

async function stealCrown(client, msg) {
  if (msg.content == "-steal") {
    if (msg.member == king) return;
    let kohChan = client.channels.find(channel => channel.name === "king-of-the-hill")
    if (king != null) {
      var tagSearch = tags[Math.floor(Math.random() * tags.length)];
      (async () => {
        const {
          data
        } = await giphyRandom(client.config.giphy_key, {
          tag: tagSearch
        });
        let kingMsg = await kohChan.send({
          embed: {
            color: 16312092,
            fields: [{
              name: '👑 Crown Stolen!',
              value: `${msg.member} stole the crown from ${king}! \n• They had it for ` + "`" + getTime(msg, newKingmsg) + "`"
            }],
            image: {
              url: data.image_url
            },
            footer: {
              text: 'Steal the crown with -steal'
            }
          }
        });

        king = msg.member;
        newKingmsg = kingMsg;
      })();

    } else {
      var tagSearch2 = tags[Math.floor(Math.random() * tags.length)];
      (async () => {
        const {
          data
        } = await giphyRandom(client.config.giphy_key, {
          tag: tagSearch2
        });
        newKingmsg = await kohChan.send({
          embed: {
            color: 16312092,
            fields: [{
              name: '👑 Crown Picked Up!',
              value: `${msg.member} picked up the crown!`
            }],
            image: {
              url: data.image_url
            },
            footer: {
              text: 'Steal the crown with -steal'
            }
          }
        });
        king = msg.member;
      })();

    }
    kohChan.setTopic(`👑 ${msg.member} Currently has the crown | Steal it with -steal`);
  }
}

function getTime(msg, newMsg) {
  let ms = msg.createdTimestamp - newMsg.createdTimestamp;

  var milliseconds = parseInt((ms % 1000) / 100),
    seconds = parseInt((ms / 1000) % 60),
    minutes = parseInt((ms / (1000 * 60)) % 60),
    hours = parseInt((ms / (1000 * 60 * 60)) % 24);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}.${milliseconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}.${milliseconds}s`;
  } else {
    return `${seconds}.${milliseconds}s`;
  }
}