ADB needs to be installed first for this to work.

When using setADBPath Make sure to include the executable like setADBPath("./tools/adb.exe");

Example:
```js
import ADB from "https://deno.land/x/adb/index.ts";

const adb = new ADB();

await adb.waitForConnection();

const size = await adb.getScreenSize();

console.log(size);
```



Inspired by https://github.com/appium/appium-adb