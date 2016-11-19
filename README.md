# coder from 22nd century (c22)

## Why

Does world still need coders in 22nd century? No one knows except who may have ability on somehow mysterious prophecy. Depending on the trend of technology growth in next decades years, while it is indeed possible to deliver a blueprint which describes a programming scene that overcomes the gap from time to space, from devices to brains.

## Compatibility

All OS supported for the Host.

VR display (Cardboard) only work for Android now. Other platforms please refer to [WebRTC website](https://webrtc.org/native-code/)

Basically the major techniques (WebRTC, WebVR) of C22 are not widely supported by mobile world (up to end of Nov, 2016), but which is highly possible to be brought to Android & IOS in 2017 according to both engineers interview from Google and Apple.

There is no stable version browser supporting WebVR natively, luckily we use webvr-polyfill for early development. Or you may use latest version of Chrome without it.

Besides WebVR, The incompatibility is mainly from WebRTC, which Safari totally ignore (should be released in 2017).

## How to use
```[shell]
npm install

npm start
```
Open chrome in your cardboard device, and access:

http://host:8301

Try to active some applications screen in Host side and Come back to VR.

Enjoy and be dizzy:p

## Technologies

Thus we have this repository, which has technology stack of:

Electron

Express

WebSocket

WebRTC

WebVR

three.js

~~Unity3D~~

#### License [CC0 1.0 (Public Domain)](LICENSE.md)
