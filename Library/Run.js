module.exports=((ATA)=>{
	const child_process = ATA.Require("child_process");
	
	const RunCommand = (cmd, sudo=false)=>{
		const child = child_process.spawn("sudo", ["-n", "-s", "-E", "bash"], {
			stdio: "pipe",
			shell: true,
			cwd: ATA.CWD,
		});
		const promise = new Promise((resolve, reject)=>{
			let resp = "";
			child.stdout.once("data", (data)=>{
				resp += data.toString();
			});
			child.stderr.once("data", (data)=>{
				reject(data.toString());
			});
			child.addListener("exit", ()=>{
				resolve(resp);
			});
			child.stdin.write("\n" + cmd + "\n");
			setTimeout(()=>{
				child.stdin.write("\nexit\n");
			}, 10);
		});
		
		return{
			promise,
			child,
		};
	};
	
	return{
		RunCommand,
		
	};
})(ATA());