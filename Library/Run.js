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
	
	const RunCommand = async(cmd)=>{
		const child = child_process.spawn("/usr/bin/sudo", ["-n", "-s", "-E", "bash"], {
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
			child.stdin.write("" + cmd + "\n");
		});
		return{
			answer: await promise,
			child,
		};
	};
	
	return{
		RunCommand,
		
	};
})(ATA());