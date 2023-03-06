import { Boss, Characters, Hero, Skeletons } from "./characters";
import { Level } from "./newLevel";
import { Floor, Tile, Wall } from "./tiles";
const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export class GamePlay{
    firstGame = new Level()
    hero = new Hero()   
    listOfMonsters: Characters[] = []
    counter: number = 0;
    listOfTiles: Tile[][] = [];
    
    createTheBoard(): void {
        this.firstGame.refreshLevel()
        this.setCharacters(this.hero.heroImageDirection, this.hero.x, this.hero.y)
        this.hero.status()
        
        
        if (this.counter % 2) {
            this.listOfMonsters.forEach((monster) => 
                this.setCharacters(monster.monsterImage, monster.x, monster.y))
        }

        else {
            this.listOfMonsters.forEach((monster) => {
                let monsterMove: number[] = this.moveMonsters(monster);     
                monster.x += monsterMove[0]
                monster.y += monsterMove[1]
                this.setCharacters(monster.monsterImage, monster.x, monster.y)
            })
        }

    }

    onKeyPress(event: any) {
        switch (event.keyCode) {
            case 37:
                if (this.nonBlocking(this.hero.x - 1, this.hero.y))
                    this.hero.x--;
                this.hero.heroImageDirection = this.hero.heroLeft
                break;
            case 38:
                if (this.nonBlocking(this.hero.x, this.hero.y - 1))
                    this.hero.y--;
                this.hero.heroImageDirection = this.hero.heroUp
                break;
            case 39:
                if (this.nonBlocking(this.hero.x + 1, this.hero.y))
                    this.hero.x++;
                this.hero.heroImageDirection = this.hero.heroRight
                break;
            case 40:
                if (this.nonBlocking(this. hero.x, this.hero.y + 1))
                    this.hero.y++;
                this.hero.heroImageDirection = this.hero.heroDown
                break;
        }
        this.counter++;
        this.createTheBoard()
    }
    
    keypress(): void {
        document.body.addEventListener('keydown', (e) => this.onKeyPress(e))
    }

    setCharacters(image: HTMLImageElement, vertical: number, horizontal: number) { 
            ctx.drawImage(image, vertical * 60, horizontal * 60, 60, 60)
    }

    nonBlocking(x: number, y: number): boolean {
        if (!this.firstGame.listOfTiles[y] || !this.firstGame.listOfTiles[y][x] || this.firstGame.listOfTiles[y][x] instanceof Wall)
            return false
        else
            return true

    }
    randomizeSpawn(): number[] {
        while (true) {
            let arr: number[] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
            if (this.firstGame.listOfTiles[arr[0]][arr[1]] instanceof Floor) {
                return arr
            }
        }
    }

    generateMonsters() {
        for (let i = 0; i < 3; i++) {
            let myArr = this.randomizeSpawn()
            this.listOfMonsters.push(new Skeletons(myArr[1], myArr[0]))
        }

        let myArrBoss = this.randomizeSpawn()
        this.listOfMonsters.push(new Boss(myArrBoss[1], myArrBoss[0]))
    }

    battle() {

    }

    moveMonsters(monster: Characters): number[] {
        let availableFloors: number[][] = []
    
        if (this.nonBlocking(monster.x + 1, monster.y)) {
                availableFloors.push([1, 0])
        }
        if (this.nonBlocking(monster.x - 1, monster.y))
            availableFloors.push([-1, 0])

        if (this.nonBlocking(monster.x, monster.y + 1))
            availableFloors.push([0, 1])

        if (this.nonBlocking(monster.x, monster.y - 1))
            availableFloors.push([0, -1])

        debugger
        return availableFloors[Math.floor(Math.random() * availableFloors.length)]
    }
        
}
