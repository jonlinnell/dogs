const AWS = require('aws-sdk');
const moment = require('moment');

AWS.config.update({
  region: 'eu-west-1',
});

module.exports = ({ name, email, slot }) => {
  if (!name || !email || !slot) {
    Promise.reject(new Error('Invalid request'));
  }

  const slotStart = moment(slot.start).format('HH:mm');
  const slotEnd = moment(slot.end).format('HH:mm');

  const message = `Hi ${name}, you're booked in to slot ${slotStart} – ${slotEnd}. Cheers.`;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source: 'do_not_reply@dogs.lboro.london' /* required */,
  };

  const SES = new AWS.SES({ apiVersion: '2010-12-01' });

  console.log(message);

  return SES.sendEmail(params).promise();
};
