// Visualizer class for handling UI updates and animations

class SortingVisualizer {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.isRunning = false;
        this.isPaused = false;
        this.speed = 5;
        this.size = 50;
        this.dataType = 'random';
        this.algorithm = 'bubble';
        
        // Statistics
        this.comparisons = 0;
        this.swaps = 0;
        this.accesses = 0;
        this.startTime = 0;
        
        // DOM elements
        this.arrayContainer = document.getElementById('array-container');
        this.algorithmSelect = document.getElementById('algorithm-select');
        this.sizeSlider = document.getElementById('array-size');
        this.speedSlider = document.getElementById('speed');
        this.dataTypeSelect = document.getElementById('data-type');
        
        this.playBtn = document.getElementById('play-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stepBtn = document.getElementById('step-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.generateBtn = document.getElementById('generate-btn');
        
        // Info displays
        this.timeComplexitySpan = document.getElementById('time-complexity');
        this.spaceComplexitySpan = document.getElementById('space-complexity');
        this.stableSpan = document.getElementById('stable');
        this.inPlaceSpan = document.getElementById('in-place');
        
        this.comparisonsSpan = document.getElementById('comparisons');
        this.swapsSpan = document.getElementById('swaps');
        this.accessesSpan = document.getElementById('accesses');
        this.timeElapsedSpan = document.getElementById('time-elapsed');
        
        this.stepDescriptionDiv = document.getElementById('step-description');
        this.codeDisplay = document.getElementById('code-display');
        
        this.initializeEventListeners();
        this.generateNewArray();
        this.updateAlgorithmInfo();
    }

    initializeEventListeners() {
        // Control listeners
        this.algorithmSelect.addEventListener('change', () => {
            this.algorithm = this.algorithmSelect.value;
            this.updateAlgorithmInfo();
        });
        
        this.sizeSlider.addEventListener('input', () => {
            this.size = parseInt(this.sizeSlider.value);
            document.getElementById('size-value').textContent = this.size;
            if (!this.isRunning) {
                this.generateNewArray();
            }
        });
        
        this.speedSlider.addEventListener('input', () => {
            this.speed = parseInt(this.speedSlider.value);
            document.getElementById('speed-value').textContent = this.speed;
        });
        
        this.dataTypeSelect.addEventListener('change', () => {
            this.dataType = this.dataTypeSelect.value;
            if (!this.isRunning) {
                this.generateNewArray();
            }
        });
        
        // Button listeners
        this.generateBtn.addEventListener('click', () => this.generateNewArray());
        this.playBtn.addEventListener('click', () => this.startSorting());
        this.pauseBtn.addEventListener('click', () => this.pauseSorting());
        this.stepBtn.addEventListener('click', () => this.stepSorting());
        this.resetBtn.addEventListener('click', () => this.resetArray());
    }

    generateNewArray() {
        if (this.isRunning) return;
        
        this.array = generateArray(this.size, this.dataType);
        this.originalArray = [...this.array];
        this.resetStatistics();
        this.renderArray();
        this.updateStepDescription('Array generated. Click "Play" to start sorting.');
        this.clearHighlights();
    }

    renderArray() {
        this.arrayContainer.innerHTML = '';
        const maxValue = Math.max(...this.array);
        const containerHeight = this.arrayContainer.offsetHeight || 400;
        const elementWidth = Math.max(4, (this.arrayContainer.offsetWidth - (this.array.length * 2)) / this.array.length);
        
        this.array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.id = `element-${index}`;
            
            const height = (value / maxValue) * (containerHeight - 40);
            element.style.height = `${height}px`;
            element.style.width = `${elementWidth}px`;
            element.textContent = this.size <= 20 ? value : ''; // Show numbers only for small arrays
            
            this.arrayContainer.appendChild(element);
        });
    }

    async updateArray(newArray) {
        this.array = [...newArray];
        this.accesses++;
        this.accessesSpan.textContent = this.accesses;
        
        // Update the visual representation
        const maxValue = Math.max(...this.array);
        const containerHeight = this.arrayContainer.offsetHeight || 400;
        
        this.array.forEach((value, index) => {
            const element = document.getElementById(`element-${index}`);
            if (element) {
                const height = (value / maxValue) * (containerHeight - 40);
                element.style.height = `${height}px`;
                element.textContent = this.size <= 20 ? value : '';
            }
        });
    }

    async highlightComparison(indices) {
        this.clearHighlights();
        indices.forEach(index => {
            const element = document.getElementById(`element-${index}`);
            if (element) {
                element.classList.add('comparing');
            }
        });
        await delay(50); // Short delay for visual feedback
    }

    async highlightSwap(indices) {
        this.clearHighlights();
        indices.forEach(index => {
            const element = document.getElementById(`element-${index}`);
            if (element) {
                element.classList.add('swapping');
            }
        });
        await delay(100); // Slightly longer delay for swaps
    }

    async highlightPivot(indices) {
        indices.forEach(index => {
            const element = document.getElementById(`element-${index}`);
            if (element) {
                element.classList.add('pivot');
            }
        });
    }

    async markSorted(indices) {
        indices.forEach(index => {
            const element = document.getElementById(`element-${index}`);
            if (element) {
                element.classList.remove('comparing', 'swapping', 'pivot');
                element.classList.add('sorted');
            }
        });
    }

    clearHighlights() {
        const elements = this.arrayContainer.querySelectorAll('.array-element');
        elements.forEach(element => {
            element.classList.remove('comparing', 'swapping', 'pivot');
        });
    }

    async updateStepDescription(description) {
        this.stepDescriptionDiv.innerHTML = `<p>${description}</p>`;
    }

    updateAlgorithmInfo() {
        const info = getAlgorithmInfo(this.algorithm);
        this.timeComplexitySpan.textContent = info.timeComplexity;
        this.spaceComplexitySpan.textContent = info.spaceComplexity;
        this.stableSpan.textContent = info.stable;
        this.inPlaceSpan.textContent = info.inPlace;
        this.codeDisplay.textContent = info.pseudocode;
    }

    resetStatistics() {
        this.comparisons = 0;
        this.swaps = 0;
        this.accesses = 0;
        this.startTime = 0;
        
        this.comparisonsSpan.textContent = '0';
        this.swapsSpan.textContent = '0';
        this.accessesSpan.textContent = '0';
        this.timeElapsedSpan.textContent = '0ms';
    }

    incrementComparisons() {
        this.comparisons++;
        this.comparisonsSpan.textContent = this.comparisons;
        this.updateElapsedTime();
    }

    incrementSwaps() {
        this.swaps++;
        this.swapsSpan.textContent = this.swaps;
        this.updateElapsedTime();
    }

    updateElapsedTime() {
        if (this.startTime > 0) {
            const elapsed = Date.now() - this.startTime;
            this.timeElapsedSpan.textContent = formatTime(elapsed);
        }
    }

    async startSorting() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = Date.now();
        
        // Update button states
        this.playBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.stepBtn.disabled = true;
        this.generateBtn.disabled = true;
        this.resetBtn.disabled = false;
        
        // Disable controls during sorting
        this.algorithmSelect.disabled = true;
        this.sizeSlider.disabled = true;
        this.dataTypeSelect.disabled = true;
        
        try {
            const algorithms = new SortingAlgorithms(this);
            const methodName = this.algorithm + 'Sort';
            
            if (typeof algorithms[methodName] === 'function') {
                await algorithms[methodName]([...this.array]);
                
                if (!algorithms.stopped) {
                    // Mark all elements as sorted if algorithm completed
                    const allIndices = Array.from({length: this.array.length}, (_, i) => i);
                    await this.markSorted(allIndices);
                    await this.updateStepDescription(
                        `${getAlgorithmInfo(this.algorithm).name} completed! Array is now sorted.`
                    );
                }
            } else {
                throw new Error(`Algorithm ${this.algorithm} not implemented`);
            }
        } catch (error) {
            console.error('Sorting error:', error);
            await this.updateStepDescription(`Error: ${error.message}`);
        }
        
        this.finishSorting();
    }

    pauseSorting() {
        this.isPaused = true;
        
        // Update button states
        this.playBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.stepBtn.disabled = false;
        
        this.updateStepDescription('Sorting paused. Click "Play" to continue or "Step" to proceed one step at a time.');
    }

    async stepSorting() {
        // This would require a more complex implementation to truly step through algorithms
        // For now, we'll just provide a message
        await this.updateStepDescription('Step-by-step mode: This feature requires algorithm modification to support granular stepping.');
    }

    resetArray() {
        // Stop any running sorting
        if (this.algorithms) {
            this.algorithms.stop();
        }
        
        this.array = [...this.originalArray];
        this.renderArray();
        this.clearHighlights();
        this.resetStatistics();
        this.finishSorting();
        this.updateStepDescription('Array reset to original state.');
    }

    finishSorting() {
        this.isRunning = false;
        this.isPaused = false;
        
        // Update button states
        this.playBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.stepBtn.disabled = false;
        this.generateBtn.disabled = false;
        this.resetBtn.disabled = false;
        
        // Re-enable controls
        this.algorithmSelect.disabled = false;
        this.sizeSlider.disabled = false;
        this.dataTypeSelect.disabled = false;
        
        this.updateElapsedTime();
    }

    // Method to handle window resize
    handleResize() {
        if (!this.isRunning) {
            this.renderArray();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortingVisualizer;
}