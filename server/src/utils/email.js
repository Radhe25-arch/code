import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (email, fullName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; background-color: #0c001c; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(180deg, #1a0b2e 0%, #0c001c 100%); border: 1px solid #7c3aed40; border-radius: 24px; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { font-size: 32px; font-weight: 900; letter-spacing: -1px; color: #7c3aed; text-decoration: none; }
        .hero-img { width: 100%; border-radius: 16px; margin-bottom: 30px; border: 1px solid #ffffff10; }
        h1 { font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 20px; text-align: center; }
        p { font-size: 16px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px; }
        .cta-button { display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0; text-align: center; width: 80%; margin-left: auto; margin-right: auto; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; border-top: 1px solid #ffffff10; padding-top: 30px; }
        .stat-card { background: #ffffff05; padding: 15px; border-radius: 12px; text-align: center; border: 1px solid #ffffff05; }
        .stat-value { font-size: 20px; font-weight: 800; color: #00d9b5; }
        .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; }
        .footer { text-align: center; margin-top: 50px; color: #475569; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CODEARENA</div>
        </div>
        
        <h1>Welcome to the Legend, ${fullName}!</h1>
        
        <p>A new warrior enters the arena! You've just taken the first step toward coding mastery. CodeArena isn't just a platform—it's your weapon for conquering the tech world.</p>
        
        <p>Your journey begins now. Equip your gear, solve challenges, and climb the global leaderboards. The 1v1 Arena is waiting for you.</p>
        
        <div style="text-align: center;">
          <a href="https://codearena-free.vercel.app/dashboard" class="cta-button">Enter the Arena</a>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">LVL 1</div>
            <div class="stat-label">Starting Rank</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">0 XP</div>
            <div class="stat-label">Power Level</div>
          </div>
        </div>
        
        <p style="margin-top: 40px; font-size: 14px; text-align: center;">
          "The best way to predict the future is to build it." 
        </p>
        
        <div class="footer">
          &copy; 2026 CodeArena. Built for Warriors by Warriors.<br>
          You received this because you are destined for greatness.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"CodeArena" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🛡️ A New Warrior Rises: Welcome to CodeArena",
    html,
  });
};
