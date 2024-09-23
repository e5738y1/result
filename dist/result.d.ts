type Callback<A extends any[], R> = (...args: A) => R;
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
declare class Result<T> {
    data: T;
    private constructor();
    static error(error: Error): Result<Error>;
    static success<T>(data: T): Result<T>;
    static catch<A extends any[], R>(callback: Callback<A, R>, ...args: A): Result<Error> | Result<R>;
    static catchAsync<A extends any[], R>(callback: Callback<A, R>, ...args: A): Promise<Result<Error> | Result<Awaited<R>>>;
    unwrap(): T;
}
export { Callback };
export default Result;
