/**
 * Here is the code for the selection sort algorithm 
 */
export function getSelectionSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    selectionSort(auxillaryArray, animations);
    array = auxillaryArray;
    return [animations, array];
}
/**
 * selection sort moves sorted values onto the left side of the array, until the entire array has been sorted. 
 * @param {*} auxillaryArray 
 * @param {*} animations 
 */
function selectionSort(auxillaryArray, animations) {
    const auxArray = auxillaryArray.length;
    for (let i = 0; i < auxArray - 1; i++) {
        let minIndex = i; 
        for (let j = i + 1; j < auxArray; j++) {
            animations.push(["comparision1", j, minIndex]);
            animations.push(["comparision2", j, minIndex]);
            if (auxillaryArray[j] < auxillaryArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push(["swap", minIndex, auxillaryArray[i]]);
        animations.push(["swap", i, auxillaryArray[minIndex]]);
        swapValues(auxillaryArray, minIndex, i);
    }
}

function swapValues(auxillaryArray, firstIndex, secondIndex) {
    let temporary = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temporary;
}

