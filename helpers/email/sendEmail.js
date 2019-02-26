const AWS = require('aws-sdk');
const moment = require('moment');
const fs = require('fs');
const handlebars = require('handlebars');

const templateSource = fs.readFileSync(
  `${__dirname}/../../templates/confirmation.handlebars`,
  'UTF-8'
);
const confirmationEmailTemplate = handlebars.compile(templateSource);

AWS.config.update({
  region: 'eu-west-1',
});

module.exports = ({ name, email, slot }) => {
  if (!name || !email || !slot) {
    Promise.reject(new Error('Invalid request'));
  } else if (!process.env.AWS_ACCESS_KEY_ID) {
    Promise.reject(new Error('No AWS credentals supplied.'));
  } else {
    const slotStart = moment(slot.start).format('HH:mm');

    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: confirmationEmailTemplate({ name, slotStart }),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Booking Confirmation',
        },
      },
      Source:
        '"Doggy De-Stress @ Lboro London" <do_not_reply@dogs.lboro.london>',
    };

    const SES = new AWS.SES({ apiVersion: '2010-12-01' });

    return SES.sendEmail(params).promise();
  }
};
