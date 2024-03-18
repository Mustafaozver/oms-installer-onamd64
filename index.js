((ATA)=>{
	ATA.CP = ATA.Require("./Library/Run.js");
	ATA.Page = ATA.Require("./Controller/Page.js");
	ATA.Installer = ATA.Require("./Controller/Installer.js");
	
	
	const CallSH = (command, param1="", param2="")=>{
		const child = ATA.CP.RunCommand("sh ./CPool/" + command + ".sh " + param1 + " " + param2);
		return child.promise;
	};
	
	const Setup = ()=>{
		ATA.Installer.Setup();
		ATA.Page.Setup();
		
		//ATA.Send("EVAL", "ATA.__.Win.setKiosk(true);");
	};
	
	Object.assign(ATA, {
		CallSH
	});
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
	setTimeout(()=>{
		ATA.Send("EXIT");
	}, 1000 * 60 * 5);
	
})(ATA());