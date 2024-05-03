//create a function to calculate age
function calculateAge(birthYear) {
  return 2021 - birthYear;
}

const totalUpVotes = 100;
const totalDownVotes = 50;

//create a temporary literal to contain variables
const text = `I am ${calculateAge(1990)} years old, 
and it is probably ${totalUpVotes - totalDownVotes ? "correct" : "incorrect"} `;

//write an arrow function
const calculateAge = (birthYear) =>
  birthYear > new Date().getFullYear
    ? `Impossible year. The year needs to be less than or equal to ${
        new Date().getFullYear
      }`
    : 2021 - birthYear;
console.log(calculateAge(2098));
//what is the output of the above code?

const fact = [`Lisbon is the capital of Portugal`, 2015, true];
console.log(fact);
console.log(fact.length);
console.log(fact[fact.length - 1]);

const [facts, createIn, isCorrect] = fact;
const newFact = [fact, "society"];
console.log(newFact);
//show the spread operator
const newFact2 = [...fact, "society"];

// createa a fact object
const factObj = {
  text1: "Hello, world",
  year: 2015,
  correct: true,
  category: "society",
  createSummery: function () {
    return `The fact ${this.text1} is from the 
    category ${this.category.toUpperCase()}`;
  },
};

const { text1, year, correct, category } = factObj;
console.log(correct); //what is the output of this code?
console.log(factObj.createSummery());

//for each method
[2, 4, 6, 8].forEach(function (el) {
  console.log(el);
});

//map method
// const times10 = [2, 4, 6, 8].map(function (el) {
//   return el * 10;
// });

// console.log(times10);

const times10 = [2, 4, 6, 8].map((el) => el * 10);
//write an array of objects
const factArray = [
  {
    text: "Lisbon is the capital of Portugal",
    year: 2015,
    correct: true,
    category: "society",
  },
  {
    text: "The sun is the center of the solar system",
    year: 2015,
    correct: true,
    category: "science",
  },
  {
    text: "The earth is flat",
    year: 2015,
    correct: false,
    category: "science",
  },
];
const allFacts = factArray.map((fact) => fact.text);
console.log(allFacts);

const factAges = factArray.map((fact) => calculateAge(fact.year));

console.log(factAges);
console.log(factAges.join(", "));

// const htmlArray = factArray.map((fact) => `<h1>${fact.text}</h1>`);
// const html = htmlArray.join("");

const htmlArray = factArray.map((fact) => `<hi>${fact.year}`);
console.log(htmlArray); //what is the output of this code?
const html = htmlArray.join("");

// use query selector to select the element with the id of "app"
const app = document.querySelector("#app");
app.insertAdjacentHTML("afterbegin", html);

//put everything into a function
function createFactList(dataArray) {
  const htmlArray = dataArray.map((fact) => `<h1>${fact.text}</h1>`);
  const html = htmlArray.join("");
  return html;
}

//use the function
const factList = createFactList([
  {
    text: "Lisbon is the capital of Portugal",
    year: 2015,
    correct: true,
    category: "society",
  },
]);

//supposing we have the api key and everything, we want to write an async function to fetch data from the api
async function loadFacts() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
} //you can only ues await for functions which return a promise

console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
//what is the output of the above code?
console.log([7, 64, 6, -23, 11].find((el) => el > 10));

// how to open a new terminal in vscode?
// To open a new terminal in VS Code, you can use the following keyboard shortcuts:
// - Windows/Linux: Ctrl + `
// - macOS: Cmd + `
//cmd+K
