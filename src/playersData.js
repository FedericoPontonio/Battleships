import {Ship, Player} from './constructors.js';

//temporary constructed assets

let playerOne = Player('playerOne');
let playerTwo = Player('playerTwo');

let carrier1 = Ship(5, 'carrier');
let battleship1 = Ship(4, 'battleship');
let cruiser1=Ship(4, 'cruiser');
let submarine1=Ship(3, 'submarine');
let destroyer1=Ship(2, 'destroyer');

let carrier2 = Ship(5, 'carrier');
let battleship2 = Ship(4, 'battleship');
let cruiser2=Ship(4, 'cruiser');
let submarine2=Ship(3, 'submarine');
let destroyer2=Ship(2, 'destroyer');

playerOne.gameboard.placeBoat(carrier1, playerOne.gameboard.possiblePlacements(carrier1.size, 1,1).down);
playerOne.gameboard.placeBoat(battleship1, playerOne.gameboard.possiblePlacements(battleship1.size, 2,9).right);
playerOne.gameboard.placeBoat(cruiser1, playerOne.gameboard.possiblePlacements(cruiser1.size, 8,8).up);
playerOne.gameboard.placeBoat(submarine1, playerOne.gameboard.possiblePlacements(submarine1.size, 9,2).letf);
playerOne.gameboard.placeBoat(destroyer1, playerOne.gameboard.possiblePlacements(destroyer1.size, 5,1).down);

playerTwo.gameboard.placeBoat(carrier2, playerTwo.gameboard.possiblePlacements(carrier2.size, 6,0).letf);
playerTwo.gameboard.placeBoat(battleship2, playerTwo.gameboard.possiblePlacements(battleship2.size, 2,8).up);
playerTwo.gameboard.placeBoat(cruiser2, playerTwo.gameboard.possiblePlacements(cruiser2.size, 5,5).right);
playerTwo.gameboard.placeBoat(submarine2, playerTwo.gameboard.possiblePlacements(submarine2.size, 9,6).down);
playerTwo.gameboard.placeBoat(destroyer2, playerTwo.gameboard.possiblePlacements(destroyer2.size, 1,1).letf);
//for rapid testing of gameOver
// playerTwo.gameboard.placeBoat(carrier2, playerTwo.gameboard.possiblePlacements(carrier2.size, 0,0).right);
// playerTwo.gameboard.placeBoat(battleship2, playerTwo.gameboard.possiblePlacements(battleship2.size, 0,1).right);
// playerTwo.gameboard.placeBoat(cruiser2, playerTwo.gameboard.possiblePlacements(cruiser2.size, 0,2).right);
// playerTwo.gameboard.placeBoat(submarine2, playerTwo.gameboard.possiblePlacements(submarine2.size, 0,3).right);
// playerTwo.gameboard.placeBoat(destroyer2, playerTwo.gameboard.possiblePlacements(destroyer2.size, 0,4).right);



export const playersData = {
    playerOne,
    playerTwo,
};
