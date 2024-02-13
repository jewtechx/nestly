import nodemailer, { SendMailOptions } from 'nodemailer';
import log from './log';
import config from '../config';

// export default async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//     console.log(creds)
// }

// createTestCreds()

const smtp = config.smtp;

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload:SendMailOptions){
    transporter.sendMail(payload, (err:any,info:any) => {
        if(err){
            log.error(err,"Error sending mail")
        }

        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
}

export default sendEmail
