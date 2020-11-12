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
            x: split[0],
            y: split[1]
        }
    }
}

export default ADB;