"""Reconciliation service: matches settlement files against the ledger."""
import hashlib
import hmac

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec, padding, rsa


def load_bank_key(pem: bytes):
    return serialization.load_pem_public_key(pem)


def new_signing_key():
    return rsa.generate_private_key(public_exponent=65537, key_size=2048)


def sign_report(private_key, report: bytes) -> bytes:
    return private_key.sign(report, padding.PKCS1v15(), hashes.SHA256())


def device_key():
    return ec.generate_private_key(ec.SECP256R1())


def file_fingerprint(data: bytes) -> str:
    return hashlib.md5(data).hexdigest()


def legacy_mac(key: bytes, data: bytes) -> str:
    return hmac.new(key, data, hashlib.sha1).hexdigest()
