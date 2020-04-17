/**
 * This is the class for the sorting visualizer
 * A project that animates the mergesort algorithm, quicksort algorithm, bubblesort algorithm, and selectionsort algorithm 
 */

import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort';
import {getQuickSortAnimations} from '../SortingAlgorithms/QuickSort';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort';
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort';

/**
 * Setting our global variables, making them easily adjustable. 
 */
let NUMBER_OF_ARRAY_BARS = 130;
let MIN_INTEGER = 5;
let MAX_INTEGER = 500;
const PRIMARY_COLOR = 'white';
const SECONDARY_COLOR = 'red'; 
const ANIMATION_SPEED_MS = 2; 
const ANIMATION_SPEED_MS_BUBBLE_SELECTION = 0.5;

/**
 * Grabbing a random integer from interval to create a random array 
 * @param {*} min 
 * @param {*} max 
 */
function randomIntFromInterval(min, max) {
    return Math.random() * (max - min) + min;
   
}

/**
 * Sorting Visualizer class
 */
class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }
    /**
     * Reset the array
     */
    resetArray() {
        const array = []
        for (let i = 0;i < NUMBER_OF_ARRAY_BARS;i++) {
            array.push(randomIntFromInterval(MIN_INTEGER,MAX_INTEGER));
        }
        this.setState({array: array});
        this.restoreArray();
        this.restoreStoreButtons();
    }
    /**
     * change the color of the button and the state
     */
    restoreArray(){
        document.getElementById("resetArray").disabled = false;
        let buttonStyle = document.getElementById("resetArray").style;
        buttonStyle.background = "#000000";
    }
    /**
     * disable array button 
     */
    disableArray(){
        document.getElementById("resetArray").disabled = true;
        let buttonStyle = document.getElementById("resetArray").style;
        buttonStyle.background = "#788f7d";
    }
/**
 * disable sort buttons and change color
 */
    disableSortButtons() {
        document.getElementById("mergeSort").disabled = true;
        let buttonStyle = document.getElementById("mergeSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#788f7d";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#788f7d";

        document.getElementById("selectionSort").disabled = true;
        buttonStyle = document.getElementById("selectionSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#788f7d";

        document.getElementById("bubbleSort").disabled = true;
        buttonStyle = document.getElementById("bubbleSort").style;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#788f7d";
    }
    /**
     * restore the sort buttons and change color back
     */
    restoreStoreButtons() {
        document.getElementById("mergeSort").disabled = false;
        let buttonStyle = document.getElementById("mergeSort").style;
        buttonStyle.background = "#000000";
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        buttonStyle.background = "#000000";
        buttonStyle.cursor = "pointer";

        document.getElementById("bubbleSort").disabled = false;
        buttonStyle = document.getElementById("bubbleSort").style;
        buttonStyle.background = "#000000";
        buttonStyle.cursor = "pointer";

        document.getElementById("selectionSort").disabled = false;
        buttonStyle = document.getElementById("selectionSort").style;
        buttonStyle.background = "#000000";
        buttonStyle.cursor = "pointer";

    }
/**
 * Merge Sort algorithm animations
 */
    mergeSort() {
        this.disableSortButtons();
        this.disableArray();
        //get the animations from an array 
        const [animations] = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            //every 3 values there is a new animation 
            const isColorChange = (i % 3 !== 2);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                //change the color of the values that we are comparing
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
                
            }
            else {
                //after animations, move on to the next group 
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * ANIMATION_SPEED_MS);
            }
        }
        //this will restore the buttons after the animations are over
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
        setTimeout(() => this.restoreArray(), RESTORE_TIME); 
    }
    /**
    * Quick Sort algorithm animations
    */
    quickSort() {
        this.disableSortButtons();
        this.disableArray();
        const [animations] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length - 1; i++) {
            //set a new animation every 6 values 
            const isColorChange = (i % 6 === 0) || (i % 6 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (i % 6 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                if(barOneIndex === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    //change the color of the values that we are comparing 
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                //after the comparison is complete, move on to the next group
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        //this will restore the buttons after the animations are over
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
        setTimeout(() => this.restoreArray(), RESTORE_TIME); 
    }
    /**
    * Bubble Sort algorithm animations
    */
    bubbleSort() {
        this.disableSortButtons();
        this.disableArray();
        //get the animations from the array 
        const [animations] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            //every 4 values a new animations starts 
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS_BUBBLE_SELECTION);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS_BUBBLE_SELECTION);  
            }
        }
        //this will restore the buttons after the animations are over
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS_BUBBLE_SELECTION*animations.length);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
        setTimeout(() => this.restoreArray(), RESTORE_TIME); 
    }
   /**
    * Selection Sort algorithm animations
    */
    selectionSort() {
        this.disableSortButtons();
        this.disableArray();
        //get the animations from the array
        const [animations] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                //set the color of the initial bar and tha comparison bar
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS_BUBBLE_SELECTION);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS_BUBBLE_SELECTION);  
            }
        }
        //this will restore the buttons after the animations are over
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS_BUBBLE_SELECTION*animations.length);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
        setTimeout(() => this.restoreArray(), RESTORE_TIME); 

    }
    
    /**
     * Here is the code for displaying the graph container and buttons
     */
    render() {
        const styles = {
            white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          };

        const array = this.state.array;
        const SORT_BUTTONS = 4;
        return(
 <>
       
            <div className="array-container" style={{position: 'absolute', display: 'inline-block'}}>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            display: 'inline-block',
                            width: '.3vw',
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`
                        }} 
                    ></div>
                ))}
            </div>
            <div
            style={{
              backgroundColor: styles.black(0.05),
              minHeight: "100vh",
              position: "relative"
            }}
          >
            <div className="buttons" > 
                <button title="Generates a new random array" id = "resetArray" style={{position:'relative', top:`${(0)}px`}} onClick={() => this.resetArray()}>
                    Generate New Array
                </button>
                <button id = "mergeSort" style={{position:'relative',left: `${SORT_BUTTONS*3}px`,top:`${0}px`}} onClick={() => this.mergeSort()}>
                    Merge Sort
                </button>
                <button id = "quickSort" style={{position:'relative', left: `${SORT_BUTTONS*6}px`, top:`${0}px`}} onClick={() => this.quickSort()}>
                    Quick Sort
                </button>
                <button id = "bubbleSort" style={{position:'relative', left: `${SORT_BUTTONS*9}px`, top:`${0}px`}} onClick={() => this.bubbleSort()}>
                    Bubble Sort
                </button>
                <button id = "selectionSort" style={{position:'relative', left: `${SORT_BUTTONS*12}px`, top:`${0}px`}} onClick={() => this.selectionSort()}>
                    Selection Sort
                </button>
            </div>  
              </div>
            </>
        );
    }
}


export default SortingVisualizer;


