import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET, WEB_APP_URL } from '../config/env.js';

// Web-only users have no lupira:// app to catch this redirect — previously
// the only fallback message was "make sure the app is installed", which is
// just wrong for someone who signed up on the web. This adds a real
// continue-to-web-login link alongside the existing app-open attempt,
// without touching that attempt at all.
const webContinueButton = (lang, label) =>
  WEB_APP_URL
    ? `<div style="margin:32px 0;"><a href="${WEB_APP_URL}/login" style="padding:14px 28px;background-color:#8b2c4e;color:#fff;text-decoration:none;font-size:16px;border-radius:6px;">${label}</a></div>`
    : '';

export const verifyEmail = async (req, res) => {
  const token = req.query.token;
  const lang = (req.query.lang || '').toLowerCase() === 'ar' ? 'ar' : 'en';
  const t = (en, ar) => lang === 'ar' ? ar.replace(/'/g, "\\'") : en.replace(/'/g, "\\'");

  if (!token) {
    console.warn("❌ No token provided");
    return res.status(400).send(t('Missing token', 'رمز التحقق مفقود'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token successfully decoded:", decoded);

    res.set('Content-Type', 'text/html; charset=UTF-8');

    // ✅ Email update flow
    if (decoded.changeEmail) {
      console.log("🔄 Email update verification flow");

      const user = await User.findById(decoded.userId);
      if (!user) {
        console.warn("❌ User not found for ID:", decoded.userId);
        return res.status(404).send(t('User not found', 'المستخدم غير موجود'));
      }

      const existing = await User.findOne({ email: decoded.email });
      if (existing && existing._id.toString() !== user._id.toString()) {
        console.warn("❌ Email already in use by another user:", decoded.email);
        return res.status(409).send(t('Email already in use', 'البريد الإلكتروني مستخدم بالفعل'));
      }

      user.email = decoded.email;
      await user.save();
      console.log("✅ Email successfully updated");

      return res.send(/* success HTML with lupira://login redirect */`
        <!DOCTYPE html>
        <html lang="${lang}">
          <head>
            <meta charset="UTF-8">
            <title>${t('Email Updated', 'تم تحديث البريد الإلكتروني')}</title>
            <script>
              window.location.href = "lupira://login";
              setTimeout(() => {
                var fallback = document.getElementById('web-fallback');
                if (fallback) fallback.style.display = 'block';
              }, 3000);
            </script>
          </head>
          <body style="font-family:sans-serif;text-align:center;padding-top:40px;">
            <h2>${t('Your email has been updated successfully!', 'تم تحديث بريدك الإلكتروني بنجاح!')}</h2>
            <p><a href="lupira://login">${t('Tap here if nothing happens', 'اضغط هنا إذا لم يحدث شيء')}</a></p>
            <div id="web-fallback" style="display:none;">
              <p>${t("If the app didn't open, continue on the web instead:", "إذا لم يفتح التطبيق، تابعي عبر الويب:")}</p>
              ${webContinueButton(lang, t('Continue to Lupira Web', 'المتابعة إلى لوبيرا ويب'))}
            </div>
          </body>
        </html>
      `);
    }

    // ✅ Signup email verification flow
    console.log("📩 Signup email verification flow");
    let user = await User.findOne({ email: decoded.email });

    if (user) {
      console.log("ℹ️ User already exists:", user.email);
      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
        console.log("✅ User marked as verified");
      } else {
        console.log("✅ User already verified");
      }
    } else {
      console.log("🆕 Creating new user from decoded token");
      console.log('Decoded token:', decoded);
      console.log('About to create user with username:', decoded.username, 'Char codes:', Array.from(decoded.username).map(c => c.charCodeAt(0)));
      try {
        user = await User.create({
          username: decoded.username,
          email: decoded.email,
          password: decoded.password,
          phoneNumber: decoded.phoneNumber,
          gender: decoded.gender,
          country: decoded.country,
          DateOfBirth: decoded.DateOfBirth,
          ethnicity: decoded.ethnicity,
          authProvider: 'local',
          isVerified: true,
        });
        console.log("✅ New user created successfully:", user.email);
      } catch (creationError) {
        console.error("❌ Error during user creation:", creationError.message);
        return res.status(400).send(`<pre>${t('User creation failed:', 'فشل إنشاء المستخدم:')} ${creationError.message}</pre>`);
      }
    }

    return res.send(/* success HTML with lupira://login redirect */`
      <!DOCTYPE html>
      <html lang="${lang}">
        <head>
          <meta charset="UTF-8">
          <title>${t('Email Verified', 'تم التحقق من البريد الإلكتروني')}</title>
        <script>
          window.location.href = "lupira://login";
          setTimeout(() => {
            var fallback = document.getElementById('web-fallback');
            if (fallback) fallback.style.display = 'block';
          }, 3000);
        </script>
      </head>
      <body style="font-family:sans-serif;text-align:center;padding-top:40px;">
        <h2>${t('Your email has been verified!', 'تم التحقق من بريدك الإلكتروني!')}</h2>
        <p><a href="lupira://login">${t('Tap here if nothing happens', 'اضغط هنا إذا لم يحدث شيء')}</a></p>
        <div id="web-fallback" style="display:none;">
          <p>${t("If the app didn't open, continue on the web instead:", "إذا لم يفتح التطبيق، تابعي عبر الويب:")}</p>
          ${webContinueButton(lang, t('Continue to Lupira Web', 'المتابعة إلى لوبيرا ويب'))}
        </div>
      </body>
    </html>
  `);
  } catch (err) {
    console.log('❌ Email verification error:', err);
    if (err.name) console.log('Error name:', err.name);
    if (err.message) console.log('Error message:', err.message);
    if (err.stack) console.log('Error stack:', err.stack);
    return res.status(400).send(`<pre>${t('Invalid or expired verification token', 'رمز التحقق غير صالح أو منتهي الصلاحية')}
${err.message}</pre>`);
  }
};