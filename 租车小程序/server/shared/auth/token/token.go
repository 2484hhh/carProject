package token

import (
	"crypto/rsa"
	"fmt"
	"github.com/dgrijalva/jwt-go"
)

// Verifier  verifies access tokens.
type JWTTokenVerifier struct {
	PublicKey *rsa.PublicKey
}

// Verify verifies a token and returns account id.
func (v *JWTTokenVerifier) Verify(token string)(string,error)  {
	t,err:=jwt.ParseWithClaims(token,&jwt.StandardClaims{},
		func(verifier *jwt.Token) (interface{}, error){
			return v.PublicKey,nil
		})
	if err!=nil{
		return "",fmt.Errorf("cannot parse tiken:%v",err)
	}
	if !t.Valid{
		return "",fmt.Errorf("token not valid")
	}
	clm,ok:=t.Claims.(*jwt.StandardClaims)
	if !ok {
		return "",fmt.Errorf("token claim is not StandardClaim")
	}

	if err=clm.Valid();err!=nil{
		return "",fmt.Errorf("claim not valid:%v",err)
	}
	return clm.Subject,nil
}

