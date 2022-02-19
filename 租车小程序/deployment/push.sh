DOMAIN=$1
VERSION=$2
docker tag kucar/$DOMAIN ccr.ccs.tencentyun.com/carcar/$DOMAIN:$VERSION
docker push ccr.ccs.tencentyun.com/carcar/$DOMAIN:$VERSION
