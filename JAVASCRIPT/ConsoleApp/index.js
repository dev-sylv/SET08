const prompt = require("prompt-sync")();

// import prompt from "prompt-sync"

function multiplication() {
  const num = parseInt(
    prompt("Enter the Multiplication table number you want: ")
  );
  for (let i = 0; i <= 12; i++) {
    let timetable = num * i;
    console.log(`${num} x ${i} = ${timetable}`);
  }
}
multiplication();
