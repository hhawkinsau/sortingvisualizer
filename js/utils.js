// Utility functions for the sorting visualizer

/**
 * Generates an array based on the specified pattern
 * @param {number} size - Size of the array
 * @param {string} pattern - Pattern type ('random', 'sorted', 'reverse', 'nearly', 'duplicates')
 * @returns {number[]} Generated array
 */
function generateArray(size, pattern = 'random') {
    let array = [];
    
    switch (pattern) {
        case 'random':
            for (let i = 0; i < size; i++) {
                array.push(Math.floor(Math.random() * size) + 1);
            }
            break;
            
        case 'sorted':
            for (let i = 1; i <= size; i++) {
                array.push(i);
            }
            break;
            
        case 'reverse':
            for (let i = size; i >= 1; i--) {
                array.push(i);
            }
            break;
            
        case 'nearly':
            // Create sorted array and make a few swaps
            for (let i = 1; i <= size; i++) {
                array.push(i);
            }
            const swaps = Math.floor(size * 0.1); // 10% of elements
            for (let i = 0; i < swaps; i++) {
                const idx1 = Math.floor(Math.random() * size);
                const idx2 = Math.floor(Math.random() * size);
                [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
            }
            break;
            
        case 'duplicates':
            const uniqueValues = Math.floor(size / 4); // Many duplicates
            for (let i = 0; i < size; i++) {
                array.push(Math.floor(Math.random() * uniqueValues) + 1);
            }
            break;
    }
    
    return array;
}

/**
 * Creates a delay for animation timing
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Calculates the delay based on speed setting
 * @param {number} speed - Speed setting (1-10)
 * @returns {number} Delay in milliseconds
 */
function getDelay(speed) {
    // Speed 1 = 500ms, Speed 10 = 10ms
    return Math.max(10, 510 - (speed * 50));
}

/**
 * Formats time elapsed in a readable format
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time string
 */
function formatTime(ms) {
    if (ms < 1000) {
        return `${ms}ms`;
    } else if (ms < 60000) {
        return `${(ms / 1000).toFixed(1)}s`;
    } else {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(1);
        return `${minutes}m ${seconds}s`;
    }
}

/**
 * Algorithm information database
 */
const ALGORITHM_INFO = {
    bubble: {
        name: 'Bubble Sort',
        timeComplexity: 'O(n²) avg/worst, O(n) best',
        spaceComplexity: 'O(1)',
        stable: 'Yes',
        inPlace: 'Yes',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n - 1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`
    },
    
    selection: {
        name: 'Selection Sort',
        timeComplexity: 'O(n²) all cases',
        spaceComplexity: 'O(1)',
        stable: 'No',
        inPlace: 'Yes',
        description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining elements.',
        pseudocode: `procedure selectionSort(A : array of sortable items)
    n := length(A)
    for i := 0 to n-2 do
        min := i
        for j := i+1 to n-1 do
            if A[j] < A[min] then
                min := j
            end if
        end for
        if min ≠ i then
            swap(A[i], A[min])
        end if
    end for
end procedure`
    },
    
    insertion: {
        name: 'Insertion Sort',
        timeComplexity: 'O(n²) avg/worst, O(n) best',
        spaceComplexity: 'O(1)',
        stable: 'Yes',
        inPlace: 'Yes',
        description: 'Builds the sorted array one element at a time by inserting each element into its correct position.',
        pseudocode: `procedure insertionSort(A : array of sortable items)
    for i := 1 to length(A)-1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j+1] := A[j]
            j := j - 1
        end while
        A[j+1] := key
    end for
end procedure`
    },
    
    merge: {
        name: 'Merge Sort',
        timeComplexity: 'O(n log n) all cases',
        spaceComplexity: 'O(n)',
        stable: 'Yes',
        inPlace: 'No',
        description: 'Divide-and-conquer algorithm that divides the array into halves, sorts them recursively, then merges the results.',
        pseudocode: `procedure mergeSort(A : array of sortable items)
    if length(A) <= 1 then
        return A
    end if
    
    mid := length(A) / 2
    left := mergeSort(A[0..mid-1])
    right := mergeSort(A[mid..length(A)-1])
    
    return merge(left, right)
end procedure

procedure merge(left, right)
    result := empty array
    while left is not empty and right is not empty do
        if left[0] <= right[0] then
            append left[0] to result
            remove left[0] from left
        else
            append right[0] to result
            remove right[0] from right
        end if
    end while
    append remaining elements of left to result
    append remaining elements of right to result
    return result
end procedure`
    },
    
    quick: {
        name: 'Quick Sort',
        timeComplexity: 'O(n log n) avg, O(n²) worst',
        spaceComplexity: 'O(log n) avg, O(n) worst',
        stable: 'No',
        inPlace: 'Yes',
        description: 'Selects a pivot element and partitions the array around it, then recursively sorts the partitions.',
        pseudocode: `procedure quickSort(A : array of sortable items, low, high)
    if low < high then
        pi := partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)
    end if
end procedure

procedure partition(A, low, high)
    pivot := A[high]
    i := low - 1
    for j := low to high - 1 do
        if A[j] <= pivot then
            i := i + 1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i + 1], A[high])
    return i + 1
end procedure`
    },
    
    heap: {
        name: 'Heap Sort',
        timeComplexity: 'O(n log n) all cases',
        spaceComplexity: 'O(1)',
        stable: 'No',
        inPlace: 'Yes',
        description: 'Uses a binary heap data structure to sort elements by repeatedly extracting the maximum.',
        pseudocode: `procedure heapSort(A : array of sortable items)
    buildMaxHeap(A)
    for i := length(A) - 1 downto 1 do
        swap(A[0], A[i])
        heapify(A, 0, i)
    end for
end procedure

procedure buildMaxHeap(A)
    for i := floor(length(A)/2) - 1 downto 0 do
        heapify(A, i, length(A))
    end for
end procedure

procedure heapify(A, i, heapSize)
    left := 2 * i + 1
    right := 2 * i + 2
    largest := i
    
    if left < heapSize and A[left] > A[largest] then
        largest := left
    end if
    if right < heapSize and A[right] > A[largest] then
        largest := right
    end if
    
    if largest ≠ i then
        swap(A[i], A[largest])
        heapify(A, largest, heapSize)
    end if
end procedure`
    }
};

/**
 * Gets algorithm information
 * @param {string} algorithmName - Name of the algorithm
 * @returns {object} Algorithm information object
 */
function getAlgorithmInfo(algorithmName) {
    return ALGORITHM_INFO[algorithmName] || {
        name: 'Unknown Algorithm',
        timeComplexity: 'Unknown',
        spaceComplexity: 'Unknown',
        stable: 'Unknown',
        inPlace: 'Unknown',
        description: 'No information available.',
        pseudocode: '// Implementation coming soon...'
    };
}

/**
 * Validates array bounds to prevent errors
 * @param {number[]} array - Array to validate
 * @param {number} index - Index to check
 * @returns {boolean} True if index is valid
 */
function isValidIndex(array, index) {
    return index >= 0 && index < array.length;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {any[]} array - Array to shuffle
 * @returns {any[]} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Checks if an array is sorted
 * @param {number[]} array - Array to check
 * @returns {boolean} True if sorted
 */
function isSorted(array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateArray,
        delay,
        getDelay,
        formatTime,
        getAlgorithmInfo,
        isValidIndex,
        shuffleArray,
        isSorted,
        ALGORITHM_INFO
    };
}