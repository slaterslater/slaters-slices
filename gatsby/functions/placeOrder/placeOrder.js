const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  const today = new Date();
  const date = today.toDateString();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  return `<div>
    <h2>Your Recent Pizza Order from Slater's Slices</h2>
    <p><strong>Time placed</strong>: ${date} at ${time}</p>
    <p><strong>Total</strong>: ${total}</p>
    <ul>
      ${order
        .map(
          (item) => `
        <li>
          ${item.size} - ${item.name} - ${item.price}
          <br>
          <img src=${item.thumbnail} atl=${item.name} />
        </li>
      `
        )
        .join('')}
    </ul>
    <p><strong>Total</strong>: ${total}</p>
    <style>
        ul {list-style:none}
        li {margin-bottom:5px}
    </style>
  </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);
  // validate data
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`checking if the ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Please take a look at the ${field} field?`,
        }),
      };
    }
  }
  // send the email

  // send success or error

  const info = await transporter.sendMail({
    from: "Slater's Slices <slater@example.com>",
    to: 'orders@example.com',
    subject: 'Your Pizza Order',
    html: generateOrderEmail(body),
  });
  // console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
