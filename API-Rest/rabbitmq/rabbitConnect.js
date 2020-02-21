var amqp = require('amqplib/callback_api');
const path = require('path');
const jimp = require ('jimp');

var ch = null;

async function resize(path, photo) {
  // Read the image.
  const image = await jimp.read(path + photo);

  // Resize the image to width 100 and auto height.
  await image.resize(jimp.AUTO, 100);

  // Save and overwrite the image
  await image.writeAsync('./public/thumbnails/'+ photo);
}


amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    ch = channel
    if (error1) {
      throw error1;
    }
    var queue = 'Resize';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(queue, function(msg) {
      var imagePath = msg.content.toString()
      resize('./public/images/', imagePath);
      console.log('Thumbnail created')
    }, {
      noAck: true
    });
  })
});

const sendToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, new Buffer(data));
}
process.on('exit', (code) => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});

module.exports = sendToQueue;