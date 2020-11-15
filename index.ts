import {cmd, shell, isTrue} from "./utils.ts";

class ADB {
    async waitForConnection() {
        return await cmd("adb wait-for-devices");
    }

    async getScreenSize() {
        const raw: string = await shell("wm size");

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

    async getSetting(namespace: string, setting: string) {
        return await shell(`settings get ${namespace} ${setting}`);
    }

    async getProp(prop: string) {
        return await shell("getprop " + prop);
    }

    async getWifiEnabled() {
        return isTrue(await this.getSetting("global", "wifi_on"));
    }

    async getMobileDataEnabled() {
        return isTrue(await this.getSetting("global", "mobile_data"));
    }
    
    async getAirplaneEnabled() {
        return isTrue(await this.getSetting("global", "airplane_mode_on"));
    }

    async getCarrier() {
        return (await this.getProp("gsm.sim.operator.alpha")).replace(",", "").trim();
    }

    async startApp(packageName: string) {
        await shell(`monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`);
    }
    
    async click(x: number, y: number) {
        await shell(`input tap ${x} ${y}`);
    }

    async back() {
        await shell(`input keyevent KEYCODE_BACK`);
    }

    async home() {
        await shell("input keyevent KEYCODE_HOME");
    }

    async menu() {
        await shell("input keyevent KEYCODE_MENU");
    }

    async reboot() {
        await cmd("adb reboot");
    }
}

export default ADB;