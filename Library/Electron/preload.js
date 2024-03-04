((ATA, process, window)=>{
	const Electron = ATA.Require("electron");
	ATA.Electron = Electron;
	ATA.Window = window;
	window.Electron = Electron;
	
	
	
	
	
	
	
	
	Electron.ipcRenderer.on("port", (e)=>{
		console.log({
			e,
			
		});
		ATA.Port = e.ports[0];
		ATA.Port_ = e.ports[1];
		ATA.Port.onmessage = (messageEvent)=>{
			console.log(messageEvent, ATA.Port);
		};
		ATA.Require("./index.js");
	});
	
	
})(require("ata.js")(), process, window);