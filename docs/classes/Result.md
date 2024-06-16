[**result**](../README.md) • **Docs**

***

[result](../README.md) / Result

# Class: Result\<T, B\>

Purpose of this class is to provide a way to handle errors in-place instead of in try-catch block.
Such approach allows you to handle errors not breaking control flow of your program.

## Type parameters

• **T**

• **B** *extends* `boolean`

## Constructors

### new Result()

> `private` **new Result**\<`T`, `B`\>(`data`, `isError`): [`Result`](Result.md)\<`T`, `B`\>

#### Parameters

• **data**: `T`

• **isError**: `B`

#### Returns

[`Result`](Result.md)\<`T`, `B`\>

#### Source

result.ts:12

## Properties

### data

> **data**: `T`

#### Source

result.ts:9

***

### isError

> **isError**: `B`

#### Source

result.ts:10

## Methods

### unwrap()

> **unwrap**(): `T`

Returns provided data in case of successful [Result](Result.md), throws provided error otherwise.

#### Returns

`T`

#### Source

result.ts:51

***

### error()

> `static` **error**\<`T`\>(`error`): [`Result`](Result.md)\<`T`, `true`\>

Wrap calculations result in [Result](Result.md) with [isError](Result.md#iserror) = true

#### Type parameters

• **T**

#### Parameters

• **error**: `T`

#### Returns

[`Result`](Result.md)\<`T`, `true`\>

#### Source

result.ts:18

***

### success()

> `static` **success**\<`T`\>(`data`): [`Result`](Result.md)\<`T`, `false`\>

wrap calculations result in [Result](Result.md) with [isError](Result.md#iserror) = false

#### Type parameters

• **T**

#### Parameters

• **data**: `T`

#### Returns

[`Result`](Result.md)\<`T`, `false`\>

#### Source

result.ts:23

***

### wrap()

> `static` **wrap**\<`C`\>(`callback`, ...`args`): [`Result`](Result.md)\<`ReturnType`\<`C`\>, `false`\> \| [`Result`](Result.md)\<`any`, `true`\>

Execute function and wrap its result in [Result](Result.md) catching errors. 
Use [wrapAsync](Result.md#wrapasync) for wrapping async functions.

#### Type parameters

• **C** *extends* [`Callback`](../type-aliases/Callback.md)

#### Parameters

• **callback**: `C`

• ...**args**: `Parameters`\<`C`\>

#### Returns

[`Result`](Result.md)\<`ReturnType`\<`C`\>, `false`\> \| [`Result`](Result.md)\<`any`, `true`\>

#### Source

result.ts:31

***

### wrapAsync()

> `static` **wrapAsync**\<`C`\>(`callback`, ...`args`): `Promise`\<[`Result`](Result.md)\<`any`, `true`\> \| [`Result`](Result.md)\<`ReturnType`\<`C`\>, `false`\>\>

Execute async function and wrap its result in [Result](Result.md) catching errors.

#### Type parameters

• **C** *extends* [`AsyncCallback`](../type-aliases/AsyncCallback.md)

#### Parameters

• **callback**: `C`

• ...**args**: `Parameters`\<`C`\>

#### Returns

`Promise`\<[`Result`](Result.md)\<`any`, `true`\> \| [`Result`](Result.md)\<`ReturnType`\<`C`\>, `false`\>\>

#### Source

result.ts:41
