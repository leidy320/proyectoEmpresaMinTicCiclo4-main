import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR EL TOKEN CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB

  /**
   * Método que envía una notificación por mensaje de texto.
   * @param message es el texto que se desea enviar.
   * @param receiver es el número que va a recibir el mensaje. Debe iniciar con el código del
   * país. Por ejemplo, para Colombia es +57 y Para USA es +1.
   */
  EnviarNotifiacionesPorSMS(message: string, receiver: string):void{
    console.log("INGRESO AL MÉTODO")

    const accountSid = 'ACdbb427d4e1267732aef393562bc25867'; // Your Account SID from www.twilio.com/console
    const authToken = ''; // Your Auth Token from www.twilio.com/console
    const toNumber = receiver // Receiver - You can add more than one in Twilio
    const fromNumber = '+14706194311' // // Sender - From a valid Twilio number

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: message,
        to: toNumber,
        from: fromNumber,
      })
      .then((message:any) => console.log(message.sid));
  }


  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB
  // POR FAVOR QUITAR LA CONTRASEÑA DEL CORREO CUANDO SE VAYA A SUBIR EL CÓDIGO A GITHUB

  /*

  Antes de ejecutarlo, se debe instalar el nodemailer con el siguiente comando:
  npm install nodemailer

  */

  /**
   * Método que envía una notificación por correo electrónico.
   * @param destino es el correo al que se envía la notificación. La notificación se puede
   * enviar a varios correos, separándolos por comas(,). Por ejemplo: correo1@correo.com,correo2@correo.com,correo3@correo.com
   * @param asunto es el asunto del correo.
   * @param mensaje es el cuerpo del correo.
   */
  EnviarNotifiacionesPorCorreo(destino: string, asunto: string, mensaje: string):void{

    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "teamddesarrolladores@gmail.com",
        pass: ""
      }
    });

    let mailOptions = {
      from: 'Team D Desarrolladores',
      to: destino,
      subject: asunto,
      text: mensaje,
      html: "",
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error.message)
      } else {
        console.log("Correo enviado. " + info.response);
      }
    });
  }
}
