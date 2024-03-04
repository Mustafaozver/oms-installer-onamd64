((ATA, process, window)=>{
	const Electron = ATA.Require("electron");
	ATA.Electron = Electron;
	ATA.Window = window;
	window.Electron = Electron;
	
	ATA.Send = (method, data)=>{
		Electron.ipcRenderer.send("msgfrompage", {
			method,
			data
		});
	};
	
	ATA.OnMessage = (data) => {
		console.log("GELEN DATA => ", data);
	};
	
	
	
	
	
	Electron.ipcRenderer.on("msgfromstarter", (event, arg)=>{
		ATA.OnMessage(arg);
	});
	
	setTimeout(()=>{
		ATA.Send("EVAL", "console.log(1453+1071);");
		ATA.Send("LOG", "console.log(1453+1071);");
	}, 3000);
	
	if(true)setTimeout(()=>{
		//window.document.body.innerHTML = "<iframe src=\"" + ATA.Path.join(ATA.CWD, "./Library/Electron/View/index2.html") + "\" style=\"border:10px solid red;width:100%;height:100%;left:0;top:0;position:absolute;\"></iframe>";
	}, 1000);
	
	
	
	ATA.Require("./index.js");
	
})(require("ata.js")(), process, window);