module.exports=((ATA)=>{
	const os = ATA.Require("os");
	
	const Defaults = ATA.Require("./Config/Defaults.json");
	
	const _ = {
		
	};
	
	_.Setup = ()=>{
		console.log("Installer OK");
		
		ATA.CP.RunCommand("whoami").promise.then((answer)=>{
			if(answer.trim() !== "root")return Alert("Need sudo root permits");
			
			
			
		}).catch((err)=>{
			Alert("Need sudo root permits");
		});
		
		
	};
	
	return _;
})(ATA());
