/**
 * Executes an asynchronous callback function and catches any errors.
 * If successful, returns the payload with a `null` error.
 * If there's an error, returns `null` payload and the error message.
 *
 * @template T - The type of data expected in the API response payload.
 * @param callback - An async function that returns a Promise of type `APIResponse<T>`.
 * @returns A tuple containing either the successful payload and `null`, or `null` and the error message.
 */
export default async function catchError<T>(
  callback: () => Promise<APIResponse<T>>
): Promise<[SuccessfulResponse<T>, null] | [null, string]> {
  try {
    // Execute the callback function to get the payload
    const payload = await callback();

    // If the payload contains a `code` property, throw an error with the message
    if ("code" in payload) throw new Error(payload.message);

    // Return the payload with `null` error
    return [payload, null];
  } catch (error) {
    // If an error occurs during execution, return `null` payload and the error message
    return [null, (error as Error).message];
  }
}
