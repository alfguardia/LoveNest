<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    protected $email;
    protected $nombre;
    protected $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarCorreo()
    {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = true;
        $mail->Username = 'laboratorioamym@gmail.com';
        $mail->Password = 'ihbnklaxunobrygi';


        $mail->setFrom('laboratorioamym@gmail.com', 'LoveNest Team');
        $mail->addAddress($this->email, $this->nombre);
        $mail->isHTML();
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Confirma tu cuenta';

        $contenido = '<html>';
        $contenido .= "<p><strong>Hola! " . $this->nombre . "</strong> Has creado tu cuenta en
        UpTask, presiona el siguiente enlace para confirmar</p>";
        $contenido .= "<p><a href='http://localhost:3000/confirmar?token=" . $this->token . "'</a>Presiona acá</p>";
        $contenido .= '</html>';

        $mail->Body = $contenido;
        //Envia correo
        $mail->send();
    }

    public function reestablecerPassword(){
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = true;
        $mail->Username = 'laboratorioamym@gmail.com';
        $mail->Password = 'ihbnklaxunobrygi';


        $mail->setFrom('laboratorioamym@gmail.com', 'LoveNest Team');
        $mail->addAddress($this->email, $this->nombre);
        $mail->Subject = 'Reestablece tu password';
        $mail->isHTML();
        $mail->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido .= "<p><strong>Hola! " . $this->nombre . "</strong> presiona el siguiente enlace para reestablecer tu password</p>";
        $contenido .= "<p><a href='http://localhost:3000/reestablecer?token=" . $this->token . "'</a>Presiona acá</p>";
        $contenido .= '</html>';

        $mail->Body = $contenido;
        //Envia correo
        $mail->send(); 
    }
}
