/**
 * map
 * reduce
 * forEach
 * some
 * every
 * sort
 */

let arrOfNum = [1, 2, 3, 4, 5];
let results = arrOfNum.map((el) => {
  return el * 2;
});
console.log(results);

//comparing
let arr = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

let filtered = arr.filter((el) => {
  return el >= 250 && el <= 500;
});
console.log(filtered);

let mapped = arr.map((el) => {
  return el >= 250;
});
console.log(mapped);

//given an array of objects  , return true if the gender is equal to "female"

let set08 = [
  {
    name: "Joan",
    gender: "Female",
    laptop: true,
  },
  {
    name: "Stanley",
    gender: "Male",
    laptop: true,
  },
  {
    name: "Franklin",
    gender: "Male",
    laptop: false,
  },
  {
    name: "Regina",
    gender: "Female",
    laptop: false,
  },
  {
    name: "Delight",
    gender: "Male",
    laptop: true,
  },
];
let genderSearch = set08.map((el) => {
  return el.gender === "Female" || el.laptop === true;
});
console.log(genderSearch);

//reduce
let reduced = [1, 2, 3, 4, 5, 6];
let reduceMethod = reduced.reduce((a, b) => {
  return a + b;
}, 5);

console.log(reduceMethod);

//sort
let sorting = [2, 3, 7, 1, 0, 9, 4, 6, 5];
let sortMethod = sorting.sort((a, b) => {
  return a - b;
});

console.log(sortMethod);

//class work
/**
 *
 * 1: given an array of numbers 1-9  , find the sum of every element in the array and log to the terminal your result
 *
 *
 * 2: given an array of numbers , find the average of them , log it to the console
 */

let classWork = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log(classWork.length);
let answer = classWork.reduce((a, b) => {
  return a + b / classWork.length;
});
console.log(answer);
