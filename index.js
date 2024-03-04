((ATA)=>{
	const CP = ATA.Require("./Library/Run.js");
	const Page = ATA.Require("./Controller/Page.js");
	
	
	
	
	CP.RunCommand("lsblk").then((data)=>{
		
		
		
		
		console.log("lsblk => ", data.answer);
	}).catch((data)=>{
		console.log("ERROR => ", data);
	});
	
	
	
	
	
	
	
	
	CP.RunCommand("fdisk -l").then((data)=>{
		
		
		
		
		console.log(data.answer.split("\n\n\n"));
	}).catch((data)=>{
		console.log("ERROR => ", data);
	});
	
	
	CP.RunCommand("whoami").then((data)=>{
		
		
		
		
		console.log(data.answer);
	}).catch((data)=>{
		console.log("ERROR => ", data);
	});
	
})(ATA());