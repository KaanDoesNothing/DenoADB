class ADB {
    async cmd(code: any) {
        const execute = Deno.run({
            cmd: code.split(" "), 
            stdout: "piped",
            stderr: "piped"
        });
        
        const output = await execute.output();
        const finalOutput = new TextDecoder().decode(output);
    
        execute.close();
    
        return finalOutput;
    }

    async shell(input: string) {
        return await this.cmd("adb shell " + input);
    }

    isTrue(val: string) {
        return parseInt(val) === 1;
    }

    async waitForConnection() {
        return await this.cmd("adb wait-for-devices");
    }

    async getScreenSize() {
        const raw: string = await this.shell("wm size");

        const filtered: string = raw.replace("Physical size: ", "");

        const split: string[] = filtered.trim().split("x");

        return {
            x: parseInt(split[0]),
            y: parseInt(split[1])
        }
    }

    async getScreenshot(dir: string) {
        await this.cmd("adb shell screencap -p /sdcard/screen.png");
        await this.cmd("adb pull /sdcard/screen.png " + dir);
        await this.cmd("adb shell rm /sdcard/screen.png");

        return `${dir}/screen.png`;
    }

    async getSetting(namespace: string, setting: string) {
        return await this.shell(`settings get ${namespace} ${setting}`);
    }

    async getProp(prop: string) {
        return await this.shell("getprop " + prop);
    }

    async getWifiEnabled() {
        return this.isTrue(await this.getSetting("global", "wifi_on"));
    }

    async getMobileDataEnabled() {
        return this.isTrue(await this.getSetting("global", "mobile_data"));
    }
    
    async getAirplaneEnabled() {
        return this.isTrue(await this.getSetting("global", "airplane_mode_on"));
    }

    async getCarrier() {
        return (await this.getProp("gsm.sim.operator.alpha")).replace(",", "").trim();
    }

    async startApp(packageName: string) {
        await this.shell(`monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`);
    }
    
    async click(x: number, y: number) {
        await this.shell(`input tap ${x} ${y}`);
    }

    async back() {
        await this.shell(`input keyevent KEYCODE_BACK`);
    }

    async home() {
        await this.shell("input keyevent KEYCODE_HOME");
    }

    async menu() {
        await this.shell("input keyevent KEYCODE_MENU");
    }

    async reboot() {
        await this.cmd("adb reboot");
    }
}

export default ADB;