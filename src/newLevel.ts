import { Floor, Tile, Wall } from "./tiles";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');



export class Level {
    listOfTiles: Tile[][];
    newLevel() {
        this.listOfTiles = []
            
        let gameBoard: number[][] = [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 1, 0, 0, 0]
        ]
        
        for (let y = 0; y < gameBoard.length; y++) {
            let line: Tile[] = [];
            for (let x = 0; x < gameBoard[y].length; x++) {
                if (gameBoard[y][x] === 0) {
                    line.push(new Floor()) 
                }
                else {
                   line.push(new Wall())
                }
            }
            this.listOfTiles.push(line)
        }
    }

    refreshLevel(): void {
        for (let y = 0; y < this.listOfTiles.length; y++) {
            for (let x = 0; x < this.listOfTiles[y].length; x++) {
                ctx.drawImage(this.listOfTiles[y][x].pictureDraw, x * 60, y * 60, 60, 60)
            }
        }
    }
};



