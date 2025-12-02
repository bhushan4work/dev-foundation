//primitive- stack memory used- makes a copy of var, original value doesnt change, the copy of var changes
//String, Number, Boolean, null, undefined, Symbol, BigInt

let myYoutubeName = "ayushyadavz"; // Primitive type stored in the Stack.
let anotherName = myYoutubeName;   // A copy of the value is created in the Stack.
anotherName = "amanyadavz";        // Changing the copy does not affect the original.

console.log(myYoutubeName); // Output: ayushyadavz (Original value remains unchanged)
console.log(anotherName);   // Output: amanyadavz (Only the copy value is changed)

//non-primitive- heap memory is used- reference\original value also gets modified on change 
//obj, fxn, array 

let userOne = {         // The reference to this object is stored in the Stack.
    email: "user@google.com",
    upi: "user@ybl"
};                      // The actual object data is stored in the Heap.

let userTwo = userOne;  // userTwo references the same object in the Heap.

userTwo.email = "ayush@google.com"; // Modifying userTwo also affects userOne.

console.log(userOne.email); // Output: ayush@google.com
console.log(userTwo.email); // Output: ayush@google.com