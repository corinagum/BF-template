/**
 * @description calls setImmediate and setInterval on fn parameter consecutively
 * @param fn: function to be called
 * @param ms: number of milliseconds to `setInterval`
 */
export default function setImmediateAndInterval(fn: () => Promise<void>, ms: number): NodeJS.Timeout {
  setImmediate(fn);

  return setInterval(fn, ms);
}
