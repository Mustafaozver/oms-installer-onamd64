module.exports=((ATA)=>{
	const child_process = ATA.Require("child_process");
	
	(()=>{
		return;
		const child = child_process.spawn("echo", ["-e", "-s", "-E", "bash"], {
			//stdio: "inherit",
			//shell: true,
			cwd: ATA.CWD,
		});
	})();
	
	const RunCommand = async(cmd, sudo=false)=>{
		const child = child_process.spawn("bash", [], {
			//stdio: "inherit",
			//shell: true,
			cwd: ATA.CWD,
		});
		const promise = new Promise((resolve, reject)=>{
			child.stdout.once("data", (data)=>{
				resolve(data.toString());
			});
			child.stderr.once("data", (data)=>{
				reject(data.toString());
			});
			child.addListener("exit", reject);
			if(sudo)child.stdin.write("sudo su\n");
			//child.stdin.write("1682972\n");
			child.stdin.write("" + cmd + "\n");
		});
		return{
			answer: await promise,
			child,
		};
	};
	
	RunCommand("1682972"/* root passwd */, true).then(console.log);
	
	return{
		RunCommand,
		
	};
})(ATA());