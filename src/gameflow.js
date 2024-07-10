import { renderGrid } from "./rendering.js";
import { tempAssets } from "./assets.js";

export function gameFlow() {
    tempAssets.playerOne.isPlayerTurn = true;
    const playerOneDiv = document.querySelector('.playerOne');
    const playerTwoDiv = document.querySelector('.playerTwo');
    renderGrid(tempAssets.playerOne, playerOneDiv, tempAssets.playerTwo);
    renderGrid(tempAssets.playerTwo, playerTwoDiv, tempAssets.playerOne);

}