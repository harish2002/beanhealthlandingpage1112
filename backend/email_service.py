import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

def send_demo_request_notification(name: str, email: str, looking_for: str):
    """
    Send email notification when a new demo request is submitted
    """
    try:
        # Email configuration from environment variables
        smtp_server = os.environ.get('SMTP_SERVER')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_username = os.environ.get('SMTP_USERNAME')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        sender_email = os.environ.get('SENDER_EMAIL')
        notification_email = os.environ.get('NOTIFICATION_EMAIL')

        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"🔔 New Demo Request - BeanHealth"
        message["From"] = sender_email
        message["To"] = notification_email

        # Create HTML email body
        html_body = f"""
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
              .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
              .header {{ background: linear-gradient(to right, #1B4332, #2D6A4F); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
              .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }}
              .field {{ margin-bottom: 15px; }}
              .label {{ font-weight: bold; color: #1B4332; }}
              .value {{ margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #1B4332; }}
              .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Demo Request Received</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">{name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">{email}</div>
                </div>
                <div class="field">
                  <div class="label">Looking For:</div>
                  <div class="value">{looking_for}</div>
                </div>
                <div class="field">
                  <div class="label">Submitted At:</div>
                  <div class="value">{datetime.now().strftime('%B %d, %Y at %I:%M %p IST')}</div>
                </div>
                <div class="footer">
                  <p>This is an automated notification from your BeanHealth landing page.</p>
                  <p><strong>Action Required:</strong> Please respond to the prospect within 24 hours.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
        """

        # Create plain text version as fallback
        text_body = f"""
        New Demo Request - BeanHealth
        
        Name: {name}
        Email: {email}
        Looking For: {looking_for}
        Submitted At: {datetime.now().strftime('%B %d, %Y at %I:%M %p IST')}
        
        Please respond to the prospect within 24 hours.
        """

        # Attach both HTML and plain text versions
        part1 = MIMEText(text_body, "plain")
        part2 = MIMEText(html_body, "html")
        message.attach(part1)
        message.attach(part2)

        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(sender_email, notification_email, message.as_string())

        logger.info(f"Email notification sent successfully to {notification_email}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False
