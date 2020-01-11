var answer;
const Numbers = require('number-to-emoji');
const Canvas = require('canvas');

module.exports.check = (client, msg) => {
    checkAnswer(client, msg);
}
module.exports.start = (client) => {
    newProblem(client);
}

function newProblem(client) {
    let index = Math.floor(Math.random() * Math.floor(3));
    let num1 = Math.floor(Math.random() * Math.floor(300))
    let num2 = Math.floor(Math.random() * Math.floor(300))
    if (index == 1) {
        answer = num1 + num2;
        sendProb(client, `${Numbers.toEmoji(num1)} ➕ ${Numbers.toEmoji(num2)}`, `${num1} + ${num2}`);
    } else if (index == 2) {
        answer = num1 - num2
        sendProb(client, `${Numbers.toEmoji(num1)} ➖ ${Numbers.toEmoji(num2)}`, `${num1} - ${num2}`);
    } else {
        answer = num1 * num2
        sendProb(client, `${Numbers.toEmoji(num1)} ✖️ ${Numbers.toEmoji(num2)}`, `${num1} x ${num2}`);
    }
}

async function sendProb(client, equation, rawequation) {
    let qMathsChanl = client.channels.find(channel => channel.name === "quick-maths")
    //Image handlin'
    const canvas = Canvas.createCanvas(182, 37);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(`./imgs/maths_bg.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Text
    ctx.font = '26px ALL THE WAY TO THE SUN';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = "center";
    ctx.fillText(`${rawequation}`, 85, 30);

    await qMathsChanl.send({
        embed: {
            color: 4886754,
            author: {
                name: "Quick Maths Time:"
            },
            files: [{
                attachment: canvas.toBuffer(),
                name: 'maths.png'
            }],
            image: {
                url: "attachment://maths.png"
            },
            footer: {
                text: 'Try to solve this equation to win!'
            }
        }
    });
    qMathsChanl.setTopic(`Solve: ${equation} to win!`, "Quick Maths");
}

function checkAnswer(client, msg) {
    if (msg.content == answer) {
        //Correct Answer
        msg.channel.send({
            embed: {
                color: 8311585,
                fields: [{
                    name: `Correct Answer: ${msg.author.username}!`,
                    value: "The answer was `" + answer + "`"
                }],
                footer: {
                    text: 'New equation incoming!'
                }
            }
        });
        newProblem(client);
    }
}