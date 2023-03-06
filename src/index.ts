import { GamePlay } from "./gamePlay";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

window.onload = () => {
    // Drawing a floor tile  
    let myFirstGame = new GamePlay()
    myFirstGame.firstGame.newLevel()
    myFirstGame.firstGame.refreshLevel()
    myFirstGame.generateMonsters()
    myFirstGame.createTheBoard()
    myFirstGame.keypress()
}

 
    



