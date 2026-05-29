import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmation = async (email, order) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - #${order._id}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order!</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total Amount:</strong> ${order.currency} ${order.totalAmount}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p>We will update you about your shipment shortly.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('[v0] Order confirmation email sent to:', email);
  } catch (error) {
    console.error('[v0] Email error:', error);
  }
};

export const sendPaymentReceipt = async (email, order) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Payment Receipt - #${order._id}`,
      html: `
        <h2>Payment Receipt</h2>
        <p>Your payment has been processed successfully.</p>
        <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
        <p><strong>Amount:</strong> ${order.currency} ${order.totalAmount}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p>Thank you for shopping with SmartShop!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('[v0] Email error:', error);
  }
};
