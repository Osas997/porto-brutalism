/**
 * Parses a duration string (e.g. "2023 — Present", "2016 — 2020")
 * to extract the start year and end year. If "Present" is detected,
 * the end year defaults to a high value (9999).
 */
export function parseDuration(duration: string) {
  const isPresent = /present/i.test(duration);
  const years = duration.match(/\b\d{4}\b/g);
  let endYear = 0;
  let startYear = 0;

  if (isPresent) {
    endYear = 9999;
  }

  if (years && years.length > 0) {
    const numYears = years.map(Number);
    startYear = numYears[0];
    if (!isPresent) {
      endYear = numYears[numYears.length - 1];
    }
  }

  return { startYear, endYear };
}

/**
 * Sorts an array of items containing a `duration` string property
 * in descending order (newest first).
 */
export function sortByDurationDesc<T extends { duration: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const parsedA = parseDuration(a.duration);
    const parsedB = parseDuration(b.duration);

    if (parsedA.endYear !== parsedB.endYear) {
      return parsedB.endYear - parsedA.endYear;
    }
    return parsedB.startYear - parsedA.startYear;
  });
}
