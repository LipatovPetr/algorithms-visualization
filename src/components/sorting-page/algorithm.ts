export function generateRandomArray() {
  const minLength = 3;
  const maxLength = 17;

  const randomArray = [];
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * 101));
  }

  return randomArray;
}
