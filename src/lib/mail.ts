import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    from: '"Leather Store BD" <no-reply@leatherstorebd.com>',
    subject: "Reset Your Password – Leather Store BD",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8f4f2; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #4b1c1c;">Forgot Your Password?</h2>
        <p style="font-size: 15px; color: #333;">Hi there,</p>
        <p style="font-size: 15px; color: #333;">
          We received a request to reset your password. Click the button below to choose a new one:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="display: inline-block; background-color: #4b1c1c; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">
          This link is valid for <strong>15 minutes</strong>. If you didn’t request a password reset, you can safely ignore this email.
        </p>

        <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 12px; color: #aaa; text-align: center;">
          &copy; ${new Date().getFullYear()} Leather Store BD – All rights reserved.
        </p>
      </div>
    `,
  });
}

export const sendOrderConfirmationEmail = async ({
  to,
  customer,
  items,
  payment,
  total,
}: {
  to: string;
  customer: { name: string; email: string; phone: string; address: string };
  items: {
    title: string;
    price: number;
    quantity: number;
    selectedSize?: string;
    discount?: number;
  }[];

  payment: { method: string; trxId?: string | null };
  total: number;
}) => {
  const getDiscountedPrice = (price: number, discount: number = 0) =>
    discount > 0 ? price - (price * discount) / 100 : price;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8f4f2; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #4b1c1c;">Thank You for Your Order, ${
        customer.name
      }!</h2>
      <p style="font-size: 15px; color: #333;">
        We’ve received your order and will process it soon. Here’s a summary of your purchase:
      </p>

      <h3 style="margin-top: 24px; font-size: 16px; color: #333;">🛍️ Order Items:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
        <thead>
          <tr>
            <th align="left" style="padding: 8px 0;">Item</th>
            <th align="center" style="padding: 8px 0;">Qty</th>
            <th align="right" style="padding: 8px 0;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map((item) => {
              const discounted = getDiscountedPrice(item.price, item.discount);
              return `
              <tr>
                <td style="padding: 6px 0; border-bottom: 1px solid #eee;">
                  ${item.title}
                  ${
                    item.selectedSize
                      ? `<div style="font-size: 13px; color: #666;">Size: ${item.selectedSize}</div>`
                      : ""
                  }
                  <div style="font-size: 12px; color: #888;">
                    ৳${discounted.toFixed(2)} × ${item.quantity}
                  </div>
                </td>
                <td align="center" style="padding: 6px 0; border-bottom: 1px solid #eee;">
                  ${item.quantity}
                </td>
                <td align="right" style="padding: 6px 0; border-bottom: 1px solid #eee;">
                  ৳${(discounted * item.quantity).toFixed(2)}
                </td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>

      <p style="margin-top: 16px; font-size: 16px;"><strong>Total:</strong> ৳${total.toFixed(
        2
      )}</p>
      <p><strong>Payment Method:</strong> ${payment.method}</p>
      ${
        payment.trxId
          ? `<p><strong>Transaction ID:</strong> ${payment.trxId}</p>`
          : ""
      }

      <h3 style="margin-top: 24px; font-size: 16px; color: #333;">📦 Shipping Info:</h3>
      <div style="line-height: 1.6; font-size: 14px; color: #333;">
        ${customer.name}<br/>
        ${customer.address}<br/>
        📞 ${customer.phone}<br/>
        📧 ${customer.email}
      </div>

      <h3 style="margin-top: 24px; font-size: 16px; color: #333;">❓ Need Help?</h3>
      <p style="font-size: 14px; color: #444;">
        If you have any questions about your order, feel free to contact us via:
      </p>
      <ul style="font-size: 14px; color: #444; padding-left: 16px;">
        <li>Phone: <strong>+88 0156 004 2479</strong></li>
        <li>Email: <strong>leatherstorebd@gmail.com</strong></li>
        <li>Facebook: <a href="https://www.facebook.com/share/173HkFCKrJ" style="color: #4b1c1c;">Leather Store BD</a></li>
      </ul>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="text-align: center; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} Leather Store BD. All rights reserved.
      </p>
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
