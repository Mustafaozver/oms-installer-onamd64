((ATA)=>{
	ATA.CP = ATA.Require("./Library/Run.js");
	ATA.Page = ATA.Require("./Controller/Page.js");
	ATA.Installer = ATA.Require("./Controller/Installer.js");
	
	
	const CallSH = (command, param1="", param2="")=>{
		const child = ATA.CP.RunCommand("sh ./CPool/" + command + ".sh " + param1 + " " + param2);
		return child.promise;
	};
	
	const Setup = ()=>{
		ATA.CP.GetUserName().then((username)=>{
			if(username === "root"){
				alert("Root error, do not use root!");
				ATA.Send("EXIT");
				return;
			}
			ATA.Send("EVAL", "ATA.__.Win.setKiosk(true);");
			ATA.Installer.Setup();
			ATA.Page.Setup();
			
			
		});
	};
	
	Object.assign(ATA, {
		CallSH
	});
	
	ATA.Setups.push(()=>{
		Setup();
	});
	
})(ATA());