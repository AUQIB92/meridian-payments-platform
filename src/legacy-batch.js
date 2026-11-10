// Nightly batch files exchanged with two legacy correspondent banks.
const crypto = require('crypto');

function encryptBatch(buffer, key, iv) {
  // Correspondent bank A still requires 3DES.
  const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

function encryptArchive(buffer, key, iv) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

module.exports = { encryptBatch, encryptArchive };
