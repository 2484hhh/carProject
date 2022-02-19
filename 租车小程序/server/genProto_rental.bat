set PROTO_PATH=.\rental\api\
set GO_OUT_PATH=.\rental\api\gen\v1
mkdir  %GO_OUT_PATH%
protoc --go_out=%GO_OUT_PATH% --go_opt=paths=source_relative --go-grpc_out=%GO_OUT_PATH% --go-grpc_opt=paths=source_relative %PROTO_PATH%rental.proto
protoc --grpc-gateway_out=%GO_OUT_PATH% --grpc-gateway_opt=paths=source_relative --grpc-gateway_opt=grpc_api_configuration=%PROTO_PATH%\rental.yaml %PROTO_PATH%rental.proto

set PBTS_BIN_DIR=E:\Goproject\src\coolcar\wx\miniprogram\node_modules\.bin
set PBTS_OUT_DIR=E:\Goproject\src\coolcar\wx\miniprogram\service\proto_gen\rental
mkdir %PBTS_OUT_DIR%

%PBTS_BIN_DIR%\pbjs -t static -w es6 %PROTO_PATH%\rental.proto --no-create --no-verifty --no-delimited --force-number -o %PBTS_OUT_DIR%\rental_pb_tmp.js
