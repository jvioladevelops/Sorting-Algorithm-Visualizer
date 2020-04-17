/**
 * Here is the code for the merge sort algorithm
 * @param {*} array 
 */

export function getMergeSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    mergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    array = auxillaryArray;
    return [animations, array];
}
/**
 * A divide an conquer technique to sorting. Merge sort divides the main array into subarrays and sorts each subsequent 
 * sub array.
 * @param {*} auxillaryArray 
 * @param {*} startIndex 
 * @param {*} endIndex 
 * @param {*} animations 
 */
function mergeSort(auxillaryArray, startIndex, endIndex, animations) {
    if(startIndex === endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex)/2);
    mergeSort(auxillaryArray, startIndex, middleIndex, animations);
    mergeSort(auxillaryArray, middleIndex + 1, endIndex, animations);
    merge(auxillaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortArray = [];
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex) {
        animations.push([i, j]);
        animations.push([i, j]);
        if(auxillaryArray[i] <= auxillaryArray[j]) {
            animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
            sortArray.push(auxillaryArray[i++]);
        }
        else {
            animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
            sortArray.push(auxillaryArray[j++]);
        }
    }
    while(i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
        sortArray.push(auxillaryArray[i++]);
    }
    while(j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
        sortArray.push(auxillaryArray[j++]);
    }
    for (let i = startIndex; i <= endIndex; i++) {
        auxillaryArray[i] = sortArray[i - startIndex];
    }
}

