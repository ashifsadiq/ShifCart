export function getRandomInt(min, max) {
  min = Math.ceil(min);   // Round up min
  max = Math.floor(max);  // Round down max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}