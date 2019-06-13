var nodemailer = require('nodemailer');

module.exports.sendMail = async function (id,title){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });
    console.log("gdsggheloo");

    const mailOptions = {
        from: 'aperfectsunshine@gmail.com', // sender address
        to: id, // list of receivers
        subject: 'Application for Job Profile', // Subject line
        html: '<h3>You Have a new Application for Job Post "' + title + '" <a href="http://localhost:4200/providers/login">Show More Details </a></h3>'
    };

    let info = await transporter.sendMail(mailOptions);
    if (info) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }
}
