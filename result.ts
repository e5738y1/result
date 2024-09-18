type Callback<A extends any[], R> = (...args: A) => R;
type AsyncCallback<A extends any[], R> = (...args: A) => Promise<R>;

/** 
 * Purpose of this class is to provide a way to handle errors in-place instead of in try-catch block.
 * Such approach allows you to handle errors not breaking control flow of your program.
*/
class Result<T, B extends boolean> {
    data: T;
    isError: B;

    private constructor(data: T, isError: B) {
        this.data = data;
        this.isError = isError;
    }

    /** Wrap calculations result in {@link Result} with {@link isError} = true */
    static error<T>(error: T) {
        return new Result(error, true);
    }

    /** wrap calculations result in {@link Result} with {@link isError} = false*/
    static success<T>(data: T) {
        return new Result(data, false);
    }

    /** 
     * Execute function and wrap its result in {@link Result} catching errors. 
     * Use {@link wrapAsync} for wrapping async functions.
    */
    static wrap<A extends any[], R>(callback: Callback<A, R>, ...args: A) {
        try {
            return Result.success(callback(...args));
        }
        catch (error) {
            return Result.error(error);
        }
    }

    /** Execute async function and wrap its result in {@link Result} catching errors. */
    static async wrapAsync<A extends any[], R>(callback: AsyncCallback<A, R>, ...args: A) {
        try {
            return Result.success(await callback(...args));
        }
        catch (error) {
            return Result.error(error);
        }
    }

    /** Returns provided data in case of successful {@link Result}, throws provided error otherwise. */
    unwrap() {
        if (this.isError) {
            throw this.data;
        }
        return this.data;
    }
}

export default Result;
