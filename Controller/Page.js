module.exports=((ATA)=>{
	const _ = {};
	
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
	
	const WelcomePage = (Container)=>{
		Container.Text("<H2>Bekleyin...</H2>");
		HideSpinner();
		
		PreferencesPage_0(Container);
	};
	
	const PreferencesPage_0 = (Container)=>{
		Container.Text("");
		const Options = {};
		
		const Body = Container.AddElement("DIV").SetClass("card-body row g-3");
		
		
		
		
		
		const submitButton = Body.AddElement("DIV").SetClass("col-12").AddElement("BUTTON").SetClass("btn btn-primary").SetAttribute("type", "submit").Text("Sonraki");
		
		submitButton._.addEventListener("click", ()=>{
			PreferencesPage_1(Container, Object.assign(Options, {
				START: "YES",
			}));
		});
		
	};
	
	const PreferencesPage_1 = (Container, Options)=>{
		Container.Text("");
		const Body = Container.AddElement("DIV").SetClass("card-body row g-3");
		
		const leftColumn = Body.AddElement("DIV").SetClass("col-md-6");
		const rightColumn = Body.AddElement("DIV").SetClass("col-md-6");
		
		const architectureForm = leftColumn.AddElement("DIV").SetClass("mb-3");
		
		architectureForm.AddElement("LABEL").SetClass("form-label").Text("Mimari :");
		const ArchitectureSelect = architectureForm.AddElement("SELECT").SetClass("form-select").SetAttribute("aria-label", "Mimari");
		
		const targetPathForm = leftColumn.AddElement("DIV").SetClass("mb-3");
		
		targetPathForm.AddElement("LABEL").SetClass("form-label").Text("Hedef :");
		const targetPathInput = targetPathForm.AddElement("INPUT").SetClass("form-control").SetAttribute("type", "text").SetAttribute("placeholder", "/mnt/");
		
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
		
		
		ArchitectureSelect.AddElement("OPTION")
			.SetAttribute("value", "amd64")
			.Text("amd64");
		/*ArchitectureSelect.AddElement("OPTION")
			.SetAttribute("value", "armf")
			.Text("armf");*/
		
		targetPathInput.SetAttribute("value", "/mnt/");
		
		usernameInput.SetAttribute("value", "admin");
		
		passwordInput.SetAttribute("value", "1234");
		
		rootPasswordInput.SetAttribute("value", "1234");
		
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
			
			const targetPath = targetPathInput._.value;
			
			const username = usernameInput._.value;
			const password = passwordInput._.value;
			const rootPassword = rootPasswordInput._.value;
			
			console.log(Container, Object.assign(Options, {
				Architecture,
				DesktopEnvironment,
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
		const Container = new DomElement("DIV");
		
		const outerDiv = Container.AddElement("DIV")
			.SetClass("align-items-center d-flex justify-content-center")
			.SetStyle("background-color:rgb(53, 53, 168);position:absolute;left:0;top:0;width:100%;height:100%;");
		
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
		
		WelcomePage(cardBodyDiv);
	};
	
	return{
		Setup,
		WelcomePage,
		//
	};
})(ATA());