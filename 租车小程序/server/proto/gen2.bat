echo import * as $protobuf from "protobufjs"; > E:/Goproject/src/coolcar/wx/miniprogram/service/proto_gen/trip_pb.js

cd /d E:/Goproject/src/coolcar/wx/miniprogram/service/proto_gen/
type trip_pb_tmp.js >>./trip_pb.js

del trip_pb_tmp.js

cd /d E:/Goproject/src/coolcar/wx/miniprogram/node_modules/.bin

pbts -o E:\Goproject\src\coolcar\wx\miniprogram\service\proto_gen\trip_pb.d.ts  E:\Goproject\src\coolcar\wx\miniprogram\service\proto_gen\trip_pb.js
