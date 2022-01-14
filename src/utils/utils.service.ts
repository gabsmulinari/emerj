import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UtilsService {
  static sendMail() {
    throw new Error('Method not implemented.');
  }
  async sendMail(
    emailTo: string,
    emailSubject: string,
    options = { body: '', bCC: '', attached: '' },
  ) {
    // configuração, esse trecho deve ser pelo menos um método a parte
    // Parte 1
    const clientId = process.env.CLIENT_ID;
    const secretKey = process.env.SECRET_KEY;
    const refresh_token = process.env.REFRESH_TOKEN;
    const redirectURI = 'https://developers.google.com/ouathplayground';
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(clientId, secretKey, redirectURI);

    oauth2Client.setCredentials({
      refresh_token,
    });

    const acessToken = oauth2Client.getAccessToken();

    // Parte 2 da configuração
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      logger: false,
      debug: false,
      auth: {
        type: 'OAuth2',
        user: 'emerjcursohcode@gmail.com',
        clientId: clientId,
        clientSecret: secretKey,
        refreshToken: refresh_token,
        acessToken,
      },
    });
    // template do e-mail, também método a parte
    const BEMVINDO = `Seja muito bem vindo à EMERJ, seu cadastro foi confirmado. <br/><br/>`;
    const mailOptions = {
      from: 'emerjcursohcode@gmail.com',
      to: emailTo,
      bcc: 'gabriellemulinari@gmail.com',
      subject: emailSubject,
      html: `
      <h1 style='font-size:2.5em'; text-align: center; font-family:arial>${emailSubject}</h1>
      <p style='width:40%; margin: 0 auto;'>
      ${options.body ? options.body : BEMVINDO}
      </p>
      Se você não solicitou esse e-mail exclua imediatamente e informe suporte@emerj.jus.br <br/><br/>Atenciosamente, <br/>EMERJ
      `,
    };

    // enviar e-mail

    try {
      const result = transporter.sendMail(mailOptions);
      if (!result.reject) {
        return { message: 'E-mail enviado com sucesso!' };
      } else {
        return { message: result.reject };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
}
