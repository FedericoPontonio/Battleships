import { renderGrid, renderInitialForm } from "./rendering.js";
import { playersData } from "./playersData.js";


export function gameFlow() {
    renderInitialForm(playersData.playerOne, playersData.playerTwo);
    playersData.playerOne.isPlayerTurn = true;
};