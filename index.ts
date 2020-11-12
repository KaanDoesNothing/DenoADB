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
    
    async startApp(packageName: string) {
        await cmd(`adb shell monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`);
    }
    
    async shell(input: string) {
        return await cmd("adb shell " + input);
    }

    async click(x: number, y: number) {
        await cmd(`adb shell input tap ${x} ${y}`);
    }

    async back() {
        await cmd(`adb shell input keyevent KEYCODE_BACK`);
    }

    async home() {
        await cmd("adb shell input keyevent KEYCODE_HOME");
    }

    async menu() {
        await cmd("adb shell input keyevent KEYCODE_MENU");
    }

    async reboot() {
        await cmd("adb reboot");
    }
}

export default ADB;