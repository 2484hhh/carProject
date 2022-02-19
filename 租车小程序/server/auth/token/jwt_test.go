package token

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
	"time"
)

const privateKey =`-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAhoB0kU+h4+TpvQYLJDuMeMHlgTaWSAWYFIrN6yNRbgjS/DQK
ZzuNfsSY1PM93m7GHx4afiKunuaVLlaep4Wu4U35RI/4ImsenuWWXoCMF13kt0qB
aDrYgJMPhGlQ34PxmFwfXzDiqbLyySrAz4Jf5kLUbvjwGo28Wdn/axEva0BTP3uB
LGtF+cniDPx4Qc8I4J0HoxUZmvdileL//8em9IeiEljsZYq20JOVOzuGiTpVidyK
iyckCQ2SfS5SjCdHG8vQeVA19F8GsdcDyszTU9GHjCjK+FW6YGJQ1po85YMGfoU6
zjLyu9/Iv8QvmopFmQ2XX7eBVVlvzo5Co3PHxwIDAQABAoIBAEAh5fMXpli04OK5
i/x1zHAT/CvVbGjhCffZi4Av8fbmjDunUMKSedBVS45WgUybQyq5PuagAOVRixZy
ROoZ6x4RAOc5QpaevxYC4OUkpCfMJG9lPjkFvg/oj0CSuvYowrzkSC0qcRl7cxqK
oS8Quktf2E0ls87lgEbTlF9n7VVUwKaOp9uSA7qcW9DB5KGp7Ar4CILCDI2r4txj
oYJk4qTJsl+JjRu+kAwT1c2YZvAT3easo/SkG++DR7b0EJIrDxYi9vgPnx6N2qzc
1IXDWoOJ9rQXGLThupEHWvnpZPGk76eo2wGUr18m8v/SnHH1Ml6NtTE4XsvLNAb+
BwGGxzkCgYEAuu4BJtSGcQ/1NrUIt8ZbcSeX7cupcS1NX3zT2OnGe821ckLwjqhx
0+BKrTC+I+AGFUe6o4oe+fv3shRWH2NXzMlSTVfy+EZpGx6pfnKPeN1AwdD7LBBk
vS6esgUiUJTxMSwLPPvuADwptHZdX1VMEr0TV+uidwYgDI6+gEBq0f0CgYEAuDM0
fGN2X3r7A4hFwu1aKpHmuFjai7uxGixZEoG83o6B+ZmeLx00DcEbRK8JsrY5JFfF
nptQ9LsUQsfDCwo9bqm4ydRPqBypspE5UqE1izuJTqf8QX1lvdIvh2DDs+Tw0fNF
I0O+LT82AAumyv1w0vy+9mltecFy6kwO/LpEmhMCgYA2uUqZBYq+Or+83k7JDkbi
34Z41TCrs2l9VNvoGrhCsjw2USZ/fQylzHnQLf7cHc9qF2+qRNtAr+UZux5jXf/s
MdvoTKES0fofOGDCZeNerNcyZm3BvqLfR3CqCRq8oH3juVMo7VAFvZcv/57iM+Rr
b/LjwFX1plNnmbpnbXRYOQKBgHTYnpHNclitJbAe8MnvUMQyW15TlwcO4BCPU02H
GS1Azzhrd0nBx7R16/tM4eUI7QSd3RF4ywkD551ZJOPK8h9R8JOvZ3xn+kn5D5jY
BKQ29yn7K+zLRA/+1gGVo29pak50eEYfgfMn5vRub7bSwJBGnkinpjeXPHNeHh+5
dS0bAoGBAIu1DGyzl3skmPdHIt7LuOHfGzJywa/NIg0Wg0DJKT84hHEBZffJB/RB
lVQ5gFfMnIp1L0VDLB8obvmURrA/dwP6i2PRm/ltJZ1jBGEJ6BO0fli1n1kvH6PN
VkrlabitHvJiCys5+zwya1coqi2un0W+yYZkZeSQunX7lHE5bP5t
-----END RSA PRIVATE KEY-----`

func TestGenerateToken(t *testing.T) {
	key,err:=jwt.ParseRSAPrivateKeyFromPEM([]byte(privateKey))
	if err!=nil{
		t.Fatalf("cannot parse private key: %v",err)
	}
	g:=NewJWTTokenGen("coolcar/auth",key)
	g.nowFunc= func() time.Time {
		return time.Unix(1516239022,0)
	}
	tkn,err:=g.GenerateToken("61c1961464b1dcb731fe7613",2*time.Hour)
	if err!=nil{
		t.Errorf("GenerateToken err: %v",err)
	}
	want:="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyNDYyMjIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiY29vbGNhci9hdXRoIiwic3ViIjoiNjFjMTk2MTQ2NGIxZGNiNzMxZmU3NjEzIn0.P2_coXMD3PP-DNSg_X7ojG55NW4IYY1ZQDIHkqbrNl-oACgdXBK-iFkPAAbWvwnmN3hhxgi46sga1LHTjF2_1HCXqUiNI6fIKXLOUKAntesbyHizDu2owihlsUaM6aRyhuWPCHe6eavxg2PzRV4q01QaeFBuirvHHrQ5HYfwSmzXGagtWz1fEH8Ks6h7OH6ksvORijrm3p92a04YHghK9r1hfNsHsLOfPiYH3waAtzmmPpY0eAxLPNcfphbIpuJtDjkKradc48AEaWA7bOL-u-3zH1_EE-ncLDuGedV5B65gKgE_hICz5ZqYXJ6Qew4ZJLjZu3yA39Tj21DswIY12Q"
	if tkn!=want{
		t.Errorf("wrong token generated")
	}

}