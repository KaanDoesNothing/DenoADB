import ADB from "./index.ts";

const adb = new ADB();

await adb.waitForConnection();

console.log(await adb.getScreenSize());

// console.log(await new ADB().getScreenSize());