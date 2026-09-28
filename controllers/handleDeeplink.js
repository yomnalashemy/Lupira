import { WEB_APP_URL } from '../config/env.js';

export const handleDeeplink = async (req, res) => {
  const { to, token, lang = 'en' } = req.query;

  if (!to || !token) {
    return res.status(400).send("Missing token or destination.");
  }

  const encodedToken = encodeURIComponent(token);
  const encodedLang = encodeURIComponent(lang);
  const schemeUrl = `lupira://${to}?token=${encodedToken}&lang=${encodedLang}`;
  // was hardcoded to /api/auth/verify-email regardless of `to` — for
  // to=reset-password that sent people to the wrong endpoint entirely,
  // and there was no real reset-password web page to send them to even
  // if it had been right. Routes by destination now.
  const webUrl = to === 'reset-password'
    ? (WEB_APP_URL ? `${WEB_APP_URL}/reset-password?token=${encodedToken}&lang=${encodedLang}` : null)
    : `/api/auth/verify-email?token=${encodedToken}&lang=${encodedLang}`;

  const buttonLabel = to === 'reset-password' ? 'Reset Password via Website' : 'Verify via Website';

  res.send(`
    <!DOCTYPE html>
    <html lang="${encodedLang}">
      <head>
        <title>Opening Lupira App...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { font-family: sans-serif; text-align: center; padding-top: 40px; }
          a { color: #6A5ACD; font-weight: bold; }
          .button { display: inline-block; margin: 16px 0; padding: 14px 28px; background-color: #28a745; color: #fff; text-decoration: none; font-size: 16px; border-radius: 6px; }
        </style>
      </head>
      <body>
        <h2>Opening the Lupira App...</h2>
        <p>If nothing happens, <a href="${schemeUrl}">tap here</a>.</p>
        <div id="web-fallback" style="display:none; margin: 32px 0;">
          ${webUrl ? `<a href="${webUrl}" class="button">${buttonLabel}</a>` : '<p>Please open this link on the device with the Lupira app installed.</p>'}
        </div>
        <script>
          window.location.href = "${schemeUrl}";
          setTimeout(function() {
            document.getElementById('web-fallback').style.display = 'block';
          }, 3000);
        </script>
      </body>
    </html>
  `);
};
