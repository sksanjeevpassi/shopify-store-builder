const nodemailer = require('nodemailer');
const ejs = require("ejs");
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(data) {
    this.to = data.email;
    this.from = `Webgarh <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   // Sendgrid
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD
    //     }
    //   });
    // }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      incryption: 'tls',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    // const html = ejs.renderFile(`${__dirname}/../views/${template}.ejs`, {
    //   subject
    // });
    const htmlRes = {
        setHeader: (key, value) => {
          console.log(`Setting header: ${key} = ${value}`);
        },
      };

    var html = "<p>Hi</p>";
        html += "<p>please goto here to create a store <a href='https://shopify.pxf.io/c/3761361/1101159/13624' target='_blank'> access store </a></p>";
        html += "<p>Thankyou</p>";

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html:html
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('access-token-template', 'Create Shopify Store');
  }

  async renderEjsTemplateWithData(templatePath, data, htmlRes) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(templatePath, data, (err, html) => {
        if (err) {
          reject(err);
        } else {
          // Set the 'Content-Type' header to 'text/html'
          htmlRes.setHeader("Content-Type", "text/html");
          resolve(html);
        }
      });
    });
  }
  


};