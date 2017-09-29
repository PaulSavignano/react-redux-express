const forceSSL = (req, res, next) => {
  let sslUrl;
  if (process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https') {
    sslUrl = ['https://', req.hostname, req.url].join('');
    return res.redirect(sslUrl);
  }
  return next();
}

export default forceSSL
