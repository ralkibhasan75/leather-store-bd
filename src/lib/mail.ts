import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Leather Store BD" <${process.env.MAIL_USER}>`,
    to,
    subject: "Reset Your Password - Leather Store BD",
    html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="padding:10px 20px;background:#2c1e1e;color:#fff;text-decoration:none;border-radius:6px;">
        Reset Password
      </a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOrderConfirmationEmail = async ({
  to,
  customer,
  items,
  payment,
  total,
}: {
  to: string;
  customer: { name: string; email: string; phone: string; address: string };
  items: { title: string; price: number; quantity: number }[];
  payment: { method: string; trxId?: string | null };
  total: number;
}) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4b1c1c;">Thank you for your order, ${
        customer.name
      }!</h2>
      <p>We've received your order and will process it shortly. Here's a summary:</p>

      <h3>🛍️ Order Items:</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li>${item.quantity} × ${item.title} - ৳${item.price}</li>`
          )
          .join("")}
      </ul>

      <p><strong>Total:</strong> ৳${total}</p>
      <p><strong>Payment Method:</strong> ${payment.method}</p>
      ${
        payment.trxId
          ? `<p><strong>Transaction ID:</strong> ${payment.trxId}</p>`
          : ""
      }

      <h3>📦 Shipping Info:</h3>
      <p>
        ${customer.name}<br />
        ${customer.address}<br />
        📞 ${customer.phone}<br />
        📧 ${customer.email}
      </p>

      <p style="margin-top: 30px;">We’ll notify you once it’s confirmed.</p>
      <p style="color: #999;">Leather Store BD</p>
    </div>
  `;

  const mailOptions = {
    from: `"Leather Store BD" <${process.env.MAIL_USER}>`,
    to,
    subject: "🧾 Your Order Confirmation - Leather Store BD",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
