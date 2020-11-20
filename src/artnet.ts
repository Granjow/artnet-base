import { createSocket, Socket } from 'dgram';

export enum ArtOpCode {
    OpPoll = 0x2000,
    OpPollReply = 0x2100,
    OpNzs = 0x5100,
    OpDmx = 0x5000,
}

export abstract class ArtnetPackage {
    id = 'Art-Net'.split( '' ).map( ( el ) => el.charCodeAt( 0 ) ).concat( 0x00 );
    opCode: ArtOpCode = ArtOpCode.OpDmx;
    protocolVersionHigh = 0;
    protocolVersionLow = 14;

    get header(): number[] {
        return this.id.concat( [ this.lo( this.opCode ), this.hi( this.opCode ), this.protocolVersionHigh, this.protocolVersionLow ] );
    }

    get package(): number[] {
        return this.header.concat( this.body );
    }

    abstract get body(): number[];

    protected hi( bytes: number ) {
        return ( bytes >> 8 ) & 0xff;
    }

    protected lo( bytes: number ) {
        return bytes & 0xff;
    }
}

export class ArtnetDmxPackage extends ArtnetPackage {
    sequence = 0;
    physical = 0;
    universe = 0;
    data: number[] = [];

    get body(): number[] {
        return [
            this.sequence,
            this.physical,
            this.hi( this.universe ),
            this.lo( this.universe ),
            this.hi( this.data.length ),
            this.lo( this.data.length ),
        ].concat( this.data );
    }

}

export interface ArtnetSenderConfig {
    host: string;
    networkInterface: string;
}

export class ArtnetSender {

    constructor( public config: ArtnetSenderConfig ) {
        this._networkInterface = config.networkInterface;
        this._host = config.host;
        const socket = createSocket( {
            type: 'udp4',
            reuseAddr: true,
        } );

        socket.on( 'error', ( err: any ) => {
            console.error( 'Socket error:', err );
        } );

        this._socket = socket;
    }


    send( universe: number, data: number[] ): Promise<number> {
        return new Promise( ( resolve, reject ) => {

            const artDmx = new ArtnetDmxPackage();
            artDmx.universe = universe;
            artDmx.data = data.slice();

            const buf = Buffer.from( artDmx.package );
            this._socket.send( buf, 0, buf.length, this._port, this._host, ( error, bytes ) => {
                if ( error ) reject( error );
                else resolve( bytes );
            } );
        } );
    }

    close() {
        this._socket.close();
    };

    private readonly _socket: Socket;
    private readonly _networkInterface;
    private readonly _host;
    private readonly _port = 6454;
}

const ap = new ArtnetDmxPackage();
console.log( ap.header );
ap.data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

console.dir( ap.body );
console.dir( ap.package );