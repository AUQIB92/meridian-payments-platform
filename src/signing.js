// Payment instruction signing for the clearing API.
const crypto = require('crypto');

// Settlement keys are RSA-2048, generated at service start.
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

function signInstruction(instruction) {
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(JSON.stringify(instruction));
  return signer.sign(privateKey, 'base64');
}

function verifyInstruction(instruction, signature) {
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(JSON.stringify(instruction));
  return verifier.verify(publicKey, signature, 'base64');
}

// Idempotency key for retried instructions.
function idempotencyKey(instruction) {
  return crypto.createHash('sha1').update(instruction.reference).digest('hex');
}

// Weak ETag for statement downloads.
function statementEtag(body) {
  return crypto.createHash('md5').update(body).digest('hex');
}

module.exports = { signInstruction, verifyInstruction, idempotencyKey, statementEtag, publicKey };
