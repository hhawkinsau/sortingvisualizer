// Sorting algorithms with visualization hooks

class SortingAlgorithms {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.stopped = false;
    }

    stop() {
        this.stopped = true;
    }

    async bubbleSort(array) {
        this.stopped = false;
        const n = array.length;
        
        for (let i = 0; i < n - 1 && !this.stopped; i++) {
            let swapped = false;
            
            for (let j = 0; j < n - i - 1 && !this.stopped; j++) {
                // Highlight elements being compared
                await this.visualizer.highlightComparison([j, j + 1]);
                await this.visualizer.updateStepDescription(
                    `Comparing elements at positions ${j} and ${j + 1}: ${array[j]} and ${array[j + 1]}`
                );
                
                this.visualizer.incrementComparisons();
                
                if (array[j] > array[j + 1]) {
                    // Swap elements
                    await this.visualizer.highlightSwap([j, j + 1]);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.visualizer.incrementSwaps();
                    swapped = true;
                    
                    await this.visualizer.updateStepDescription(
                        `Swapped ${array[j + 1]} and ${array[j]} because ${array[j + 1]} > ${array[j]}`
                    );
                }
                
                await this.visualizer.updateArray(array);
                await delay(getDelay(this.visualizer.speed));
            }
            
            // Mark the last element as sorted
            await this.visualizer.markSorted([n - i - 1]);
            
            if (!swapped) {
                // If no swaps occurred, array is sorted
                break;
            }
        }
        
        // Mark remaining elements as sorted
        for (let i = 0; i < n - 1; i++) {
            await this.visualizer.markSorted([i]);
        }
        
        return array;
    }

    async selectionSort(array) {
        this.stopped = false;
        const n = array.length;
        
        for (let i = 0; i < n - 1 && !this.stopped; i++) {
            let minIndex = i;
            
            await this.visualizer.updateStepDescription(
                `Finding minimum element in unsorted portion starting at position ${i}`
            );
            
            for (let j = i + 1; j < n && !this.stopped; j++) {
                await this.visualizer.highlightComparison([minIndex, j]);
                this.visualizer.incrementComparisons();
                
                await this.visualizer.updateStepDescription(
                    `Comparing ${array[minIndex]} at position ${minIndex} with ${array[j]} at position ${j}`
                );
                
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                    await this.visualizer.updateStepDescription(
                        `Found new minimum: ${array[j]} at position ${j}`
                    );
                }
                
                await delay(getDelay(this.visualizer.speed));
            }
            
            if (minIndex !== i) {
                await this.visualizer.highlightSwap([i, minIndex]);
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                this.visualizer.incrementSwaps();
                
                await this.visualizer.updateStepDescription(
                    `Swapped minimum element ${array[i]} to position ${i}`
                );
            }
            
            await this.visualizer.markSorted([i]);
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
        }
        
        await this.visualizer.markSorted([n - 1]);
        return array;
    }

    async insertionSort(array) {
        this.stopped = false;
        const n = array.length;
        
        await this.visualizer.markSorted([0]); // First element is trivially sorted
        
        for (let i = 1; i < n && !this.stopped; i++) {
            const key = array[i];
            let j = i - 1;
            
            await this.visualizer.updateStepDescription(
                `Inserting element ${key} from position ${i} into sorted portion`
            );
            
            await this.visualizer.highlightComparison([i]);
            
            while (j >= 0 && array[j] > key && !this.stopped) {
                await this.visualizer.highlightComparison([j, j + 1]);
                this.visualizer.incrementComparisons();
                
                await this.visualizer.updateStepDescription(
                    `Moving ${array[j]} from position ${j} to position ${j + 1}`
                );
                
                array[j + 1] = array[j];
                this.visualizer.incrementSwaps();
                j--;
                
                await this.visualizer.updateArray(array);
                await delay(getDelay(this.visualizer.speed));
            }
            
            array[j + 1] = key;
            await this.visualizer.markSorted([j + 1]);
            
            await this.visualizer.updateStepDescription(
                `Placed ${key} at position ${j + 1}`
            );
            
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
        }
        
        return array;
    }

    async mergeSort(array, left = 0, right = array.length - 1) {
        if (this.stopped) return array;
        
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await this.visualizer.updateStepDescription(
                `Dividing array from position ${left} to ${right} at midpoint ${mid}`
            );
            
            // Highlight the current subarray being processed
            const subarrayIndices = [];
            for (let i = left; i <= right; i++) {
                subarrayIndices.push(i);
            }
            await this.visualizer.highlightComparison(subarrayIndices);
            await delay(getDelay(this.visualizer.speed));
            
            await this.mergeSort(array, left, mid);
            await this.mergeSort(array, mid + 1, right);
            await this.merge(array, left, mid, right);
        }
        
        return array;
    }

    async merge(array, left, mid, right) {
        if (this.stopped) return;
        
        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);
        
        await this.visualizer.updateStepDescription(
            `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`
        );
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length && !this.stopped) {
            await this.visualizer.highlightComparison([left + i, mid + 1 + j]);
            this.visualizer.incrementComparisons();
            
            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                i++;
                await this.visualizer.updateStepDescription(
                    `Taking ${leftArray[i - 1]} from left subarray`
                );
            } else {
                array[k] = rightArray[j];
                j++;
                await this.visualizer.updateStepDescription(
                    `Taking ${rightArray[j - 1]} from right subarray`
                );
            }
            
            k++;
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
        }
        
        while (i < leftArray.length && !this.stopped) {
            array[k] = leftArray[i];
            i++;
            k++;
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
        }
        
        while (j < rightArray.length && !this.stopped) {
            array[k] = rightArray[j];
            j++;
            k++;
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
        }
        
        // Mark merged portion as temporarily sorted
        const mergedIndices = [];
        for (let idx = left; idx <= right; idx++) {
            mergedIndices.push(idx);
        }
        await this.visualizer.highlightComparison(mergedIndices);
        await delay(getDelay(this.visualizer.speed));
    }

    async quickSort(array, low = 0, high = array.length - 1) {
        if (this.stopped) return array;
        
        if (low < high) {
            await this.visualizer.updateStepDescription(
                `Partitioning array from position ${low} to ${high}`
            );
            
            const pi = await this.partition(array, low, high);
            
            await this.quickSort(array, low, pi - 1);
            await this.quickSort(array, pi + 1, high);
        }
        
        return array;
    }

    async partition(array, low, high) {
        if (this.stopped) return low;
        
        const pivot = array[high];
        await this.visualizer.highlightPivot([high]);
        
        await this.visualizer.updateStepDescription(
            `Selected pivot: ${pivot} at position ${high}`
        );
        
        let i = low - 1;
        
        for (let j = low; j < high && !this.stopped; j++) {
            await this.visualizer.highlightComparison([j, high]);
            this.visualizer.incrementComparisons();
            
            await this.visualizer.updateStepDescription(
                `Comparing ${array[j]} with pivot ${pivot}`
            );
            
            if (array[j] <= pivot) {
                i++;
                
                if (i !== j) {
                    await this.visualizer.highlightSwap([i, j]);
                    [array[i], array[j]] = [array[j], array[i]];
                    this.visualizer.incrementSwaps();
                    
                    await this.visualizer.updateStepDescription(
                        `Swapped ${array[j]} and ${array[i]} - element <= pivot`
                    );
                }
            }
            
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
        }
        
        // Place pivot in correct position
        if (i + 1 !== high) {
            await this.visualizer.highlightSwap([i + 1, high]);
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            this.visualizer.incrementSwaps();
        }
        
        await this.visualizer.markSorted([i + 1]);
        await this.visualizer.updateArray(array);
        await delay(getDelay(this.visualizer.speed));
        
        return i + 1;
    }

    async heapSort(array) {
        this.stopped = false;
        const n = array.length;
        
        await this.visualizer.updateStepDescription('Building max heap...');
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0 && !this.stopped; i--) {
            await this.heapify(array, n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0 && !this.stopped; i--) {
            await this.visualizer.highlightSwap([0, i]);
            [array[0], array[i]] = [array[i], array[0]];
            this.visualizer.incrementSwaps();
            
            await this.visualizer.markSorted([i]);
            await this.visualizer.updateStepDescription(
                `Moved max element ${array[i]} to position ${i}`
            );
            
            await this.visualizer.updateArray(array);
            await this.heapify(array, i, 0);
        }
        
        await this.visualizer.markSorted([0]);
        return array;
    }

    async heapify(array, heapSize, rootIndex) {
        if (this.stopped) return;
        
        let largest = rootIndex;
        const left = 2 * rootIndex + 1;
        const right = 2 * rootIndex + 2;
        
        if (left < heapSize) {
            await this.visualizer.highlightComparison([largest, left]);
            this.visualizer.incrementComparisons();
            
            if (array[left] > array[largest]) {
                largest = left;
            }
        }
        
        if (right < heapSize) {
            await this.visualizer.highlightComparison([largest, right]);
            this.visualizer.incrementComparisons();
            
            if (array[right] > array[largest]) {
                largest = right;
            }
        }
        
        if (largest !== rootIndex) {
            await this.visualizer.highlightSwap([rootIndex, largest]);
            [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
            this.visualizer.incrementSwaps();
            
            await this.visualizer.updateStepDescription(
                `Heapifying: swapped ${array[largest]} and ${array[rootIndex]}`
            );
            
            await this.visualizer.updateArray(array);
            await delay(getDelay(this.visualizer.speed));
            
            await this.heapify(array, heapSize, largest);
        }
    }

    // Placeholder implementations for advanced algorithms
    async shellSort(array) {
        this.stopped = false;
        await this.visualizer.updateStepDescription('Shell Sort implementation coming soon...');
        return await this.insertionSort(array); // Fallback to insertion sort for now
    }

    async timSort(array) {
        this.stopped = false;
        await this.visualizer.updateStepDescription('Tim Sort implementation coming soon...');
        return await this.mergeSort(array); // Fallback to merge sort for now
    }

    async introSort(array) {
        this.stopped = false;
        await this.visualizer.updateStepDescription('Intro Sort implementation coming soon...');
        return await this.quickSort(array); // Fallback to quick sort for now
    }

    async countingSort(array) {
        this.stopped = false;
        await this.visualizer.updateStepDescription('Counting Sort implementation coming soon...');
        return await this.insertionSort(array); // Fallback for now
    }

    async radixSort(array) {
        this.stopped = false;
        await this.visualizer.updateStepDescription('Radix Sort implementation coming soon...');
        return await this.insertionSort(array); // Fallback for now
    }

    async bucketSort(array) {
        this.stopped = false;
        await this.visualizer.updateStepDescription('Bucket Sort implementation coming soon...');
        return await this.insertionSort(array); // Fallback for now
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortingAlgorithms;
}