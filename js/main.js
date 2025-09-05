// Main application initialization

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the sorting visualizer
    const visualizer = new SortingVisualizer();
    
    // Handle window resize to keep visualization responsive
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            visualizer.handleResize();
        }, 250);
    });
    
    // Add keyboard shortcuts for better user experience
    document.addEventListener('keydown', function(event) {
        // Prevent default behavior when visualizer has focus
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'SELECT') {
            
            switch(event.code) {
                case 'Space':
                    event.preventDefault();
                    if (visualizer.isRunning && !visualizer.isPaused) {
                        visualizer.pauseSorting();
                    } else if (!visualizer.isRunning || visualizer.isPaused) {
                        visualizer.startSorting();
                    }
                    break;
                    
                case 'KeyR':
                    event.preventDefault();
                    visualizer.resetArray();
                    break;
                    
                case 'KeyG':
                    event.preventDefault();
                    visualizer.generateNewArray();
                    break;
                    
                case 'KeyS':
                    event.preventDefault();
                    if (visualizer.isPaused) {
                        visualizer.stepSorting();
                    }
                    break;
                    
                case 'Escape':
                    event.preventDefault();
                    if (visualizer.isRunning) {
                        visualizer.resetArray();
                    }
                    break;
            }
        }
    });
    
    // Add tooltips for better user guidance
    addTooltips();
    
    // Display keyboard shortcuts information
    displayKeyboardShortcuts();
    
    // Add performance monitoring
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark('app-initialization-complete');
    }
    
    console.log('Sorting Visualizer initialized successfully!');
    console.log('Keyboard shortcuts:');
    console.log('  Space: Play/Pause');
    console.log('  R: Reset');
    console.log('  G: Generate new array');
    console.log('  S: Step (when paused)');
    console.log('  Escape: Stop sorting');
});

function addTooltips() {
    const tooltips = {
        'algorithm-select': 'Choose which sorting algorithm to visualize',
        'array-size': 'Adjust the number of elements to sort (10-100)',
        'speed': 'Control the speed of the visualization (1=slowest, 10=fastest)',
        'data-type': 'Select the initial arrangement of data',
        'generate-btn': 'Generate a new random array',
        'play-btn': 'Start the sorting visualization',
        'pause-btn': 'Pause the current sorting process',
        'step-btn': 'Execute one step of the algorithm (when paused)',
        'reset-btn': 'Reset the array to its original state'
    };
    
    Object.entries(tooltips).forEach(([id, tooltip]) => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltip;
        }
    });
}

function displayKeyboardShortcuts() {
    // Create a small info panel for keyboard shortcuts
    const shortcutsInfo = document.createElement('div');
    shortcutsInfo.className = 'keyboard-shortcuts-info';
    shortcutsInfo.innerHTML = `
        <details>
            <summary>⌨️ Keyboard Shortcuts</summary>
            <div class="shortcuts-list">
                <div><kbd>Space</kbd> Play/Pause</div>
                <div><kbd>R</kbd> Reset Array</div>
                <div><kbd>G</kbd> Generate New Array</div>
                <div><kbd>S</kbd> Step (when paused)</div>
                <div><kbd>Esc</kbd> Stop Sorting</div>
            </div>
        </details>
    `;
    
    // Add styles for the shortcuts info
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-shortcuts-info {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            font-size: 14px;
            z-index: 1000;
        }
        
        .keyboard-shortcuts-info summary {
            cursor: pointer;
            font-weight: 600;
            color: #555;
            outline: none;
        }
        
        .keyboard-shortcuts-info summary:hover {
            color: #667eea;
        }
        
        .shortcuts-list {
            margin-top: 10px;
            display: grid;
            gap: 5px;
        }
        
        .shortcuts-list div {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .shortcuts-list kbd {
            background: #f1f3f4;
            border: 1px solid #dadce0;
            border-radius: 4px;
            padding: 2px 8px;
            font-family: inherit;
            font-size: 12px;
            font-weight: 600;
            color: #333;
            min-width: 20px;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .keyboard-shortcuts-info {
                bottom: 10px;
                right: 10px;
                padding: 10px;
                font-size: 12px;
            }
            
            .shortcuts-list kbd {
                padding: 1px 6px;
                font-size: 11px;
                min-width: 18px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(shortcutsInfo);
}

// Add error handling for the entire application
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    
    // Show user-friendly error message
    const errorContainer = document.getElementById('step-description');
    if (errorContainer) {
        errorContainer.innerHTML = `
            <p style="color: #e74c3c;">
                <strong>Error:</strong> Something went wrong. Please refresh the page or try a different algorithm.
            </p>
        `;
    }
});

// Add performance monitoring
window.addEventListener('load', function() {
    if (typeof performance !== 'undefined' && performance.getEntriesByType) {
        const loadTime = performance.getEntriesByType('navigation')[0];
        if (loadTime) {
            console.log(`Page loaded in ${Math.round(loadTime.loadEventEnd - loadTime.loadEventStart)}ms`);
        }
    }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addTooltips,
        displayKeyboardShortcuts
    };
}