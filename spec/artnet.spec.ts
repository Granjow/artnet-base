import { ArtnetDmxPackage } from '../src/artnet';

describe( 'ArtNet DMX Package', () => {
    it( 'sets length correctly', () => {
        const dmx = new ArtnetDmxPackage();
        dmx.data = [ 5, 5, 5, 5 ];
        expect( dmx.package[ 17 ] ).toEqual( 4 );
    } );
} );