module.exports=((ATA)=>{
	const _ = {};
	
	const colors = [
		"#000FFF", // Mavi
		"#FF5722", // Turuncu
		"#00BCD4", // Turkuaz
		"#F44336", // Kırmızı
		"#673AB7", // Mor
		"#009688", // Yeşil
		"#9C27B0", // Pembe
		"#8BC34A", // Açık Yeşil
		"#2196F3", // Açık Mavi
		"#FFC107", // Sarı
		"#4CAF50", // Orta Yeşil
		"#FFEB3B", // Açık Sarı
		"#616161", // Gri
		"#CDDC39", // Açık Yeşil
		"#87CEEB", // Açık Mavi
		"#795548", // Kahverengi
		"#FF9800", // Turuncu
		"#3F51B5", // Mavi
		"#607D8B", // Gri Mavi
		"#E91E63", // Pembe
		"#FFDDDD", // Açık Kırmızı
		"#F0E68C", // Sarı
		"#00FFFF", // Açık Mavi
		"#000000",  // Siyah
		"#FF0000",
		"#00FF00",
		"#0000FF",
		"#909000",
		"#900090",
		"#009090",
	];
	
	const DomElement = (()=>{
		const doc = document;
		const private_key = Symbol();
		
		const class_stack = {};
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			const default_config = {
				
			};
			
			return Object.assign({
				// configurations
			}, { ...default_config }, { ...config });
		};
		
		const register = (ins, tagname, area, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			let ele = null;
			
			if(config.Element){
				ele = config.Element
			}else{
				ele = doc.createElement(tagname);
				area.appendChild(ele);
			}
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				ele,
				childs: [],
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(tagname="DIV", area=doc.body, config){
				register(this, tagname, area, config);
			};
			AddElement(tagname){
				return AddElement(this, tagname);
			};
			SetClass(classname=""){
				SetClass(this, classname);
				return this;
			};
			SetStyle(css){
				SetStyle(this, css);
				return this;
			};
			SetAttribute(key, value){
				SetAttribute(this, key, value);
				return this;
			};
			get $(){
				return Get$(this);
			};
			get _(){
				return Get_(this);
			};
			Text(text){
				SetText(this, text);
				return this;
			};
		};
		
		const AddElement = (ins, tagname)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			const dom = new Class(tagname, ele);
			
			hidden_stack[ID].childs.push(dom);
			
			return dom;
		};
		
		const SetClass = (ins, classname)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.className = "" + classname;
		};
		
		const SetStyle = (ins, css)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.style.cssText = css + "";
		};
		
		const SetAttribute = (ins, key, value)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.setAttribute(key, value);
		};
		
		const Get$ = (ins)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			return $(ele);
		};
		
		const Get_ = (ins)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			return ele;
		};
		
		const SetText = (ins, text)=>{
			const ID = ins[private_key];
			const ele = hidden_stack[ID].ele;
			
			ele.innerHTML = "" + text;
		};
		
		return Class;
	})();
	
	const ShowSpinner = ()=>{
		document.getElementById("spinnerpanel").style.visibility = "visible";
	};
	
	const HideSpinner = ()=>{
		document.getElementById("spinnerpanel").style.visibility = "hidden";
	};
	
	const Canvas = (()=>{
		const private_key = Symbol();
		
		const config_stack = {};
		const hidden_stack = {};
		
		const Generate_Config = (config={})=>{
			const default_config = {
				
			};
			
			return Object.assign({
				// configurations
			}, { ...default_config }, { ...config });
		};
		
		const register = (ins, canvas, config={})=>{
			
			const ID = Symbol();
			ins[private_key] = ID;
			
			
			canvas.SetAttribute("width", "1000")
			.SetAttribute("height", "30");
			
			//class_stack[ID] = ins;
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				canvas: canvas._,
				ctx: canvas._.getContext("2d"),
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(canvas, config){
				register(this, canvas, config);
			};
			SetMap(start, end, color){
				//const color = getRandomColor();
				SetMap(this, start, end, color);
				return color;
			};
			Clear(){
				SetMap(this, 0, 100, "#80808000");
			};
		};
		
		const getRandomColor = ()=>{
			const r = Math.floor(Math.random() * 150).toString(16);
			const g = Math.floor(Math.random() * 150).toString(16);
			const b = Math.floor(Math.random() * 150).toString(16);
			
			const tr = (r.length === 1 ? "0" : "") + r;
			const tg = (g.length === 1 ? "0" : "") + g;
			const tb = (b.length === 1 ? "0" : "") + b;
			
			return"#" + tr + tg + tb + "BB";
		};
		
		const SetMap = (ins, start, end, color)=>{
			const ID = ins[private_key];
			const ctx = hidden_stack[ID].ctx;
			
			const width = end - start;
			
			const scaleM = 10;
			
			ctx.fillStyle = color;
			ctx.fillRect(start * scaleM, -10, width * scaleM, 50);
			ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "#000000FF";
			ctx.rect(start * scaleM, -10, width * scaleM, 50);
			ctx.stroke();
		};
		
		return Class;
	})();
	
	let Header = null;
	let Container = null;
	let Footer = null;
	
	const WelcomePage = ()=>{
		Container.Text("<H2>Bekleyin...</H2>");
		HideSpinner();
		
		
		
		PreferencesPage_0(Container);
	};
	
	const PreferencesPage_0 = (Container)=>{
		Container.Text("");
		const Options = {};
		
		const lic = ATA.FS.readFileSync(ATA.Path.join(ATA.CWD, "./Library/Electron/View/License.html"), "UTF8");
		
		Container.AddElement("DIV").SetStyle("width:100%;height:5em;overflow-y:scroll;border:1px solid #80808080;").Text(lic);
		
		
		const submitButton = Container.AddElement("DIV").SetClass("col-12").AddElement("BUTTON").SetClass("btn btn-primary").SetAttribute("type", "submit").Text("Sonraki");
		
		submitButton._.addEventListener("click", ()=>{
			PreferencesPage_1(Container, Object.assign(Options, {
				START: "YES",
			}));
		});
	};
	
	const PreferencesPage_1 = (Container, Options)=>{
		Container.Text("");
		
		
		
		
		
		
		const canvasSection = Container.AddElement("DIV")
			.SetClass("row g-3");
		
		const Body = Container.AddElement("DIV").SetClass("row g-3");
		
		
		
		
		
		
		const leftColumn = Body.AddElement("DIV").SetClass("col-md-6");
		const rightColumn = Body.AddElement("DIV").SetClass("col-md-6");
		
		
		
		
		const diskForm = Body.AddElement("DIV").SetClass("mb-3");
		
		diskForm.AddElement("LABEL").SetClass("form-label").Text("Disk :");
		const diskFormSelect = diskForm.AddElement("SELECT").SetClass("form-select").SetAttribute("aria-label", "Disk");
		
		
		
		const disksListForm = Body.AddElement("DIV").SetClass("mb-3");
		
		disksListForm.AddElement("LABEL").SetClass("form-label").Text("Bölümler :");
		const disksListFormTable = disksListForm.AddElement("TABLE").SetClass("table table-striped table-hover");
		
		const disksListFormArea = disksListFormTable.AddElement("TBODY");
		
		
		
		
		
		
		
		
		// Canvas alanı
		
		const canvasColumn = canvasSection.AddElement("DIV")
			.SetClass("col").SetStyle("position:relative;width:100%;height:2em;border:1px solid black;");
		
		let selectedPartid = -1;
		const LoadMap = ()=>{
			const id = diskFormSelect._.value;
			const disk = ATA.__.disks[ATA.__.disks_obj[id] ? ATA.__.disks_obj[id] : 0];
			
			const minMapRate = 0.0175;
			
			canvasColumn.Text("");
			disksListFormArea.Text("");
			
			let total = disk.size;
			let shifted = 0;
			const shift_rate = total * minMapRate;
			
			disk.parts.map((part, index)=>{
				const start = part.SECTOR_F_BYTE;
				const end = part.SECTOR_L_BYTE;
				
				const width = end - start;
				const rate = width / total;
				
				const x1 = (start + shifted) * 100 / total;
				
				if(rate < minMapRate){
					total += shift_rate;
					shifted += shift_rate;
				}
				
				const x2 = (end + shifted) * 100 / total;
				const pColor = colors[index % colors.length];
				
				const canvas = canvasColumn.AddElement("SPAN")
					.SetClass("")
					.SetStyle("position:absolute;display:inline-block;left:" + x1 + "%;width:" + (x2 - x1) + "%;height:100%;background-color:" + pColor);
				
				const rowTR = disksListFormArea.AddElement("TR").SetStyle("cursor:pointer;");
				
				const legend = rowTR.AddElement("TD").AddElement("SPAN")
					.SetStyle("width:1em;height:1em;display:inline-block;border:1px solid black;background-color:" + pColor);
				
				rowTR.AddElement("TD").Text(part.name);
				rowTR.AddElement("TD").Text(part.LABEL);
				rowTR.AddElement("TD").Text(part.psize);
				rowTR.AddElement("TD").Text(part.TYPE);
				
				const SelectThis = ()=>{
					console.log(part.name);
					selectedPartid = part.id;
					canvas._.style.backgroundColor = "black";
					canvas._.style.top = "-1em";
					legend._.style.backgroundColor = "white";
					setTimeout(()=>{
						canvas._.style.backgroundColor = pColor;
						canvas._.style.top = "0px";
						legend._.style.backgroundColor = pColor;
					}, 100);
				};
				
				canvas._.addEventListener("click", ()=>{
					SelectThis();
				});
				
				rowTR._.addEventListener("click", () => {
					SelectThis();
				});
			});
		};
		
		diskFormSelect._.addEventListener("change", ()=>{
			LoadMap();
		});
		
		
		
		
		
		diskFormSelect.AddElement("OPTION")
			.SetAttribute("value", null)
			.Text("Seçin...");
		
		ATA.__.disks.map((disk)=>{
			diskFormSelect.AddElement("OPTION")
				.SetAttribute("value", disk.id)
				.Text(disk["Disk model"] + " (" + disk.name + ")");
		});
		
		
		const submitButton = Container.AddElement("DIV").SetClass("col-12").AddElement("BUTTON").SetClass("btn btn-primary").SetAttribute("type", "submit").Text("Sonraki");
		
		submitButton._.addEventListener("click", ()=>{
			PreferencesPage_2(Container, Object.assign(Options, {
				START: "YES",
			}));
		});
	};
	
	const PreferencesPage_2 = (Container, Options)=>{
		Container.Text("");
		const Body = Container.AddElement("DIV").SetClass("row g-3");
		
		const leftColumn = Body.AddElement("DIV").SetClass("col-md-6");
		const rightColumn = Body.AddElement("DIV").SetClass("col-md-6");
		
		const architectureForm = leftColumn.AddElement("DIV").SetClass("mb-3");
		
		architectureForm.AddElement("LABEL").SetClass("form-label").Text("Mimari :");
		const ArchitectureSelect = architectureForm.AddElement("SELECT").SetClass("form-select").SetAttribute("aria-label", "Mimari");
		
		const targetPathForm = leftColumn.AddElement("DIV").SetClass("mb-3");
		
		targetPathForm.AddElement("LABEL").SetClass("form-label").Text("Hedef :");
		const targetPathInput = targetPathForm.AddElement("INPUT").SetClass("form-control").SetAttribute("type", "text").SetAttribute("placeholder", "/mnt/");
		
		const baseSystemForm = leftColumn.AddElement("DIV").SetClass("mb-3");
		
		baseSystemForm.AddElement("LABEL").SetClass("form-label").Text("Mimari :");
		const baseSystemSelect = baseSystemForm.AddElement("SELECT").SetClass("form-select").SetAttribute("aria-label", "Base");
		
		const usernameForm = rightColumn.AddElement("DIV").SetClass("mb-3");
		
		usernameForm.AddElement("LABEL").SetClass("form-label").Text("Kullanıcı Adı :");
		const usernameInput = usernameForm.AddElement("INPUT").SetClass("form-control").SetAttribute("type", "text");
		
		const passwordForm = rightColumn.AddElement("DIV").SetClass("mb-3");
		
		passwordForm.AddElement("LABEL").SetClass("form-label").Text("Şifre (varsayılan:1234) :");
		const passwordInput = passwordForm.AddElement("INPUT").SetClass("form-control").SetAttribute("type", "password");
		
		
		const rootPasswordForm = rightColumn.AddElement("DIV").SetClass("mb-3");
		
		rootPasswordForm.AddElement("LABEL").SetClass("form-label").Text("Root Şifresi (varsayılan:1234) :");
		const rootPasswordInput = rootPasswordForm.AddElement("INPUT").SetClass("form-control").SetAttribute("type", "password");
		
		const desktopEnvironmentForm = leftColumn.AddElement("DIV").SetClass("mb-3");
		
		desktopEnvironmentForm.AddElement("LABEL").SetClass("form-label").Text("Masaüstü Ortamı");
		const DesktopEnvironmentSelect = desktopEnvironmentForm.AddElement("SELECT").SetClass("form-select").SetAttribute("aria-label", "Masaüstü Ortamı");
		
		
		targetPathInput.SetAttribute("value", "/mnt/");
		
		usernameInput.SetAttribute("value", "admin");
		
		passwordInput.SetAttribute("value", "1234");
		
		rootPasswordInput.SetAttribute("value", "1234");
		
		baseSystemSelect.AddElement("OPTION")
			.SetAttribute("value", "mantic")
			.Text("Ubuntu 23.10 (Mantic)");
		
		ArchitectureSelect.AddElement("OPTION")
			.SetAttribute("value", "amd64")
			.Text("amd64");
		/*ArchitectureSelect.AddElement("OPTION")
			.SetAttribute("value", "armf")
			.Text("armf");*/
		
		DesktopEnvironmentSelect.AddElement("OPTION")
			.SetAttribute("value", "PLASMA")
			.Text("KDE Plasma");
		/*DesktopEnvironmentSelect.AddElement("OPTION")
			.SetAttribute("value", "GNOME")
			.Text("GNOME");
		DesktopEnvironmentSelect.AddElement("OPTION")
			.SetAttribute("value", "XFCE")
			.Text("XFCE");*/
		
		
		
		const submitButton = Body.AddElement("DIV").SetClass("col-12").AddElement("BUTTON").SetClass("btn btn-primary").SetAttribute("type", "submit").Text("Sonraki");
		
		submitButton._.addEventListener("click", ()=>{
			const Architecture = ArchitectureSelect._.value;
			const DesktopEnvironment = DesktopEnvironmentSelect._.value;
			const baseSystem = baseSystemSelect._.value;
			
			const targetPath = targetPathInput._.value;
			
			const username = usernameInput._.value;
			const password = passwordInput._.value;
			const rootPassword = rootPasswordInput._.value;
			
			console.log(Container, Object.assign(Options, {
				Architecture,
				DesktopEnvironment,
				baseSystem,
				targetPath,
				username,
				password,
				rootPassword,
			}));
		});
	};
	/*
		WelcomePage
			Gerekli hesaplamalar
		PreferencesPage
			mimari
			target yolu
			kullanıcı adı, şifre, root mu?
			Ek programlar,
			Masaüstü ortamı, pencere yöneticisi
			
			
		SetupBuildPage => disk ve klasörler
		SetupBuildProcess_0_Page => Bekleme sayfası
			gpt
			yaz ve sil disk
			format
			mount
			swap bölümü
		
		
		
		SetupBuildProcess_1_Page => Bekleme sayfası
			debootstrap işlemi
			for dir vs ... işlemi
			chroot
			chroot apt update && upgrade işlemleri
		SetupBuildProcess_2_Page => Bekleme sayfası
			root ve home dizinleri kopyala
		LocalizationPage => yerelleştirme
			timezone ve locale ayarları
			europe lint
			UTF-8 TR yaz
		LoadKernel_0_Page
			generic kernel kurulumu
			xenmod kernel kurulumu
		LoadKernel_1_Page
			grub, btrfs, zfs
			libs
			sensors ...
		LoadKernel_2_Page
			genfstab yaz
			
		LoadSystem_0_Page
			bootloader => grub
		LoadSystem_1_Page
			kullanıcı ayarı yap
		LoadSystem_2_Page
			DE yükle => KDE Plasma
		LoadSystem_3_Page
			Programların kurulumu
				Nala
				Flatpak
				synaptic
				libreoffice
				firefox
				
				terminal => nano, htop, wget, gpd, ...
				DEBS => code, bitwarden
		Finalize
			apt update
			apt --fix-missing update
			apt --fix-broken install
			apt autoremove
			apt clean
			
			umount all
			swap off
			
			=> REBOOT btn
	*/
	
	const Setup = ()=>{
		ShowSpinner();
		
		const Container_ = new DomElement("DIV");
		
		const outerDiv = Container_.AddElement("DIV")
			.SetClass("align-items-center d-flex justify-content-center")
			.SetStyle("background-color:rgb(53, 53, 168);position:absolute;left:0;top:0;width:100%;height:100%;");
		
		const Container_2 = outerDiv.AddElement("DIV").SetStyle("position:absolute;left:0;top:0;width:100%;height:100%;border:5px solid black;");
		
		const cardDiv = outerDiv.AddElement("DIV")
			.SetClass("bg-white shadow rounded card col-8")
			.SetStyle("min-width:25em;");
		
		const cardHeaderDiv = cardDiv.AddElement("DIV")
			.SetClass("card-header")
			.Text("Debian Linux Kurulum Yardımcısı");
		
		const cardBodyDiv = cardDiv.AddElement("DIV")
			.SetClass("card-body");
		
		const cardFooterDiv = cardDiv.AddElement("DIV")
			.SetClass("card-footer")
			.Text("By Mustafa ÖZVER");
		
		
		Header = cardHeaderDiv;
		Container = cardBodyDiv;
		Footer = cardFooterDiv;
		
		ATA.CP.terminal.open(Container_2._);
		ATA.CP.fitAddon.fit();
	};
	
	return{
		Setup,
		WelcomePage,
		//
	};
})(ATA());