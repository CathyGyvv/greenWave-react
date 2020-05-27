#!/bin/sh
cp -r assets/node_modules/babel-polyfill/dist/* .package/assets/lib
cp -r assets/node_modules/react/dist/* .package/assets/lib
cp -r assets/node_modules/react-dom/dist/* .package/assets/lib
cp -r assets/node_modules/react-router/umd/* .package/assets/lib
cp -r assets/node_modules/react-leaflet/dist/* .package/assets/lib
cp -r assets/node_modules/leaflet/dist/* .package/assets/lib
cp -r assets/node_modules/d3/d3.min.js .package/assets/lib
cp -r assets/node_modules/lodash/* .package/assets/lib
# cp -r assets/node_modules/antd/dist/* .package/assets/lib
# cp -r assets/node_modules/@ali/gas.gl/dist/* .package/assets/lib
# cp -r assets/node_modules/bizcharts/umd/* .package/assets/lib
cp -r assets/node_modules/intl/dist/* .package/assets/lib
cp -r assets/styles/* .package/assets/styles
cp -r assets/public/* .package/assets/public