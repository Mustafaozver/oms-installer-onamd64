((ATA)=>{
	const CP = ATA.Require("./Library/Run.js");
	const Page = ATA.Require("./Controller/Page.js");
	
	
	
	
	CP.RunCommand("lsblk").promise.then((data)=>{
		
		
		
		
		console.log("lsblk => ", data);
	}).catch((data)=>{
		console.log("ERROR => ", data);
	});
	
	
	
	
	
	
	
	
	CP.RunCommand("fdisk -l /dev/nvme0n1").promise.then((data)=>{
		
		
		
		
		console.log(data.split("\n\n\n"));
	}).catch((data)=>{
		console.log("ERROR => ", data);
	});
	
	
	CP.RunCommand("whoami").promise.then((data)=>{
		
		
		
		
		console.log(data);
	}).catch((data)=>{
		console.log("ERROR => ", data);
	});
	
	
	
	
	const ee = CP.RunCommand("echo \"$(node -e \"setTimeout(()=>{process.exit()}, 5000);setInterval(()=>{console.log(5)}, 100)\")\"");
	
	ee.promise.then((data)=>{
		console.log(data);
	}).catch((data) => {
		console.log("ERROR => ", data);
	});
	
	
	
})(ATA());