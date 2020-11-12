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

export {cmd};