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
    function possiblePlacements (boatSize, x, y) {//tutto da rivedere
        const preFilteredArray = [x-boatSize,x+boatSize,y-boatSize,y+boatSize];
        let possiblePlacements=[];
        for (let i=0; i<4; i++) {
            if(preFilteredArray[i]>=0 && preFilteredArray[i]<10) {
                if (i<2) {
                    possiblePlacements.push([preFilteredArray[i], y])
                }
                else {
                    possiblePlacements.push([x, preFilteredArray[i]])
                }
            }
        }
        return possiblePlacements
    };
    return {board, placeBoat, possiblePlacements}
};

