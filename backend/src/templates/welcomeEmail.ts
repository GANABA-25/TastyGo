export const welcomeEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to TastyGo</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f5f7fb;
  font-family:Arial, Helvetica, sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
  width="600"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#ffffff;
    margin:40px auto;
    border-radius:10px;
    overflow:hidden;
    border:1px solid #e5e7eb;
  "
>

<!-- Header -->
<tr>
<td
  style="
    background:#f97316;
    color:#ffffff;
    text-align:center;
    padding:30px;
    font-size:28px;
    font-weight:bold;
  "
>
TastyGo 🍔
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:40px">

<h2 style="
  margin-top:0;
  color:#111827;
  font-size:24px;
">
Welcome to TastyGo, ${name}! 👋
</h2>

<p style="
  color:#4b5563;
  line-height:1.7;
  font-size:16px;
">
We're excited to have you here. Your TastyGo account has been
successfully created, and you're ready to discover delicious food
from restaurants around you.
</p>

<p style="
  color:#4b5563;
  line-height:1.7;
  font-size:16px;
">
From your favorite meals to new dishes worth trying, TastyGo makes
ordering food simple, fast, and convenient.
</p>

<!-- CTA -->
<div style="text-align:center;margin:35px 0">

<a
href="https://tastygo.app"
style="
display:inline-block;
background:#f97316;
color:#ffffff;
padding:14px 30px;
border-radius:6px;
text-decoration:none;
font-weight:bold;
font-size:16px;
"
>
Start Ordering
</a>

</div>

<p style="
  color:#4b5563;
  line-height:1.7;
">
Thank you for choosing TastyGo. We can't wait to deliver something
delicious to you! 🍕🍔🍟
</p>

<p style="
  margin-top:30px;
  color:#111827;
  line-height:1.6;
">
Happy ordering,<br />
<strong>The TastyGo Team</strong>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td
style="
background:#f9fafb;
padding:20px;
text-align:center;
font-size:13px;
color:#9ca3af;
"
>

<p style="margin:0 0 8px 0">
© ${new Date().getFullYear()} TastyGo. All rights reserved.
</p>

<p style="margin:0">
Delicious food. Delivered to you.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
