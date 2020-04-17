/**
 * Here is the quicksort algorithm
 * @param {*} array 
 */
export function getQuickSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    array = auxillaryArray;
    return [animations, array];
}
/**
 * Quick sort uses the first index in the array as a pivot, and moves all values smaller than it to the left
 * and all values larger to the right. It is a fast algorithm used in practice. 
 * @param {*} auxillaryArray 
 * @param {*} startIndex 
 * @param {*} endIndex 
 * @param {*} animations 
 */
function quickSort(auxillaryArray, startIndex, endIndex, animations) {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(auxillaryArray, startIndex, endIndex, animations);
        quickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
        quickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
    }
}

function partitionArray(auxillaryArray, startIndex, endIndex, animations) {
    let pivot = auxillaryArray[endIndex];
    let pivotIndex = startIndex;
    for (let i = startIndex; i <= endIndex - 1; i++) {
        animations.push([i, endIndex]);
        animations.push([i, endIndex]);
        if (auxillaryArray[i] <= pivot) {
            animations.push([i, auxillaryArray[pivotIndex]]);
            animations.push([pivotIndex, auxillaryArray[i]]);
            swapValues(auxillaryArray, i , pivotIndex);
            pivotIndex++;
        }
        else {
            animations.push([-1, -1]);
            animations.push([-1, -1]);
        }
        animations.push([-1, -1]);
        animations.push([-1, -1]);
    }
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([pivotIndex, auxillaryArray[endIndex]]);
    animations.push([endIndex, auxillaryArray[pivotIndex]]);
    swapValues(auxillaryArray, pivotIndex, endIndex);
    return pivotIndex;
}

function swapValues(auxillaryArray, firstIndex, secondIndex) {
    let temporary = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temporary;
}

