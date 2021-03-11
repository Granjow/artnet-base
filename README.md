# artnet-base

Art-Net is a protocol to send DMX512 data over Ethernet/UDP. This package
provides functionality to construct such Art-Net packages and to send them to
Art-Net nodes.

```typescript
var options: ArtnetSenderConfig = {
    host: '2.0.0.5',
    networkInterface: 'eth0',
}

const artnet = new ArtnetSender( options );
artnet.send( 0, [255, 0, 0, 220, 240, 63 ] );
```

`artnet-base` provides classes for different Art-Net packages to make crafting
an own package easy. Currently, `ArtnetDmxPackage` is available.


## About Art-Net

[Art-Net][artnet] can be used to send DMX data to Art-Net nodes (i.e. a device
which receives Art-Net packages over TCP/IP and then converts them to DMX). It
also provides a lot of additional functionality, as described in the [Art-Net 4
Specification][v4]. A selection of Art-Net packages:

* `ArtPoll` to query information about the device status, name, and IOs
* `ArtTimeCode` to send timecodes for syncing audio and video
* `ArtCommand` and `ArtTrigger` to send application specific commands and
  triggers
* `ArtDmx` and `ArtNzs` to send DMX data; the latter is used to send DMX data
  starting at a channel > 1
* `ArtFirmwareMaster` to update device firmware

Art-Net nodes by default use an IP address in the `2.x.x.x/8` range.


## About artnet-base

This package was written to control a LED Rail (the Stairville LED Pixel Rail
40 RGB MKII) over Ethernet from a Raspberry Pi. It was inspired by the
[artnet][artnet] package, but I needed a reliable and fast version.


## Changelog

### v1.1.0 – 2021-03-11

* Fixed universe addressing for universes > 0


[artnet-npm]: https://www.npmjs.com/package/artnet
[v4]: https://artisticlicence.com/WebSiteMaster/User%20Guides/art-net.pdf
[artnet]: https://art-net.org.uk/
