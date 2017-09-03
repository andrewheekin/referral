const apiKey = 'key-b050f0517479edd9aee415bf3aa5bad1';
const domain = 'sandbox77e2bf7f228a478691a298193e694865.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

let email = {
  send: (data) => {
    mailgun.messages().send(data, (error, body) => { 
      console.log('sent email', 'body: ', body, 'data: ', data);
    });
  }
}

module.exports = email;