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
 * Write robust code, handle errors with ease
 * @example
 * async function signUp(username, password) {
 *     password = await hash(password);
 *     // use Result.catchAsync when you expect errors in async functions, don't forget to await
 *     const { data } = await Result.catchAsync(database.users.insert, { username, password });
 *     // if callback throws, data is guaranteed to be instance of Error
 *     if (data instanceof Error) {
 *         // narrowing error type to what you expect
 *         if (data instanceof DatabaseError && data.code === 111) {
 *             // return Result instance created using Result.error to not Result.wrap it later
 *             return Result.error(new SignUpError("User Already Exists"));
 *         }
 *         else {
 *             // this error is not expected, throw it
 *             throw data;
 *         }
 *     }
 *     // at that point data is guaranteed to be user, use Result.success
 *     return Result.success(user);
 * }
 *
 * // function still can throw *unexpected* errors, you can catch them if necessary or ignore them to catch on higher level or to crash
 * const signUpResult = signUp("admin", "admin");
 * // not only can you handle possible errors, you can right away get data if successful or throw an error otherwise, using Result.unwrap
 * const user = signUpResult.unwrap();
*/
class Result {
    constructor(data) {
        this.data = data;
    }
    static error(error) {
        return new Result(error);
    }
    static success(data) {
        return new Result(data);
    }
    static catch(callback, ...args) {
        try {
            return Result.success(callback(...args));
        }
        catch (error) {
            if (error instanceof Error) {
                return Result.error(error);
            }
            else {
                return Result.error(new Error("Result error. See cause and traces for details", { cause: error }));
            }
        }
    }
    static catchAsync(callback, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Result.success(yield callback(...args));
            }
            catch (error) {
                if (error instanceof Error) {
                    return Result.error(error);
                }
                else {
                    return Result.error(new Error("Result error. See cause and traces for details", { cause: error }));
                }
            }
        });
    }
    unwrap() {
        if (this.data instanceof Error) {
            throw this.data;
        }
        return this.data;
    }
}
export default Result;
