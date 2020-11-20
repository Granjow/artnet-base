# artnet-base

Art-Net is a protocol to send DMX512 data over Ethernet/UDP. This package provides functionality to construct such Art-Net packages and send them to Art-Net nodes.

```typescript
var options: ArtnetSenderConfig = {
    host: '2.0.0.5',
    networkInterface: 'eth0',
}

const artnet = new ArtnetSender( options );
artnet.send( 0, [255, 0, 0, 220, 240, 63 ] );an
```

This package was slightly inspired by the [artnet][artnet].

[artnet]: https://www.npmjs.com/package/artnet

https://artisticlicence.com/WebSiteMaster/User%20Guides/art-net.pdf
https://art-net.org.uk/
