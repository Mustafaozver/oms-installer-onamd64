((ATA)=>{
	const CP = ATA.Require("./Library/Run.js");
	
	CP.RunCommand("fdisk -l", true).then((data)=>{
		
		
		
		
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