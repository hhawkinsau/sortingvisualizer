# Interactive Sorting Algorithm Visualizer

An interactive, step-by-step visualization tool for sorting algorithms with comprehensive educational features. This project transforms sorting algorithm theory into an engaging visual learning experience.

## 🚀 Live Demo

Open `index.html` in your browser or run a local server to see the algorithms in action!

## ✨ Features

### 🎯 Interactive Visualization
- **Step-by-step animations** showing exactly how each algorithm works
- **Color-coded operations**: comparisons (red), swaps (yellow), sorted elements (green), pivots (purple)
- **Real-time statistics**: comparisons, swaps, array accesses, and time elapsed
- **Responsive design** that works on desktop and mobile devices

### 🧠 Educational Content
- **12 sorting algorithms** with detailed implementations
- **Algorithm complexity information** displayed in real-time
- **Pseudocode display** for each algorithm
- **Multiple data patterns** to explore algorithm behavior

### 🎮 Interactive Controls
- **Speed control** (1-10 scale) to adjust animation speed
- **Array size control** (10-100 elements) 
- **Data pattern selection**: random, sorted, reverse, nearly sorted, duplicates
- **Keyboard shortcuts** for power users
- **Play/Pause/Step/Reset** controls for precise learning

## 🚀 Quick Start

### Option 1: Simple Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hhawkinsau/sortingvisualizer.git
   cd sortingvisualizer
   ```

2. Open `index.html` in your web browser

### Option 2: Local Server
1. Install dependencies (optional, for testing):
   ```bash
   npm install
   ```

2. Start local server:
   ```bash
   npm start
   ```

3. Open http://localhost:8000 in your browser

## 🎮 How to Use

1. **Select an Algorithm**: Choose from 12 different sorting algorithms
2. **Adjust Settings**: Set array size (10-100) and speed (1-10)
3. **Choose Data Pattern**: Random, sorted, reverse, nearly sorted, or duplicates
4. **Start Visualization**: Click "Play" to watch the algorithm in action
5. **Learn**: Follow the step-by-step explanations and statistics

### Keyboard Shortcuts
- **Space**: Play/Pause
- **R**: Reset Array
- **G**: Generate New Array
- **S**: Step (when paused)
- **Esc**: Stop Sorting

## 🧮 Implemented Algorithms

### Basic Comparison-Based
- Bubble Sort
- Selection Sort  
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

### Advanced (Coming Soon)
- Shell Sort
- Tim Sort
- Intro Sort
- Counting Sort
- Radix Sort
- Bucket Sort

## 🧪 Testing

Run the test suite to verify functionality:

```bash
# Install Playwright (first time only)
npm run install-browsers

# Run tests
npm test

# Run tests with browser UI
npm run test:headed
```

## 🎨 Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and glassmorphism effects
- **JavaScript ES6+**: Modular architecture with classes
- **Playwright**: End-to-end testing

## 📚 Educational Value

This visualizer helps students and developers:
- **Understand** how different algorithms work step-by-step
- **Compare** algorithm efficiency in real-time
- **Experiment** with different data patterns
- **Learn** through interactive exploration rather than static text

---

# Comprehensive Guide to Sorting Algorithms

Below is the complete reference for sorting algorithms across different domains and use cases, from basic array sorting to database operations and specialized applications.

## Table of Contents

1. [Introduction](#introduction)
2. [Basic Comparison-Based Sorting Algorithms](#basic-comparison-based-sorting-algorithms)
3. [Advanced Comparison-Based Algorithms](#advanced-comparison-based-algorithms)
4. [Non-Comparison Based Algorithms](#non-comparison-based-algorithms)
5. [Database Sorting Algorithms](#database-sorting-algorithms)
6. [Specialized and Domain-Specific Sorting](#specialized-and-domain-specific-sorting)
7. [Parallel and Concurrent Sorting](#parallel-and-concurrent-sorting)
8. [Hybrid and Modern Algorithms](#hybrid-and-modern-algorithms)
9. [Algorithm Comparison Matrix](#algorithm-comparison-matrix)
10. [Choosing the Right Algorithm](#choosing-the-right-algorithm)

## Introduction

Sorting is one of the most fundamental operations in computer science, with applications spanning from simple data organization to complex database operations. This guide provides a comprehensive overview of sorting algorithms across different domains, their complexities, and practical use cases.

### Key Concepts

- **Time Complexity**: How the algorithm's runtime scales with input size
- **Space Complexity**: Additional memory required by the algorithm
- **Stability**: Whether equal elements maintain their relative order
- **In-place**: Whether the algorithm requires only O(1) extra memory
- **Adaptive**: Whether the algorithm performs better on partially sorted data

## Basic Comparison-Based Sorting Algorithms

### 1. Bubble Sort
**Time Complexity**: O(n²) average and worst, O(n) best  
**Space Complexity**: O(1)  
**Stable**: Yes | **In-place**: Yes | **Adaptive**: Yes

Simple algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.

**Use Cases**:
- Educational purposes
- Very small datasets (< 10 elements)
- When simplicity is more important than efficiency

**Pros**: Simple to understand and implement  
**Cons**: Extremely inefficient for large datasets

### 2. Selection Sort
**Time Complexity**: O(n²) all cases  
**Space Complexity**: O(1)  
**Stable**: No | **In-place**: Yes | **Adaptive**: No

Finds the minimum element and places it at the beginning, then repeats for the remaining elements.

**Use Cases**:
- When memory writes are expensive
- Small datasets where simplicity matters
- When you need predictable performance

**Pros**: Minimal memory writes, simple implementation  
**Cons**: Always O(n²), not stable

### 3. Insertion Sort
**Time Complexity**: O(n²) average and worst, O(n) best  
**Space Complexity**: O(1)  
**Stable**: Yes | **In-place**: Yes | **Adaptive**: Yes

Builds the sorted array one element at a time by inserting each element into its correct position.

**Use Cases**:
- Small datasets (< 50 elements)
- Nearly sorted data
- Online algorithms (sorting data as it arrives)
- As a subroutine in hybrid algorithms

**Pros**: Efficient for small/nearly sorted data, stable, online  
**Cons**: O(n²) for large random datasets

### 4. Merge Sort
**Time Complexity**: O(n log n) all cases  
**Space Complexity**: O(n)  
**Stable**: Yes | **In-place**: No | **Adaptive**: No

Divide-and-conquer algorithm that divides the array into halves, sorts them recursively, then merges the results.

**Use Cases**:
- When stability is required
- Large datasets where guaranteed O(n log n) is needed
- External sorting (when data doesn't fit in memory)
- Linked lists

**Pros**: Guaranteed O(n log n), stable, predictable  
**Cons**: Requires O(n) extra space

### 5. Quick Sort
**Time Complexity**: O(n log n) average, O(n²) worst, O(n log n) best  
**Space Complexity**: O(log n) average, O(n) worst  
**Stable**: No | **In-place**: Yes | **Adaptive**: No

Selects a pivot element and partitions the array around it, then recursively sorts the partitions.

**Use Cases**:
- General-purpose sorting
- When average-case performance matters more than worst-case
- In-place sorting requirements
- Cache-efficient sorting

**Pros**: Fast average case, in-place, cache-friendly  
**Cons**: O(n²) worst case, not stable

### 6. Heap Sort
**Time Complexity**: O(n log n) all cases  
**Space Complexity**: O(1)  
**Stable**: No | **In-place**: Yes | **Adaptive**: No

Uses a binary heap data structure to sort elements by repeatedly extracting the maximum.

**Use Cases**:
- When guaranteed O(n log n) with O(1) space is needed
- Real-time systems requiring predictable performance
- Priority queue implementations

**Pros**: Guaranteed O(n log n), in-place, consistent performance  
**Cons**: Not stable, poor cache performance

## Advanced Comparison-Based Algorithms

### 1. Shell Sort
**Time Complexity**: O(n log²n) to O(n^1.5) depending on gap sequence  
**Space Complexity**: O(1)  
**Stable**: No | **In-place**: Yes | **Adaptive**: Yes

Generalization of insertion sort that compares elements separated by a gap, gradually reducing the gap.

**Use Cases**:
- Medium-sized datasets (hundreds to thousands of elements)
- When simple implementation with better than O(n²) is needed
- Embedded systems with memory constraints

**Pros**: Better than basic O(n²) algorithms, simple, in-place  
**Cons**: Gap sequence affects performance, not stable

### 2. Tim Sort
**Time Complexity**: O(n log n) worst, O(n) best  
**Space Complexity**: O(n)  
**Stable**: Yes | **In-place**: No | **Adaptive**: Yes

Hybrid stable sorting algorithm derived from merge sort and insertion sort, used as Python's default sort.

**Use Cases**:
- Real-world data (often partially sorted)
- When stability is crucial
- General-purpose sorting in high-level languages

**Pros**: Excellent real-world performance, stable, adaptive  
**Cons**: Complex implementation, requires extra space

### 3. Intro Sort (Introspective Sort)
**Time Complexity**: O(n log n) all cases  
**Space Complexity**: O(log n)  
**Stable**: No | **In-place**: Yes | **Adaptive**: Partially

Hybrid algorithm that starts with quick sort, switches to heap sort when recursion depth exceeds a limit.

**Use Cases**:
- C++ STL sort implementation
- When you need quick sort's average performance with heap sort's guarantees
- Systems programming

**Pros**: Best of quick sort and heap sort, guaranteed O(n log n)  
**Cons**: Complex implementation, not stable

## Non-Comparison Based Algorithms

### 1. Counting Sort
**Time Complexity**: O(n + k) where k is the range  
**Space Complexity**: O(k)  
**Stable**: Yes | **In-place**: No | **Adaptive**: No

Sorts by counting occurrences of each distinct element, then reconstructing the sorted array.

**Use Cases**:
- Small integer ranges
- When range is known and small relative to array size
- As a subroutine in radix sort

**Pros**: Linear time when range is small, stable  
**Cons**: Only works with integers in known range, space requirement

### 2. Radix Sort
**Time Complexity**: O(d(n + k)) where d is digits, k is radix  
**Space Complexity**: O(n + k)  
**Stable**: Yes | **In-place**: No | **Adaptive**: No

Sorts by processing individual digits/characters from least to most significant.

**Use Cases**:
- Fixed-width integer keys
- String sorting with fixed-length strings
- When keys have multiple components

**Pros**: Linear time for fixed-width keys, stable  
**Cons**: Only works with fixed-width data, space overhead

### 3. Bucket Sort
**Time Complexity**: O(n + k) average, O(n²) worst  
**Space Complexity**: O(n + k)  
**Stable**: Yes | **In-place**: No | **Adaptive**: No

Distributes elements into buckets, sorts each bucket, then concatenates.

**Use Cases**:
- Uniformly distributed floating-point numbers
- When input is evenly distributed over a range
- Parallel processing scenarios

**Pros**: Linear average time, naturally parallelizable  
**Cons**: Performance depends on distribution, extra space

## Database Sorting Algorithms

### 1. External Merge Sort
**Time Complexity**: O(n log n)  
**Space Complexity**: O(B) where B is buffer size  
**I/O Complexity**: O(n/B × log(n/B))

Multi-pass algorithm for sorting data larger than available memory using external storage.

**Use Cases**:
- Database sorting operations
- Big data processing
- When dataset exceeds available RAM

**Implementation**:
1. **Pass 1**: Create sorted runs that fit in memory
2. **Pass 2+**: Merge multiple runs using limited memory buffers
3. **Optimization**: Use replacement selection for longer initial runs

**Pros**: Handles arbitrarily large datasets, predictable I/O  
**Cons**: Multiple disk passes, complex buffer management

### 2. Polyphase Merge Sort
**Time Complexity**: O(n log n)  
**I/O Complexity**: Optimal for given number of tapes/files

Advanced external sorting using an optimal merge pattern with multiple temporary files.

**Use Cases**:
- Large database sorts with limited temporary storage
- Tape-based sorting systems
- Optimizing merge operations

**Pros**: Optimal merge pattern, reduces I/O operations  
**Cons**: Complex implementation, requires careful planning

### 3. Tournament Sort (Tree of Losers)
**Time Complexity**: O(n log k) where k is number of runs  
**Space Complexity**: O(k)

Uses a tournament tree to efficiently merge multiple sorted runs.

**Use Cases**:
- Database query processing
- Merging multiple sorted streams
- External sorting with many runs

**Pros**: Efficient for merging many runs, stable  
**Cons**: Complex tree management, overhead for small k

## Specialized and Domain-Specific Sorting

### 1. String Sorting Algorithms

#### Multikey Quicksort (MSD String Sort)
**Time Complexity**: O(N × W) average, O(N² × W) worst  
**Space Complexity**: O(log N × W)  
**Use Cases**: Variable-length strings, tries, suffix arrays

#### LSD String Sort
**Time Complexity**: O(N × W)  
**Space Complexity**: O(N + R) where R is alphabet size  
**Use Cases**: Fixed-length strings, stable string sorting

#### 3-Way String Quicksort
**Time Complexity**: O(N × log N + N × W)  
**Space Complexity**: O(log N)  
**Use Cases**: General string sorting with good cache performance

### 2. Suffix Array Construction

#### DC3 Algorithm (Difference Cover 3)
**Time Complexity**: O(n)  
**Space Complexity**: O(n)  
**Use Cases**: Text indexing, bioinformatics, string matching

#### SA-IS (Suffix Array by Induced Sorting)
**Time Complexity**: O(n)  
**Space Complexity**: O(n)  
**Use Cases**: Linear-time suffix array construction

### 3. Geometric Sorting

#### Closest Pair Sorting
**Use Cases**: Computational geometry, graphics  
**Approach**: Sort by one dimension, then use divide-and-conquer

#### Convex Hull Sorting
**Use Cases**: Computer graphics, robotics  
**Approach**: Angular sort around centroid or lowest point

### 4. Topological Sorting
**Time Complexity**: O(V + E)  
**Space Complexity**: O(V)  
**Use Cases**: Dependency resolution, task scheduling, build systems

**Algorithms**:
- Kahn's Algorithm (BFS-based)
- DFS-based topological sort

## Parallel and Concurrent Sorting

### 1. Parallel Merge Sort
**Time Complexity**: O(log²n) with O(n) processors  
**Space Complexity**: O(n)

Parallelizes both the divide and merge phases of merge sort.

**Use Cases**:
- Multi-core systems
- Distributed computing
- GPU sorting

### 2. Parallel Quicksort
**Time Complexity**: O(log n) with O(n/log n) processors  
**Space Complexity**: O(log n)

Parallelizes partitioning and recursive calls.

**Use Cases**:
- Shared-memory systems
- When load balancing is challenging

### 3. Sample Sort
**Time Complexity**: O(n log n / p + n log p) with p processors  
**Space Complexity**: O(n)

Parallel sorting algorithm that uses sampling to achieve good load balance.

**Use Cases**:
- Distributed memory systems
- MapReduce frameworks
- Large-scale parallel processing

### 4. Bitonic Sort
**Time Complexity**: O(log²n) with O(n log n) processors  
**Space Complexity**: O(1)

Comparison network suitable for parallel hardware implementations.

**Use Cases**:
- Hardware implementations
- GPU sorting
- Fixed-size parallel processors

## Hybrid and Modern Algorithms

### 1. Pdqsort (Pattern-defeating Quicksort)
**Time Complexity**: O(n log n) all cases  
**Space Complexity**: O(log n)  
**Stable**: No | **In-place**: Yes | **Adaptive**: Yes

Modern hybrid algorithm combining quicksort, heapsort, and insertion sort with pattern detection.

**Use Cases**:
- C++ std::sort replacement
- High-performance general-purpose sorting
- When adversarial inputs are possible

**Features**:
- Detects and defeats quicksort-killers
- Falls back to heapsort for bad partitions
- Uses insertion sort for small arrays

### 2. Spreadsort
**Time Complexity**: O(n log n) worst, O(n) best  
**Space Complexity**: O(n)  
**Stable**: Variant available | **In-place**: No | **Adaptive**: Yes

High-performance hybrid radix sort that falls back to comparison-based sorting.

**Use Cases**:
- Large datasets with suitable key types
- High-performance computing
- When data characteristics are favorable

### 3. American Flag Sort
**Time Complexity**: O(n × k/d) where k is key length, d is radix  
**Space Complexity**: O(1)  
**Stable**: No | **In-place**: Yes | **Adaptive**: No

In-place variant of radix sort that doesn't require extra space for buckets.

**Use Cases**:
- Memory-constrained environments
- When in-place radix sort is needed
- Fixed-width integer or string keys

### 4. Burstsort
**Time Complexity**: O(n × k) where k is average key length  
**Space Complexity**: O(n × k)  
**Stable**: Yes | **In-place**: No | **Adaptive**: Yes

Cache-efficient string sorting algorithm using burst tries.

**Use Cases**:
- Large string datasets
- Cache-sensitive applications
- Variable-length strings

## Algorithm Comparison Matrix

| Algorithm | Time (Avg) | Time (Worst) | Space | Stable | In-place | Adaptive | Best Use Case |
|-----------|------------|--------------|-------|--------|----------|----------|---------------|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes | Yes | Yes | Educational |
| Selection Sort | O(n²) | O(n²) | O(1) | No | Yes | No | Minimal writes |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes | Yes | Yes | Small/nearly sorted |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes | No | No | Stability required |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No | Yes | No | General purpose |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No | Yes | No | Guaranteed performance |
| Tim Sort | O(n log n) | O(n log n) | O(n) | Yes | No | Yes | Real-world data |
| Counting Sort | O(n + k) | O(n + k) | O(k) | Yes | No | No | Small integer range |
| Radix Sort | O(d(n + k)) | O(d(n + k)) | O(n + k) | Yes | No | No | Fixed-width keys |
| External Merge | O(n log n) | O(n log n) | O(B) | Yes | No | No | Large datasets |

## Choosing the Right Algorithm

### Decision Tree

1. **Data Size**:
   - < 10 elements: Insertion Sort
   - 10-50 elements: Insertion Sort or Shell Sort
   - 50+ elements: Advanced algorithms

2. **Memory Constraints**:
   - Limited memory: In-place algorithms (Quick Sort, Heap Sort)
   - Abundant memory: Merge Sort, Tim Sort

3. **Stability Required**:
   - Yes: Merge Sort, Tim Sort, Counting Sort
   - No: Quick Sort, Heap Sort acceptable

4. **Data Characteristics**:
   - Nearly sorted: Insertion Sort, Tim Sort
   - Random: Quick Sort, Intro Sort
   - Known range: Counting Sort, Radix Sort
   - Strings: String-specific algorithms

5. **Performance Requirements**:
   - Guaranteed O(n log n): Heap Sort, Merge Sort
   - Best average case: Quick Sort, Intro Sort
   - Cache efficiency: Quick Sort, in-place algorithms

6. **Special Requirements**:
   - External data: External Merge Sort
   - Parallel processing: Parallel variants
   - Real-time: Heap Sort (predictable)

### Modern Recommendations

- **General Purpose**: Intro Sort or Pdqsort
- **Stability Required**: Tim Sort or Merge Sort
- **Memory Constrained**: Heap Sort or Shell Sort
- **Large External Data**: External Merge Sort
- **Strings**: 3-Way String Quicksort or Burstsort
- **Integers (small range)**: Counting Sort or Radix Sort
- **Real-time Systems**: Heap Sort
- **Educational**: Merge Sort (concepts) or Insertion Sort (simplicity)

## Conclusion

The choice of sorting algorithm depends heavily on the specific requirements of your application, including data size, memory constraints, stability requirements, and performance characteristics. Modern systems often use hybrid approaches that combine multiple algorithms to achieve optimal performance across different scenarios.

For most applications, well-implemented library functions (like C++'s std::sort or Python's sorted()) provide excellent performance using sophisticated hybrid algorithms. However, understanding the underlying algorithms helps in making informed decisions for specialized use cases and performance-critical applications.
