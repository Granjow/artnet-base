import { ArtnetDmxPackage } from '../src/artnet';

describe( 'ArtNet DMX Package', () => {
    it( 'sets length correctly', () => {
        const dmx = new ArtnetDmxPackage();
        dmx.data = [ 5, 5, 5, 5 ];
        expect( dmx.package[ 17 ] ).toEqual( 4 );
    } );
    it( 'sets body metadata correctly', () => {
        const dmx = new ArtnetDmxPackage();
        dmx.universe = 0;
        expect( dmx.body[ 0 ] ).toEqual( 0b0000 );
        expect( dmx.body[ 1 ] ).toEqual( 0b0000 );
        expect( dmx.body[ 2 ] ).toEqual( 0b0000 );
        expect( dmx.body[ 3 ] ).toEqual( 0b0000 );
    } );
    it.each( [
        [ 0, 0, 0 ],
        [ 1, 1, 0 ],
        [ 255, 255, 0 ],
        [ 256, 0, 1 ],
    ] )( 'sets universe in body correctly for universe %i', ( universe: number, expectedSubUni: number, expectedNet: number ) => {
        const dmx = new ArtnetDmxPackage();
        dmx.universe = universe;
        expect( dmx.body[ 2 ] ).toEqual( expectedSubUni );
        expect( dmx.body[ 3 ] ).toEqual( expectedNet );
    } );
} );
