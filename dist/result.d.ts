type Callback<A extends any[], R> = (...args: A) => R;
type AsyncCallback<A extends any[], R> = (...args: A) => Promise<R>;
/**
 * Purpose of this class is to provide a way to handle errors in-place instead of in try-catch block.
 * Such approach allows you to handle errors not breaking control flow of your program.
*/
declare class Result<T, B extends boolean> {
    data: T;
    isError: B;
    private constructor();
    /** Wrap calculations result in {@link Result} with {@link isError} = true */
    static error<T>(error: T): Result<T, true>;
    /** wrap calculations result in {@link Result} with {@link isError} = false*/
    static success<T>(data: T): Result<T, false>;
    /**
     * Execute function and wrap its result in {@link Result} catching errors.
     * Use {@link wrapAsync} for wrapping async functions.
    */
    static wrap<A extends any[], R>(callback: Callback<A, R>, ...args: A): Result<R, false> | Result<unknown, true>;
    /** Execute async function and wrap its result in {@link Result} catching errors. */
    static wrapAsync<A extends any[], R>(callback: AsyncCallback<A, R>, ...args: A): Promise<Result<unknown, true> | Result<Awaited<R>, false>>;
    /** Returns provided data in case of successful {@link Result}, throws provided error otherwise. */
    unwrap(): T;
}
export default Result;
