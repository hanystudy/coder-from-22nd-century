# coder from 22nd century (c22)

## Why

A demo of Micro-Situational Mixed Reality. You could check it out from [this article](http://www.hanyi.name/blog/2016/11/20/micro-situational-mixed-reality/) (Chinese only), or youtube video below (English subtitle).

[![C22](http://img.youtube.com/vi/24fQwHYODeI/0.jpg)](http://www.youtube.com/watch?v=24fQwHYODeI"Coder from 22nd Century")

![Full](http://7xk84n.com1.z0.glb.clouddn.com/c22/full.jpg)

Does world still need coders in 22nd century? No one knows except who may have ability on somehow mysterious prophecy. Depending on the trend of technology growth in next decades years, while it is indeed possible to deliver a blueprint which describes a programming scene that overcomes the gap from time to space, from devices to brains.

## Compatibility

All OS supported for the Host.

VR display (Cardboard) only work for Android now. Other platforms please refer to [WebRTC website](https://webrtc.org/native-code/)

Basically the major techniques (WebRTC, WebVR) of C22 are not widely supported by mobile world (up to end of Nov, 2016), but which is highly possible to be brought to Android & IOS in 2017 according to both engineers interview from Google and Apple.

There is no stable version browser supporting WebVR natively, luckily we use webvr-polyfill for early development. Or you may use latest version of Chrome without it.

Besides WebVR, The incompatibility is mainly from WebRTC, which Safari totally ignore (should be released in 2017).

## Network

In development we prefer using WIFI HotSpot directly than communicating through any AP. Please make sure your WIFI environment is unlimited otherwise there may be unbearable lag in mobile devices.

## Resolution

It's strictly limited to mobile devices and hardly to be resolved by us. But our suggestion is just using lower display resolution in your PC.

In development we switched to 1024*640 for Mac Pro, you could try higher if you have mobile screen with 1080p or plus.

## How to use

Install packages for both desktop code and server code:
```[shell]
npm install
```
Build bundle.js for both desktop code and server code:
```[shell]
webpack
```
Under root path, run:
```[shell]
npm start
```
Open chrome in your cardboard device, and access:

http://host:8301

Try to active some applications screen in host side and come back to VR.

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

## Roadmap

Native WebVR support

Elastic apps showing

Control switch for apps

Network tuning

Display tuning

Native WebVR apps support

Peripherals for WebVR apps (like bluetooth keyboards, earphones, daydream controllers, etc)

Well supported peripherals summary

Support for non-coders

#### License [CC0 1.0 (Public Domain)](LICENSE.md)
