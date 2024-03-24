module.exports=((ATA)=>{
	const child_process = ATA.Require("child_process");
	const { Terminal } = require("xterm");
	const { FitAddon } = require("xterm-addon-fit");
	
	const terminal = new Terminal();
	const fitAddon = new FitAddon();
	
	terminal.loadAddon(fitAddon);
	fitAddon.fit();
	
	const _writein = async(data)=>{
		//console.warn("%c -> " + data.trim(), "background:#000000;color:#0d6efd");
		terminal.write("\n");
		terminal.write("\n" + data.trim());
		terminal.write("\n");
	};
	
	const _writeout = async(data)=>{
		//console.warn("%c <- " + data.trim(), "background:#000000;color:#0dcaf0");
		terminal.write("\n");
		terminal.write("\n" + data.trim());
		terminal.write("\n");
	};
	
	const RunCommand = (cmd, time=30)=>{
		const child = child_process.spawn("sudo", ["-n", "-s", "-E", "bash"], {
			stdio: ["pipe", "pipe", "pipe", "ipc"],
			shell: true,
			cwd: ATA.CWD,
			maxBuffer: 1000 * 1000 * 10,
			//detached: true,
		});
		child.stdin.setEncoding("UTF8");
		const promise = new Promise((resolve, reject)=>{
			let resp = "";
			child.stdout.on("data", (data)=>{
				const text = data.toString()
				resp += text;
				_writeout(text);
			});
			/*process.stdin.on('readable', () => {
				const chunk = process.stdin.read();
				if (chunk !== null) {
					process.stdout.write(`data: ${chunk}`);
				}
			});
			
			process.stdin.on('end', () => {
				process.stdout.write('end');
			});
			*/
			child.stderr.on("data", (data)=>{
				reject(data.toString());
			});
			child.addListener("exit", ()=>{
				resolve(resp);
			});
			child.stdin.write("\n" + cmd + "\n");
			_writein(cmd);
			if(time > 0)setTimeout(()=>{
				child.stdin.write("\nexit\n");
			}, time);
		});
		
		return{
			promise,
			child,
		};
	};
	
	const GetUserName = ()=>{
		return new Promise((resolve, reject)=>{
			child_process.exec("whoami", (err, stdout, stderr)=>{
				if(err)return reject(err);
				resolve(stdout.trim());
			});
		});
	};
	
	return{
		RunCommand,
		GetUserName,
		terminal,
		fitAddon,
		
	};
})(ATA());