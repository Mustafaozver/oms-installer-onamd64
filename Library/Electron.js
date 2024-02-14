module.exports=((ATA)=>{
	const Electron = ATA.Require("electron");
	
	
	Electron.app.whenReady().then(()=>{
	
		const Win = new Electron.BrowserWindow({
			width: 800,
			height: 600,
		});
		
		Inspector.open(9555);
		const ws = ATA.Path.parse(Inspector.url());
		
		//cp.spawn()
		
		/*const View = new Electron.BrowserView();
		Win.setBrowserView(View);
		View.setBounds({
			x: 0,
			y: 0,
			width: 1000,
			height: 1000
		});
		*/
		//View.webContents.loadFile(ATA.Path.join(ATA.CWD, "./View/index.html"));
		//View.webContents.loadURL("devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9555/" + ws.name);
		
		//Win.loadFile("devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9555/" + ws.name);
		
		
		
		
		//Win.loadURL("devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9555/" + ws.name);
		Win.loadFile(ATA.Path.join(ATA.CWD, "./View/index.html"));
	});
	
	return{
		RunCommand,
		
	};
})(ATA());