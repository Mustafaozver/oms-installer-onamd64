((ATA)=>{
	const Electron = require("electron");
	
	Electron.app.whenReady().then(() => {
		const path = ATA.Path.join(ATA.CWD, "./Library/Electron/View/index.html");
		const preload = ATA.Path.join(ATA.CWD, "./Library/Electron/preload.js");
		
		const top = new Electron.BrowserWindow();
		
		const Win = new Electron.BrowserWindow({
			parent: top,
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: true,
				nodeIntegrationInWorker: true,
				nodeIntegrationInSubFrames: true,
				preload,
				contextIsolation: false,
				enableRemoteModule: true,
			},
		});
		
		top.hide();
		Win.show();
		
		Win.loadFile(path);
		
		Win.webContents.openDevTools(false);
		Win.webContents.postMessage("i", "i");
		Win.maximize();
		
		Win.setAlwaysOnTop(true);
		Win.setFullScreen(true);
		Win.setProgressBar(50);
		Win.setOpacity(50);
		//Win.setIcon("");
		Win.setMenuBarVisibility(true);
		Win.setMovable(false);
		Win.setClosable(false);
		Win.setResizable(false);
		//Win.setKiosk(true);
		//Win.setMenu();
		
		
		Electron.globalShortcut.register("Control+Shift+I", ()=>{
			return false;
		});
		
		//Electron.MessageChannelMain.
		
		
		return;
		
		
		const { BrowserWindow } = require('electron')
		
		const child = new BrowserWindow({ parent: top })
		child.show()
		top.show()
		
		
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
	});
	
})(require("ata.js")());