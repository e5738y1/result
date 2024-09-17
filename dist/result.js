var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Purpose of this class is to provide a way to handle errors in-place instead of in try-catch block.
 * Such approach allows you to handle errors not breaking control flow of your program.
*/
class Result {
    constructor(data, isError) {
        this.data = data;
        this.isError = isError;
    }
    /** Wrap calculations result in {@link Result} with {@link isError} = true */
    static error(error) {
        return new Result(error, true);
    }
    /** wrap calculations result in {@link Result} with {@link isError} = false*/
    static success(data) {
        return new Result(data, false);
    }
    /**
     * Execute function and wrap its result in {@link Result} catching errors.
     * Use {@link wrapAsync} for wrapping async functions.
    */
    static wrap(callback, ...args) {
        try {
            return Result.success(callback(...args));
        }
        catch (error) {
            return Result.error(error);
        }
    }
    /** Execute async function and wrap its result in {@link Result} catching errors. */
    static wrapAsync(callback, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Result.success(yield callback(...args));
            }
            catch (error) {
                return Result.error(error);
            }
        });
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
