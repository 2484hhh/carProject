set PROTO_PATH=.\blob\api\
set GO_OUT_PATH=.\blob\api\gen\v1
mkdir  %GO_OUT_PATH%
protoc --go_out=%GO_OUT_PATH% --go_opt=paths=source_relative --go-grpc_out=%GO_OUT_PATH% --go-grpc_opt=paths=source_relative %PROTO_PATH%blob.proto

set PBTS_BIN_DIR=E:\Goproject\src\coolcar\wx\miniprogram\node_modules\.bin
set PBTS_OUT_DIR=E:\Goproject\src\coolcar\wx\miniprogram\service\proto_gen\blob
mkdir %PBTS_OUT_DIR%

%PBTS_BIN_DIR%\pbjs -t static -w es6 %PROTO_PATH%\blob.proto --no-create --no-verifty --no-delimited --force-number -o %PBTS_OUT_DIR%\blob_pb_tmp.js
