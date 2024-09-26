# Write robust code, handle errors with ease
## Example:
```ts
async function signUp(username, password) {
    password = await hash(password);
    // use Result.catchAsync when you expect errors in async functions, don't forget to await
    const { data, error } = await Result.catchAsync(database.users.insert, { username, password });
    // if callback throws, data will be undefined, meanwhile error will be instance of error 
    // thrown values that aren't instance of error will be wrapped in error
    // original thrown value can be seen in error.cause
    if (error) {
        // narrowing error type to what you expect
        if (error instanceof DatabaseError && data.code === 111) {
            // return Result instance created using Result.error to not Result.catch it later
            return Result.error(new SignUpError("User Already Exists"));
        }
        else {
            // you decide what to do if error is not expected
            // if you want to crash application or handle error somewhere on higher levels just throw it
            throw data;
        }
    }
    // at that point data is guaranteed to be user, use Result.success 
    return Result.success(user);
}

// function still can throw *unexpected* errors, you can catch them if necessary 
// or ignore them to catch on higher level or to crash
const signUpResult = signUp("admin", "admin");
// not only can you handle possible errors, you can right away get data if successful 
// or throw an error otherwise, using Result.unwrap
const user = signUpResult.unwrap();
```