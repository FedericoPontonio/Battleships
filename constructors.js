import { prefetch } from "webpack";

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
    for (let i = 0; i<10; i++) {
        let ordinatesArray =[];
        for (let j=0; j<10; j++) {
            ordinatesArray.push({boatInPlace:null, hasBeenTargeted:false})
        }
        board.push(ordinatesArray)
    };
    function placeBoat(ship, x, y) {    //the method store a reference of the ship object in the appropriate space-id does not instantiate the ship itself!
        this.board[x][y].boatInPlace = ship
    };
    function possiblePlacements (boatSize, x, y) {
        const preFilteredArray = [
            [[x-(boatSize-1),y],[x,y]],
            [[x,y],[x+(boatSize-1),y]], 
            [[x,y-(boatSize-1)], [x,y]],
            [[x,y], [x,y+(boatSize-1)]]
        ];//remember to manage the case of size 1 ship
        let postFilteredArray = [];
        if (preFilteredArray[0][0][0]<10 && preFilteredArray[0][0][0]>=0) {
            let tempArrayCaseZero = [];
            for (let i = x-(boatSize-1); i<=x;i++) {
                tempArrayCaseZero.push([i,y])
            };
            postFilteredArray.push(tempArrayCaseZero)
        }
        if(preFilteredArray[1][1][0]<10 &&preFilteredArray[1][1][0]>=0) {
            let tempArrayCaseOne = [];
            for (let i=x;i<=x+(boatSize-1);i++) {
                tempArrayCaseOne.push([i,y])
            }
            postFilteredArray.push(tempArrayCaseOne)
        }
        if(preFilteredArray[2][0][1]<10 &&preFilteredArray[2][0][1]>=0) {
            let tempArrayCaseTwo =[];
            for (let i=y-(boatSize-1);i<=y;i++) {
                tempArrayCaseTwo.push([x,i])
            }
            postFilteredArray.push(tempArrayCaseTwo)
        }
        if(preFilteredArray[3][1][1]<10 &&preFilteredArray[3][1][1]>=0) {
            let tempArrayCasethree=[];
            for (let i=y;i<=y+(boatSize-1);i++) {
                tempArrayCasethree.push([x,i])
            }
            postFilteredArray.push(tempArrayCasethree)
        }
        return postFilteredArray
    };
    return {board, placeBoat, possiblePlacements}
};

