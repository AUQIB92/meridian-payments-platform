// Partner sessions: JWTs signed with RS256 and an ECDH channel key.
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function issuePartnerToken(partnerId, privateKeyPem) {
  return jwt.sign({ sub: partnerId, scope: 'clearing' }, privateKeyPem, { algorithm: 'RS256', expiresIn: '1h' });
}

function verifyPartnerToken(token, publicKeyPem) {
  return jwt.verify(token, publicKeyPem, { algorithms: ['RS256', 'ES256'] });
}

// Per-session channel key agreed with the partner's gateway.
function channelKey(peerPublicKey) {
  const ecdh = crypto.createECDH('prime256v1');
  ecdh.generateKeys();
  return { publicKey: ecdh.getPublicKey('base64'), secret: ecdh.computeSecret(peerPublicKey, 'base64') };
}

module.exports = { issuePartnerToken, verifyPartnerToken, channelKey };
