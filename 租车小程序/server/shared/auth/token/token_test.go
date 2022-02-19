package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

const publicKey=`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhoB0kU+h4+TpvQYLJDuM
eMHlgTaWSAWYFIrN6yNRbgjS/DQKZzuNfsSY1PM93m7GHx4afiKunuaVLlaep4Wu
4U35RI/4ImsenuWWXoCMF13kt0qBaDrYgJMPhGlQ34PxmFwfXzDiqbLyySrAz4Jf
5kLUbvjwGo28Wdn/axEva0BTP3uBLGtF+cniDPx4Qc8I4J0HoxUZmvdileL//8em
9IeiEljsZYq20JOVOzuGiTpVidyKiyckCQ2SfS5SjCdHG8vQeVA19F8GsdcDyszT
U9GHjCjK+FW6YGJQ1po85YMGfoU6zjLyu9/Iv8QvmopFmQ2XX7eBVVlvzo5Co3PH
xwIDAQAB
-----END PUBLIC KEY-----`

func TestJWTTokenVerifier_Verify(t *testing.T) {
	pubKey,err:=jwt.ParseRSAPublicKeyFromPEM([]byte(publicKey))
	if err!=nil{
		t.Fatalf("cannot parse public ker:%v",err)
	}
	v:=&JWTTokenVerifier{
		PublicKey:pubKey,

	}

	cases :=[]struct{
		name	string
		tkn		string
		now 	time.Time
		want	string
		wantERR	bool

	}{
		{
			name: "valid_token",
			tkn: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjFjMTk2MTQ2NGIxZGNiNzMxZmU3NjEzIn0.P2_coXMD3PP-DNSg_X7ojG55NW4IYY1ZQDIHkqbrNl-oACgdXBK-iFkPAAbWvwnmN3hhxgi46sga1LHTjF2_1HCXqUiNI6fIKXLOUKAntesbyHizDu2owihlsUaM6aRyhuWPCHe6eavxg2PzRV4q01QaeFBuirvHHrQ5HYfwSmzXGagtWz1fEH8Ks6h7OH6ksvORijrm3p92a04YHghK9r1hfNsHsLOfPiYH3waAtzmmPpY0eAxLPNcfphbIpuJtDjkKradc48AEaWA7bOL-u-3zH1_EE-ncLDuGedV5B65gKgE_hICz5ZqYXJ6Qew4ZJLjZu3yA39Tj21DswIY12Q",
			now: time.Unix(1516239122,0),
			want:"61c1961464b1dcb731fe7613",
		},
		{
			name: "token_expired",
			tkn: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjFjMTk2MTQ2NGIxZGNiNzMxZmU3NjEzIn0.P2_coXMD3PP-DNSg_X7ojG55NW4IYY1ZQDIHkqbrNl-oACgdXBK-iFkPAAbWvwnmN3hhxgi46sga1LHTjF2_1HCXqUiNI6fIKXLOUKAntesbyHizDu2owihlsUaM6aRyhuWPCHe6eavxg2PzRV4q01QaeFBuirvHHrQ5HYfwSmzXGagtWz1fEH8Ks6h7OH6ksvORijrm3p92a04YHghK9r1hfNsHsLOfPiYH3waAtzmmPpY0eAxLPNcfphbIpuJtDjkKradc48AEaWA7bOL-u-3zH1_EE-ncLDuGedV5B65gKgE_hICz5ZqYXJ6Qew4ZJLjZu3yA39Tj21DswIY12Q",
			now: time.Unix(1517239122,0),
			wantERR: true,
		},
		{
			name: "bad_token",
			tkn: "bad_token",
			now: time.Unix(1517239122,0),
			wantERR: true,
		},
		{
			name:"fake_token",
			tkn: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjFjMTk2MTQ2NGIxZGNiNzMxZmU3NjE0In0.P2_coXMD3PP-DNSg_X7ojG55NW4IYY1ZQDIHkqbrNl-oACgdXBK-iFkPAAbWvwnmN3hhxgi46sga1LHTjF2_1HCXqUiNI6fIKXLOUKAntesbyHizDu2owihlsUaM6aRyhuWPCHe6eavxg2PzRV4q01QaeFBuirvHHrQ5HYfwSmzXGagtWz1fEH8Ks6h7OH6ksvORijrm3p92a04YHghK9r1hfNsHsLOfPiYH3waAtzmmPpY0eAxLPNcfphbIpuJtDjkKradc48AEaWA7bOL-u-3zH1_EE-ncLDuGedV5B65gKgE_hICz5ZqYXJ6Qew4ZJLjZu3yA39Tj21DswIY12Q",
			now: time.Unix(1516239122,0),
			wantERR: true,
		},
	}

	for _,c:=range cases{
		t.Run(c.name, func(t *testing.T) {
			jwt.TimeFunc= func() time.Time {
				return c.now
			}
			accountID,err:=v.Verify(c.tkn)
			if !c.wantERR && err!=nil {
				t.Fatalf("verification failed:%v",err)
			}
			if c.wantERR && err==nil{
				t.Fatalf("want error; got no error")
			}
			if accountID!=c.want{
				t.Errorf("wrong account id.  want:%q,got %q",c.want,accountID)
			}

		})
	}


}