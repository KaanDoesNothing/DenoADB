import {cmd} from "./utils.ts";

class ADB {
    async waitForConnection() {
        return await cmd("adb wait-for-devices");
    }

    async getScreenSize() {
        const raw: string = await cmd("adb shell wm size");

        const filtered: string = raw.replace("Physical size: ", "");

        const split: string[] = filtered.trim().split("x");

        return {
            x: parseInt(split[0]),
            y: parseInt(split[1])
        }
    }

    async getScreenshot(dir: string) {
        await cmd("adb shell screencap -p /sdcard/screen.png");
        await cmd("adb pull /sdcard/screen.png " + dir);
        await cmd("adb shell rm /sdcard/screen.png");

        return `${dir}/screen.png`;
    }
}

export default ADB;