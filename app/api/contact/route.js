import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const formData = await request.formData();

        const firstName = formData.get("firstName")?.toString().trim() || "";
        const lastName = formData.get("lastName")?.toString().trim() || "";
        const email = formData.get("email")?.toString().trim() || "";
        const phone = formData.get("phone")?.toString().trim() || "";
        const subject = formData.get("subject")?.toString().trim() || "";
        const message = formData.get("message")?.toString().trim() || "";
        const attachment = formData.get("attachment");

        // Basic server-side validation
        if (!firstName || !lastName || !email || !subject || !message) {
            return Response.json(
                { success: false, error: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Wall Cosmetics Website" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `[Wall Cosmetics Enquiry] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #111827; border-bottom: 2px solid #111827; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; width: 130px; vertical-align: top;"><strong>Name</strong></td>
                            <td style="padding: 8px 0; color: #111827;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Email</strong></td>
                            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Phone</strong></td>
                            <td style="padding: 8px 0; color: #111827;">${phone || "Not provided"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Subject</strong></td>
                            <td style="padding: 8px 0; color: #111827;">${subject}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;"><strong>Message</strong></td>
                            <td style="padding: 8px 0; color: #111827; white-space: pre-wrap;">${message}</td>
                        </tr>
                    </table>
                    ${attachment && attachment.size > 0
                        ? `<p style="margin-top: 16px; color: #6b7280; font-size: 13px;">📎 Floor plan attached: <strong>${attachment.name}</strong></p>`
                        : ""
                    }
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 24px;" />
                    <p style="font-size: 12px; color: #9ca3af; margin-top: 12px;">
                        Sent via Wall Cosmetics website contact form.
                    </p>
                </div>
            `,
        };

        // Attach the file if provided
        if (attachment && attachment.size > 0) {
            const buffer = Buffer.from(await attachment.arrayBuffer());
            mailOptions.attachments = [
                {
                    filename: attachment.name,
                    content: buffer,
                    contentType: attachment.type,
                },
            ];
        }

        await transporter.sendMail(mailOptions);

        return Response.json({ success: true });
    } catch (error) {
        console.error("Contact form email error:", error);
        return Response.json(
            { success: false, error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
