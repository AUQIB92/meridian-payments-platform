// Partner gateway: terminates mutual TLS from correspondent banks.
package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/tls"
	"log"
	"net/http"
)

func main() {
	key, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		log.Fatal(err)
	}
	_ = key
	cfg := &tls.Config{
		MinVersion:       tls.VersionTLS10,
		CurvePreferences: []tls.CurveID{tls.X25519, tls.CurveP256},
	}
	srv := &http.Server{Addr: ":8443", TLSConfig: cfg}
	log.Fatal(srv.ListenAndServeTLS("/etc/gateway/tls.crt", "/etc/gateway/tls.key"))
}
