let prevTimestamp = 0;
/**
 * This function obtains a Date.now() number for creation of unique timestamps
 * In the edge-case where two of the same timestamps are created,
 * (i.e. they are the same number)
 * the latter value is modified to ensure there are no repeating returned values
 */
export default function sequentialTimestamps(): number {
  let timestamp = Date.now();

  if (prevTimestamp >= timestamp) {
    timestamp = prevTimestamp++;
  }

  prevTimestamp = timestamp;

  return timestamp;
}
