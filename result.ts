type Callback = (...args: any[]) => any;
type AsyncCallback = (...args: any[]) => Promise<any>;

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
    static wrap<C extends Callback>(callback: C, ...args: Parameters<C>) {
        try {
            return Result.success(callback(...args) as ReturnType<C>);
        }
        catch (error) {
            return Result.error(error);
        }
    }

    /** Execute async function and wrap its result in {@link Result} catching errors. */
    static async wrapAsync<C extends AsyncCallback>(callback: C, ...args: Parameters<C>) {
        try {
            return Result.success(await callback(...args) as ReturnType<C>);
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
