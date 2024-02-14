((ATA, process, window)=>{
	const Electron = ATA.Require("electron");
	ATA.Electron = Electron;
	ATA.Window = window;
	window.Electron = Electron;
	ATA.Require("./index.js");
})(require("ata.js")(), process, window);