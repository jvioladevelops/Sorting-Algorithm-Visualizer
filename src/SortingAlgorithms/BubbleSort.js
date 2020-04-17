/**
 * Here is the alogorithm for bubble sort
 * 
 */

export function getBubbleSortAnimations(array) {
    //create an array of animations that is called in 'SortingVisualizer.js'
    let animations  = [];
    //use an aux array to set new values 
    let auxillaryArray = array.slice();
    bubbleSort(auxillaryArray, animations);
    array = auxillaryArray;
    return [animations, array];
}
//iterate through the array comparing each value as you go, if initial value is > compare value, then swapValues
function bubbleSort(auxillaryArray, animations) {
    const auxArray = auxillaryArray.length;
    for (let i = 0; i < auxArray - 1; i++) {
        for (let j = 0; j < auxArray - i -1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            if (auxillaryArray[j] > auxillaryArray[j + 1]) {
                animations.push([j, auxillaryArray[j + 1]]);
                animations.push([j + 1, auxillaryArray[j]]);
                swapValues(auxillaryArray, j, j + 1);
            }
            else {
                animations.push([-1, -1]);
                animations.push([-1, -1]);
            }
        }
    }
}

/**
 * Swap values function 
 * @param {*} auxillaryArray 
 * @param {*} firstIndex 
 * @param {*} secondIndex 
 */
function swapValues(auxillaryArray, firstIndex, secondIndex) {
    let temporary = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temporary;
}

