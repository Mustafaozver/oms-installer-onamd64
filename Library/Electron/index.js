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
		//Win.maximize();
		
		//Win.setAlwaysOnTop(true);
		//Win.setFullScreen(true);
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
		
		
		
		
		
		
		
		
		
		const channel = new Electron.MessageChannelMain();
		
		
		
		Win.webContents.mainFrame.postMessage("port", { message: 'hello' }, [channel.port2, channel.port1]);
		
		channel.port1.onmessage = console.log;
		channel.port2.onmessage = console.log;
		
		console.log({
			p: channel
		});
		
		
		
		
		channel.port1.postMessage({ some: 'message' })
	});
})(require("ata.js")());