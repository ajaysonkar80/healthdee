import { hash, verify } from "./password";

const hashed = hash("super-secret");

/*
console.log("Hash:", hashed);
console.log("Correct:", verify("super-secret", hashed)); // true
console.log("Wrong:", verify("nope", hashed)); // false
*/
