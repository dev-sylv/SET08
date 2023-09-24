import * as promptSync from "prompt-sync";

const prompt = promptSync();

const mynum: any = parseInt(
  prompt("Enter the multiplication table of the number you want: ")
);

function multiplication() {
  for (let i = 0; i <= 12; i++) {
    const result = i * mynum;
    console.log(`${mynum} x ${i} = ${result}`);
  }
}
multiplication();
