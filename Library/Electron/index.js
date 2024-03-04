((ATA)=>{
	const Electron = ATA.Require("electron");
	
	const func_stack = {};
	
	func_stack["EXIT"] = ()=>{
		process.exit();
	};
	
	func_stack["LOG"] = (data)=>{
		console.log("PAGE LOG => ", data.data);
	};
	
	Electron.app.whenReady().then(()=>{
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
		
		
		
		
		Win.webContents.on('will-prevent-unload', (event)=>{
			const choice = Electron.dialog.showMessageBoxSync(Win, {
				type: 'question',
				buttons: ['Leave', 'Stay'],
				title: 'Do you want to leave this site?',
				message: 'Changes you made may not be saved.',
				defaultId: 0,
				cancelId: 1
			});
			const leave = (choice === 0)
			if (leave) {
				event.preventDefault()
			}
		});
		
		
		
		
		func_stack["EVAL"] = (data, event)=>{
			console.log("EVAL => ", data, event);
			const resp = eval(data.data);
			console.log("RESP => ", resp);
			//event.reply(resp);
		};
		
		ATA.Send = (method, data)=>{
			Win.webContents.send("msgfromstarter", {
				method,
				data
			});
		};
		
		ATA.OnMessage = (data, event)=>{
			if(!data.method)return console.log("INVALID PAGE MSG => ", data);
			const method = data.method;
			const func = func_stack[method];
			if(func)return func(data, event);
			console.log("UNKNOWN PAGE MSG => ", data);
		};
		
		Electron.ipcMain.on("msgfrompage", (event, arg)=>{
			ATA.OnMessage(arg, event);
		});
	});
})(require("ata.js")());