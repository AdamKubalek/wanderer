export abstract class Tile {
    pictureDraw: any;
}

export class Floor extends Tile {
    pictureDraw = document.getElementById('floor') as HTMLImageElement;
}


export class Wall extends Tile {
    pictureDraw = document.getElementById('wall') as HTMLImageElement;
}