set PROTO_PATH=.\auth\api\
set GO_OUT_PATH=.\auth\api\gen\v1
mkdir  %GO_OUT_PATH%
protoc --go_out=%GO_OUT_PATH% --go_opt=paths=source_relative --go-grpc_out=%GO_OUT_PATH% --go-grpc_opt=paths=source_relative %PROTO_PATH%auth.proto
protoc --grpc-gateway_out=%GO_OUT_PATH% --grpc-gateway_opt=paths=source_relative --grpc-gateway_opt=grpc_api_configuration=%PROTO_PATH%\auth.yaml %PROTO_PATH%auth.proto

set PBTS_BIN_DIR=E:\Goproject\src\coolcar\wx\miniprogram\node_modules\.bin
set PBTS_OUT_DIR=E:\Goproject\src\coolcar\wx\miniprogram\service\proto_gen\auth
mkdir %PBTS_OUT_DIR%

%PBTS_BIN_DIR%\pbjs -t static -w es6 %PROTO_PATH%\auth.proto --no-create --no-verifty --no-delimited -o %PBTS_OUT_DIR%\auth_pb_tmp.js

