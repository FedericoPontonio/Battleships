import { renderGrid, renderInitialForm } from "./rendering.js";
import { tempAssets } from "./assets.js";


export function gameFlow() {
    renderInitialForm(tempAssets.playerOne, tempAssets.playerTwo);
    tempAssets.playerOne.isPlayerTurn = true;
};
