package com.meridian.ledger;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.Signature;
import javax.crypto.Cipher;

/** Signs end-of-day ledger snapshots for the regulator feed. */
public class LedgerSigner {
    private final KeyPair keyPair;

    public LedgerSigner() throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048);
        this.keyPair = kpg.generateKeyPair();
    }

    public byte[] signSnapshot(byte[] snapshot) throws Exception {
        Signature sig = Signature.getInstance("SHA1withRSA");
        sig.initSign(keyPair.getPrivate());
        sig.update(snapshot);
        return sig.sign();
    }

    public byte[] checksum(byte[] snapshot) throws Exception {
        return MessageDigest.getInstance("MD5").digest(snapshot);
    }

    public Cipher legacyCipher() throws Exception {
        return Cipher.getInstance("DESede/CBC/PKCS5Padding");
    }
}
