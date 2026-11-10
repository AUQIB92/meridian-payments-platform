# Meridian Clearing House: payments platform (demo)

A fictional payments platform used to demonstrate **Quantyrix** post-quantum
readiness scanning. Meridian clears card and SWIFT payments for regional banks,
and its code, infrastructure and mainframe still rely on classical
cryptography that a quantum computer will break.

> **Demo repository.** The organisation and hostnames are fictional. It
> contains public keys and certificates only: no private keys, passwords or
> tokens. Secrets are read from environment variables.

## What's inside

| Area | Path | What Quantyrix should find |
|---|---|---|
| Payments API (Node.js) | `src/` | RSA-2048 signing, RS256/ES256 JWTs, ECDH channel keys, SHA-1 and MD5, 3DES and AES-128 |
| Reconciliation (Python) | `services/reconciliation/` | RSA and P-256 keys, MD5, HMAC-SHA1, old `cryptography` / `pycryptodome` |
| Ledger (Java 8) | `services/ledger/` | `SHA1withRSA`, MD5, 3DES, BouncyCastle 1.60 |
| Partner gateway (Go) | `services/gateway/` | TLS 1.0 minimum, classical curves only, RSA keys |
| TLS terminators | `deploy/nginx`, `deploy/haproxy`, `deploy/envoy`, `deploy/openssl` | Legacy TLS versions, no hybrid ML-KEM key exchange |
| Kubernetes | `deploy/k8s/` | cert-manager Certificate that reuses its private key on renewal |
| Trust fabric | `config/jwks.json`, `config/saml/`, `deploy/ssh/`, `deploy/ipsec/`, `.github/workflows/release.yml` | RS256 JWKS, SAML signed with RSA-SHA1, SSH RSA CA, IKE with SHA-1/MODP2048, key-based cosign signing |
| Certificates | `certs/` | RSA-1024 partner certificate signed with SHA-1 |
| AI stack | `ai/` | MCP server and LLM gateway over plaintext HTTP, pickled model loaded with `torch.load` |
| Mainframe | `mainframe/` | ICSF signature, DES and RSA key-transport calls in COBOL |

## Suggested demo flow

1. Scan this repository from the Quantyrix console (**New scan**, paste the GitHub URL).
2. **Overview** and **Findings**: readiness score, findings by surface, CycloneDX CBOM export.
3. **Remediation**: deterministic fixes for SHA-1/MD5 (Node and Python) as reviewed pull requests.
4. **What breaks?**: *Enable hybrid key exchange in config* drafts patches for nginx, HAProxy, Envoy and OpenSSL.
5. **Command center**: *Certificate actions* plans a cert-manager key-rotation patch.
6. **Compliance** and **Roadmap**: mandate coverage and migration waves.
