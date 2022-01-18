/* eslint-disable no-unused-vars */
import nodeMailer from 'nodemailer';
import { Request, Response } from 'express';

/** s
 * This function creates a new user in database
*/
async function sendEmail(req: Request, res: Response): Promise<any> {
    try {
        transporter.sendMail(emailOptions, function (error: any, info: any) {
            if (error) {
                res.status(400).send(error);
            }
            res.status(200).send(info);
        })
    } catch (error) {
        res.status(400).send(error);
    }
}
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'jawad.akhtar@invozone.com',
        pass: 'snumuvtnqihhxqdu'
    }
})
const emailOptions = {
    form: "jawad.akhtar@invzone.com",
    to: "jawadakhter7@gmail.com",
    subject: "First Mail in Node",
    text: "This is the email body!"
}

module.exports = {
    sendEmail
}