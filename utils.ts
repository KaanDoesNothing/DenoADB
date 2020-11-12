async function cmd(code: any) {
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

async function shell(input: string) {
    return await cmd("adb shell " + input);
}

function isTrue(val: string) {
    return parseInt(val) === 1;
}

export {cmd, shell, isTrue};