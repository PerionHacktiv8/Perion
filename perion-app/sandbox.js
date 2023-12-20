// build fizzbuzz complex with sandbox pattern like hackerrank
// https://www.hackerrank.com/challenges/fizzbuzz/problem
// https://www.hackerrank.com/challenges/fizzbuzz/problem

// 1. create a function that takes in a number
// 2. create a function that returns fizzbuzz
// 3. create a function that returns fizz
// 4. create a function that returns buzz
// 5. create a function that returns number
// 6. create a function that returns an array of numbers
// 7. create a function that returns an array of fizzbuzz
// 8. create a function that returns an array of fizz
// 9. create a function that returns an array of buzz
// 10. create a function that returns an array of numbers, fizzbuzz, fizz, buzz
// 11. create a function that returns an array of numbers, fizzbuzz, fizz, buzz
// 12. create a function that returns an array of numbers, fizzbuzz, fizz, buzz
// 13. create a function that returns an array of numbers, fizzbuzz, fizz, buzz
// 14. create a function that returns an array of numbers, fizzbuzz, fizz, buzz

function fizzbuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return 'fizzbuzz'
  } else if (num % 3 === 0) {
    return 'fizz'
  } else if (num % 5 === 0) {
    return 'buzz'
  } else {
    return num
  }
}

function fizzbuzzArray(num) {
  let arr = []
  for (let i = 1; i <= num; i++) {
    arr.push(fizzbuzz(i))
  }
  return arr
}

console.log(fizzbuzzArray(15))
