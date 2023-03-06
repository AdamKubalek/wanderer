const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export abstract class Characters {
        public maxHealthPoints: number
        public currentHealthPoints: number
        public defend: number
        public strikePoints: number
        public level: number
        public XP: number
    
    constructor(public x: number, public y: number, public monsterImage?: HTMLImageElement) {}
    
}

export class Hero extends Characters {
    heroDown = document.getElementById('hero-down') as HTMLImageElement;
    heroUp = document.getElementById('hero-up') as HTMLImageElement;
    heroLeft = document.getElementById('hero-left') as HTMLImageElement;
    heroRight = document.getElementById('hero-right') as HTMLImageElement;
    heroImageDirection: HTMLImageElement;
    
    constructor() {
        super(0, 0)

        this.maxHealthPoints = 20 + 3 * (Math.floor(Math.random() * 6) + 1)
        this.currentHealthPoints = 20 + 3 * (Math.floor(Math.random() * 6) + 1)
        this.defend = 2 * (Math.floor(Math.random() * 6) + 1)
        this.strikePoints = 5 + (Math.floor(Math.random() * 6) + 1)
        this.level = 1
        this.XP = 0
        this.heroImageDirection = this.heroDown
    }

    status() {
        ctx.font = "20px Times"
        ctx.clearRect(600, 0, 400,  600)
        ctx.fillText(`Level: ${this.level}`, 650, 50)
        ctx.fillText(`Health Points: ${this.currentHealthPoints}`, 650, 75)
        ctx.fillText(`XP: ${this.XP}`, 650, 100)
        ctx.fillText(`Level: ${this.level}`, 650, 125)
        ctx.fillText(`Defend: ${this.defend}`, 650, 150)
        ctx.fillText(`Strike Point: ${this.strikePoints}`, 650, 175)
    }

    strike(monster: Characters) {
        let heroStrikeValue = this.strikePoints + (Math.floor(Math.random() * 6) + 1) * 2
    
        if (monster.defend < heroStrikeValue) {
            monster.currentHealthPoints -= heroStrikeValue
        }
    }

    levelUp() {
        this.maxHealthPoints += Math.floor(Math.random() * 6) + 1
        this.defend += Math.floor(Math.random() * 6) + 1
        this.strikePoints += Math.floor(Math.random() * 6) + 1
    }
}

export class Skeletons extends Characters {
    public skeletonImage = document.getElementById('skeleton') as HTMLImageElement;

    constructor(x: number, y: number, skeletonImage = document.getElementById('skeleton') as HTMLImageElement) {
        super(x, y, skeletonImage)
        this.maxHealthPoints = 2 * this.level * (Math.floor(Math.random() * 6) + 1)
        this.currentHealthPoints = this.maxHealthPoints
        this.defend = this.level / 2 * (Math.floor(Math.random() * 6) + 1)
        this.strikePoints = this.level * (Math.floor(Math.random() * 6) + 1)
    }

    strike(hero: Hero) {
        let monsterStrikeValue = this.strikePoints + (Math.floor(Math.random() * 6) + 1) * 2

        if (hero.defend < monsterStrikeValue) {
            hero.currentHealthPoints -= monsterStrikeValue;
        }
    }
}

export class Boss extends Characters {
    constructor(x: number, y: number, bossImage = document.getElementById('boss') as HTMLImageElement) {
        super(x, y, bossImage)

        this.maxHealthPoints = 2 * this.level * (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1)
        this.currentHealthPoints = this.maxHealthPoints
        this.defend = this.level / 2 * (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) / 2
        this.strikePoints = this.level * (Math.floor(Math.random() * 6) + 1) + this.level
    }

    strike(hero: Hero) {
        let bossStrikeValue = this.strikePoints + (Math.floor(Math.random() * 6) + 1) * 2

        if (hero.defend < bossStrikeValue) {
            hero.currentHealthPoints -= bossStrikeValue;
        }
    }
}

