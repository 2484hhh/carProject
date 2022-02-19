set PBTS_BIN_DIR=E:\Goproject\src\coolcar\wx\miniprogram\node_modules\.bin
set PBTS_OUT_DIR=E:\Goproject\src\coolcar\wx\miniprogram\service\proto_gen\rental
echo import * as $protobuf from "protobufjs"; > %PBTS_OUT_DIR%\rental_pb.js
type %PBTS_OUT_DIR%\rental_pb_tmp.js >>%PBTS_OUT_DIR%\rental_pb.js
del %PBTS_OUT_DIR%\rental_pb_tmp.js

%PBTS_BIN_DIR%\pbts -o %PBTS_OUT_DIR%\rental_pb.d.ts  %PBTS_OUT_DIR%\rental_pb.js
