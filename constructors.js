import { tempAssets } from "./assets.js";
import { renderGameOver } from "./rendering.js";
const playerOne = tempAssets.playerOne;
const playerTwo = tempAssets.playerTwo;

export function Ship (size, name) {
    let hp=size;
    let isSunk=false;
    function hit () {
        if (this.isSunk) 
            throw new Error('This ship has already sunk!')
        else {
            this.hp = this.hp-1;
            if (this.hp == 0) this.isSunk = true
        }
    };
    return {name, size, hp, isSunk, hit}
};
export function Gameboard() {
    let board = [];
    let boatsSunkCounter = 0;
    for (let i = 0; i<10; i++) {
        let ordinatesArray =[];
        for (let j=0; j<10; j++) {
            ordinatesArray.push({boatInPlace:null, hasBeenTargeted:false})
        }
        board.push(ordinatesArray)
    };

    function placeBoat(ship, coordinates) {    //the method store a reference of the ship object in the appropriate space-id does not instantiate the ship itself!
        if (coordinates == null) {
            throw new Error("The vessel can't overflow the game boardy")
        }
        for (let i = 0;i < coordinates.length; i++) {
            if (this.board[coordinates[i][0]][coordinates[i][1]].boatInPlace != null) {
                throw new Error('A boat is already in this place');
            }
            else {
                this.board[coordinates[i][0]][coordinates[i][1]].boatInPlace = ship
            }
        }
    };

    function receiveAttack(x, y) {
        if(this.board[x][y].hasBeenTargeted == true) {
            return 'This location has already been fired!'
        }
        if(this.board[x][y].boatInPlace == null) {
            this.board[x][y].hasBeenTargeted = true;
            return 'No ship has been hit.'
        }
        else {
            this.board[x][y].boatInPlace.hit();
            this.board[x][y].hasBeenTargeted = true;
            if (this.board[x][y].boatInPlace.isSunk) {
                this.boatsSunkCounter = this.boatsSunkCounter + 1;
            }
            if(this.boatsSunkCounter==5) {
                return ((playerOne, playerTwo)=> {
                    let winner;
                    if (playerOne.gameboard.boatsSunkCounter==5) {
                        winner = playerTwo.name
                    }
                    else {
                        winner = playerOne.name
                    }
                    return renderGameOver('All boats have been sunk! '+ winner + ' won!')
                })(playerOne, playerTwo);
            }
            return ''+this.board[x][y].boatInPlace.name+' has been hit!'
        }
    };

    function possiblePlacements (boatSize, x, y) {
    //remember to manage the case of size 1 ship
        let postFilteredArray = [];
        let objPlacements = {};
        if (x-(boatSize-1)>=0) {
            let tempArrayCaseZero = [];
            for (let i = x-(boatSize-1); i<=x;i++) {
                tempArrayCaseZero.push([i,y])
            };
            postFilteredArray.push(tempArrayCaseZero);//eventually to remove
            objPlacements.letf = tempArrayCaseZero;
        }
        else {
            objPlacements.letf = null;
        }
        if(x+(boatSize-1)<10) {
            let tempArrayCaseOne = [];
            for (let i=x;i<=x+(boatSize-1);i++) {
                tempArrayCaseOne.push([i,y])
            }
            postFilteredArray.push(tempArrayCaseOne);
            objPlacements.right = tempArrayCaseOne;
        }
        else {
            objPlacements.right = null;
        }
        if(y-(boatSize-1)>=0) {
            let tempArrayCaseTwo =[];
            for (let i=y-(boatSize-1);i<=y;i++) {
                tempArrayCaseTwo.push([x,i])
            }
            postFilteredArray.push(tempArrayCaseTwo);
            objPlacements.up = tempArrayCaseTwo;
        }
        else {
            objPlacements.up = null;
        }
        if(y+(boatSize-1)<10) {
            let tempArrayCasethree=[];
            for (let i=y;i<=y+(boatSize-1);i++) {
                tempArrayCasethree.push([x,i])
            }
            postFilteredArray.push(tempArrayCasethree);
            objPlacements.down = tempArrayCasethree;
        }
        else {
            objPlacements.down = null;
        }
        return objPlacements
    };
    return {board, boatsSunkCounter, placeBoat, possiblePlacements, receiveAttack}
};

export function Player(name = null) {
    let gameboard = Gameboard();
    return {gameboard, name, isPlayerTurn:false}
};