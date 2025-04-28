/*==============================================================================
---------------------------------- Functions -----------------------------------
==============================================================================*/

/*-------------------------------- Utilities --------------------------------*/
/**
 * Returns a debounced version of the provided function.
 *
 * This function delays the execution of `fn` until `delay` milliseconds have
 * passed without it being called again. If called repeatedly, previous calls
 * are canceled and only the last call is executed after the delay.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay time in milliseconds.
 * @returns {Function} A function that, when invoked, waits `delay` milliseconds before executing `fn`.
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...params) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, params), delay); }; };

/**
 * Executes the function immediately the first time, and debounces subsequent calls.
 *
 * @param {Function} fn - Function to execute.
 * @param {number} delay - Wait time in milliseconds.
 *
 * @returns {Function} Debounced function with immediate execution.
 */
export const debounceImmediate = (fn, delay) => {
  let timer;
  return (...params) => {
    const callNow = !timer;
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; }, delay);
    if(callNow) {
      return fn(...params); }}; };