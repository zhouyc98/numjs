// Modified from @types/numjs https://www.npmjs.com/package/@types/numjs
// Ref: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/numjs/index.d.ts

export as namespace nj;
import { Data, DataType, NdArray as BaseNdArray, TypedArray } from 'ndarray';

type NdType<T> = DataType | Data<T>;

type NdSelectionData = {
    data: TypedArray, // TypedArray | Array<number>
    shape: number[],
    stride: number[],
    offset: number
}

export interface NdArray<T = number> extends BaseNdArray<Data<T>> {
    size: number;
    shape: number[];
    ndim: number;
    dtype: DataType<Data<T>>;
    selection: NdSelectionData;
    T: NdArray<T>;

    slice(...args: Array<number | Array<number | null> | null>): NdArray<T>;

    /**
     * Return a copy of the array collapsed into one dimension using row-major order (C-style)
     */
    flatten<P>(): NdArray<P>;

    /**
     * Permute the dimensions of the array.
     */
    transpose(args?: number[]): NdArray<T>;
    transpose(...args: number[]): NdArray<T>;

    /**
     * Dot product of two arrays.
     */
    dot(x: NdArrayData<T>): NdArray<T>;

    /**
     * Assign `x` to the array, element-wise.
     */
    assign(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Add `x` to the array, element-wise.
     */
    add(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Subtract `x` to the array, element-wise.
     */
    subtract(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Multiply array by `x`, element-wise.
     */
    multiply(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Divide array by `x`, element-wise.
     */
    divide(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Bitwise and (&) `x` to the array, element-wise.
     */
    bitand(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;
    
    /**
     * Bitwise or (|) `x` to the array, element-wise.
     */
    bitor(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Bitwise xor (^) `x` to the array, element-wise.
     */
    bitxor(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Bitwise not (~) the array, element-wise.
     */
    bitnot(copy?: boolean): NdArray<T>;

    /**
     * Left shift (<<) `x` to the array, element-wise.
     */
    lshift(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Right shift (>>) `x` to the array, element-wise.
     */
    rshift(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Unsigned right shift (>>>) `x` to the array, element-wise.
     */
    rrshift(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Raise array elements to powers from given array, element-wise.
     *
     * @param [copy=true] - set to false to modify the array rather than create a new one
     */
    pow(x: NdArrayData<T> | number, copy?: boolean): NdArray<T>;

    /**
     * Calculate the exponential of all elements in the array, element-wise.
     *
     * @param [copy=true] - set to false to modify the array rather than create a new one
     */
    exp(copy?: boolean): NdArray<T>;

    /**
     * Calculate the positive square-root of all elements in the array, element-wise.
     *
     * @param [copy=true] - set to false to modify the array rather than create a new one
     */
    sqrt(copy?: boolean): NdArray<T>;

    /**
     * Return the maximum value of the array
     */
    max(): T;

    /**
     * Return the minimum value of the array
     */
    min(): T;

    /**
     * Sum of array elements.
     */
    sum(): T;

    /**
     * Returns the standard deviation, a measure of the spread of a distribution, of the array elements.
     */
    std(): number;

    /**
     * Return the arithmetic mean of array elements.
     */
    mean(): T;

    /**
     * Converts {NdArray} to a native JavaScript {Array}
     */
    tolist<LT = T>(): LT[];

    valueOf<LT = T>(): LT[];

    /**
     * Stringify the array to make it readable in the console, by a human.
     */
    inspect(): string;

    /**
     * Stringify object to JSON
     */
    toJSON(): any;

    /**
     * Create a full copy of the array
     */
    clone(): NdArray<T>;

    /**
     * Return true if two arrays have the same shape and elements, false otherwise.
     */
    equal<U>(array: NdArrayData<U>): boolean;

    /**
     * Round array to the to the nearest integer.
     */
    round(copy?: boolean): NdArray<T>;

    /**
     * Return the inverse of the array, element-wise.
     */
    negative(): NdArray<T>;

    diag(): NdArray<T>;

    iteraxis(axis: number, cb: (x: NdArray<T>, i: number) => any): void;

    /**
     * Returns the discrete, linear convolution of the array using the given filter.
     *
     * @note Arrays must have the same dimensions and `filter` must be smaller than the array.
     * @note The convolution product is only given for points where the signals overlap completely. Values outside the signal boundary have no effect. This behaviour is known as the 'valid' mode.
     * @note Use optimized code for 3x3, 3x3x1, 5x5, 5x5x1 filters, FFT otherwise.
     */
    convolve(filter: NdArrayData<T>): NdArray<T>;

    fftconvolve(filter: NdArrayData<T>): NdArray<T>;

    /**
     * Gives a new shape to an array without changing its data.
     *
     * @param shape The new shape should be compatible with the original shape. If an integer, then the result will be a 1-D array of that length
     */
    reshape<T = number>(shape: number[]): NdArray<T>;
    reshape<T = number>(...shape: number[]): NdArray<T>;
}

export type NdArrayData<T> = NdArray<T> | Data<T>;

/**
 * Return absolute value of the input array, element-wise.
 *
 */
export function abs<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Add arguments, element-wise.
 *
 */
export function add<T = number>(a: NdArrayData<T> | number, b: NdArrayData<T> | number): NdArray<T>;

/**
 * Return evenly spaced values within a given interval.
 *
 * @param [start = 0] Start of interval. The interval includes this value.
 * @param stop End of interval. The interval does not include this value.
 * @param [step = 1] Spacing between values. The default step size is 1. If step is specified, start must also be given.
 * @param [dtype = Array] The type of the output array.
 * @returns Array of evenly spaced values.
 */
export function arange<T = number>(start: number, stop?: number, dtype?: NdType<T>): NdArray<T>;
export function arange<T = number>(stop: number, dtype: NdType<T>): NdArray<T>;
export function arange<T = number>(start: number, stop: number, step: number, dtype?: NdType<T>): NdArray<T>;

/**
 * Return trigonometric inverse cosine of the input array, element-wise.
 *
 */
export function arccos<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Return trigonometric inverse sine of the input array, element-wise.
 *
 */
export function arcsin<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Return trigonometric inverse tangent of the input array, element-wise.
 *
 */
export function arctan<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Clip (limit) the values in an array between min and max, element-wise.
 *
 */
export function clip<T = number>(x: NdArrayData<T> | number, min?: number, max?: number): NdArray<T>;
/**
 * Join given arrays along the last axis.
 *
 */
export function concatenate<T = number>(...arrays: Array<NdArrayData<T>>): NdArray<T>;

/**
 * Convolve 2 N-dimensionnal arrays
 *
 */
export function convolve<T = number>(a: NdArrayData<T>, b: NdArrayData<T>): NdArray<T>;

/**
 * Return trigonometric cosine of the input array, element-wise.
 *
 */
export function cos<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Divide `a` by `b`, element-wise.
 *
 */
export function divide<T = number>(a: NdArrayData<T>, b: NdArrayData<T> | number): NdArray<T>;

/**
 * Dot product of two arrays. WARNING: supported products are: - matrix dot matrix - vector dot vector - matrix dot vector - vector dot matrix
 *
 */
export function dot<T = number>(a: NdArrayData<T>, b: NdArrayData<T>): NdArray<T>;

/**
 * Return a new array of given shape and type, filled with `undefined` values.
 *
 * @param shape    Shape of the new array, e.g., [2, 3] or 2.
 * @param [dtype]    The type of the output array.
 * @returns Array of `undefined` values with the given shape and dtype
 */
export function empty<T = number>(shape: number[] | number, dtype?: NdType<T>): NdArray<T>;

/**
 * Return true if two arrays have the same shape and elements, false otherwise.
 *
 */
export function equal<T = number>(a: NdArrayData<T>, b: NdArrayData<T>): boolean;

/**
 * Calculate the exponential of all elements in the input array, element-wise.
 *
 */
export function exp<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Convolve 2 N-dimensionnal arrays using Fast Fourier Transform (FFT)
 *
 */
export function fftconvolve<T = number>(a: NdArrayData<T>, b: NdArrayData<T>): NdArray<T>;

/**
 * Return a copy of the array collapsed into one dimension using row-major order (C-style)
 *
 */
export function flatten<T = number>(array: NdArrayData<T>): NdArray<T>;

export function getRawData<T = number>(array: NdArray<T>): Uint8Array;
export function setRawData<T = number>(array: NdArray<T>, data: Data<T>): Uint8Array;

/**
 * Return the maximum value of the array
 *
 */
export function max<T = number>(x: NdArrayData<T> | number): T;

/**
 * Return the arithmetic mean of input array elements.
 *
 */
export function mean<T = number>(x: NdArrayData<T> | number): T;

/**
 * Return the minimum value of the array
 *
 */
export function min<T = number>(x: NdArrayData<T> | number): T;

/**
 * Return element-wise remainder of division.
 */
export function mod<T = number>(x: NdArrayData<T> | number, copy?: boolean): NdArray[];

/**
 * Multiply arguments, element-wise.
 *
 */
export function multiply<T = number>(a: NdArrayData<T>, b: NdArrayData<T> | number): NdArray<T>;

/**
 * Return the inverse of the input array, element-wise.
 *
 */
export function negative<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Return a new array of given shape and type, filled with ones.
 *
 * @param shape Shape of the new array, e.g., [2, 3] or 2.
 * @param [dtype] The type of the output array.
 * @returns Array of ones with the given shape and dtype
 */
export function ones<T = number>(shape: number[] | number, dtype?: DataType): NdArray<T>;

/**
 * Raise first array elements to powers from second array, element-wise.
 *
 */
export function power<T = number>(x1: NdArrayData<T> | number, x2: NdArrayData<T> | number): NdArray<T>;

/**
 * Create an array of the given shape and propagate it with random samples from a uniform distribution over [0, 1].
 *
 * @param [shape]    he dimensions of the returned array, should all be positive integers
 */
export function random<T = number>(shape?: number[] | number): NdArray<T>;

/**
 * Gives a new shape to an array without changing its data.
 *
 * @param shape The new shape should be compatible with the original shape. If an integer, then the result will be a 1-D array of that length
 */
export function reshape<T = number>(array: NdArrayData<T>, shape: number[]): NdArray<T>;

/**
 * Round an array to the to the nearest integer.
 *
 */
export function round<T = number>(x: NdArrayData<T>): NdArray<T>;

/**
 * Return the sigmoid of the input array, element-wise.
 *
 * @param [t = 1]    stifness parameter
 */
export function sigmoid<T = number>(x: NdArrayData<T> | number, t?: number): NdArray<T>;

/**
 * Return trigonometric sine of the input array, element-wise.
 *
 */
export function sin<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Return the softmax, or normalized exponential, of the input array, element-wise.
 *
 */
export function softmax<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Calculate the positive square-root of all elements in the input array, element-wise.
 *
 */
export function sqrt<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Returns the standard deviation, a measure of the spread of a distribution, of the input array elements.
 *
 */
export function std<T = number>(x: NdArrayData<T> | number): T;

/**
 * Subtract second argument from the first, element-wise.
 *
 */
export function subtract<T = number>(a: NdArrayData<T> | number, b: NdArrayData<T> | number): NdArray<T>;

/**
 * Return the sum of input array elements.
 *
 */
export function sum<T = number>(x: NdArrayData<T> | number): T;

/**
 * Return trigonometric tangent of the input array, element-wise.
 *
 */
export function tan<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Return hyperbolic tangent of the input array, element-wise.
 *
 */
export function tanh<T = number>(x: NdArrayData<T> | number): NdArray<T>;

/**
 * Permute the dimensions of the input array according to the given axes.
 *
 * @example
 *
 * arr = nj.arange(6).reshape(1,2,3)
 * // array([[[ 0, 1, 2],
 * //         [ 3, 4, 5]]])
 * arr.T
 * // array([[[ 0],
 * //         [ 3]],
 * //        [[ 1],
 * //         [ 4]],
 * //        [[ 2],
 * //         [ 5]]])
 * arr.transpose(1,0,2)
 * // array([[[ 0, 1, 2]],
 * //        [[ 3, 4, 5]]])
 */
export function transpose<T = number>(x: NdArrayData<T> | number, axes?: number): NdArray<T>;

/**
 * Return a new array of given shape and type, filled with zeros.
 *
 * @param shape Shape of the new array, e.g., [2, 3] or 2.
 * @param [dtype = Array] The type of the output array.
 * @returns Array of zeros with the given shape and dtype
 */
export function zeros<T = number>(shape: number[] | number, dtype?: DataType): NdArray<T>;

export namespace errors {
    function ValueError(message?: string): Error;
    function ConfigError(message?: string): Error;
    function NotImplementedError(message?: string): Error;
}

export function broadcast<T, U>(shape1: T[], shape2: U[]): Array<T | U>;

export function fft<T = number>(x: NdArrayData<T>): NdArray<T>;

export function ifft<T = number>(x: NdArrayData<T>): NdArray<T>;

/**
 * Extract a diagonal or construct a diagonal array.
 *
 * @returns a view a of the original array when possible, a new array otherwise
 */
export function diag<T = number>(x: NdArrayData<T>): NdArray<T>;

/**
 * The identity array is a square array with ones on the main diagonal.
 * @param Number of rows (and columns) in n x n output.
 * @param  [dtype=Array]  The type of the output array.
 * @return n x n array with its main diagonal set to one, and all other elements 0
 */
export function identity<T = number>(n: T, dtype?: DataType): NdArray<T>;

/**
 * Join a sequence of arrays along a new axis.
 * The axis parameter specifies the index of the new axis in the dimensions of the result.
 * For example, if axis=0 it will be the first dimension and if axis=-1 it will be the last dimension.
 * @param sequence of array_like
 * @param [axis=0] The axis in the result array along which the input arrays are stacked.
 * @return The stacked array has one more dimension than the input arrays.
 */
export function stack<T = number>(arrays: Array<NdArray<T>>, axis?: number): NdArray<T>;

export namespace images {
    namespace data {
        /**  28x28 grayscale image with an handwritten digit extracted from MNIST database */
        const digit: NdArray;
        /** 28x28 grayscale image with an handwritten digit extracted from MNIST database */
        const five: NdArray;
        /** 300x600 COLOR image representing Node.js's logo */
        const node: NdArray;
        /**
         * The standard, yet sometimes controversial
         * Lena test image was scanned from the November 1972 edition of
         * Playboy magazine. From an image processing perspective, this image
         * is useful because it contains smooth, textured, shaded as well as
         * detail areas.
         */
        const lena: NdArray;
        /**
         * The standard, yet sometimes
         * controversial Lena test image was scanned from the November 1972
         * edition of Playboy magazine. From an image processing perspective,
         * this image is useful because it contains smooth, textured, shaded as
         * well as detail areas.
         */
        const lenna: NdArray;
        /**
         * This low-contrast image of the surface of
         * the moon is useful for illustrating histogram equalization and
         * contrast stretching.
         */
        const moon: NdArray;
    }
    function read(input: string): NdArray<Uint8Array>;
    function save<T = number>(img: NdArray<T>, dest: string): void;
    function resize<T = number>(img: NdArray<T>, height: number, width: number): NdArray<Uint8Array>;
    function sat<T = number>(img: NdArray<T>): NdArray<Uint32Array>;
    function ssat<T = number>(img: NdArray<T>): NdArray<Uint32Array>;
    function sobel<T = number>(img: NdArray<T>): NdArray<Float32Array>;
    function scharr<T = number>(img: NdArray<T>): NdArray<Float32Array>;
    function areaSum<T = number>(h0: number, w0: number, H: number, W: number, SAT: NdArray<T>): number;
    function areaValue<T = number>(img: NdArray<T>): number;
    function rgb2gray<T = number>(img: NdArray<T>): NdArray<Uint8Array>;
    function flip<T = number, O = T>(img: NdArray<T>): NdArray<O>;
}

export function array<T = number>(arr: NdArrayData<T>, dtype?: DataType): NdArray<T>;

export function int8<T = number>(arr: NdArrayData<T>): NdArrayData<Int8Array>;

export function uint8<T = number>(arr: NdArrayData<T>): NdArrayData<Uint8Array>;

export function int16<T = number>(arr: NdArrayData<T>): NdArrayData<Int16Array>;

export function uint16<T = number>(arr: NdArrayData<T>): NdArrayData<Uint16Array>;

export function int32<T = number>(arr: NdArrayData<T>): NdArrayData<Int32Array>;

export function uint32<T = number>(arr: NdArrayData<T>): NdArrayData<Uint32Array>;

export function float32<T = number>(arr: NdArrayData<T>): NdArrayData<Float32Array>;

export function float64<T = number>(arr: NdArrayData<T>): NdArrayData<Float64Array>;
