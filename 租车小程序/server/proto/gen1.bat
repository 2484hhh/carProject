protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative trip.proto
protoc --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative --grpc-gateway_opt=grpc_api_configuration=trip.yaml trip.proto

set PBTS_BIN_DIR=E:/Goproject/src/coolcar/wx/miniprogram/node_modules/.bin
set PBTS_OUT_DIR=E:/Goproject/src/coolcar/wx/miniprogram/service/proto_gen

E:/Goproject/src/coolcar/wx/miniprogram/node_modules/.bin/pbjs -t static -w es6 trip.proto --no-create --no-verifty --no-delimited -o %PBTS_OUT_DIR%/trip_pb_tmp.js
