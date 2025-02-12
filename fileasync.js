const fs=require("fs/promises");
const read=async()=>{
    const data=await fs.readFile("./data.txt","utf-8");
    console.log(data);
}
read();
console.log("first")
console.log("2nd")
console.log("3rd")
console.log("4th")