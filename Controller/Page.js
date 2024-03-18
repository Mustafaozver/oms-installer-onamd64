module.exports=((ATA)=>{
	const _ = {};
	
	
	
	
	const WelcomePage = ()=>{
		
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
		console.log("Page OK");
		const outerDiv = document.createElement("div");
		document.body.appendChild(outerDiv);
		outerDiv.className = "align-items-center d-flex justify-content-center";
		outerDiv.style.backgroundColor = "rgb(53, 53, 168)";
		outerDiv.style.position = "absolute";
		outerDiv.style.left = "0px";
		outerDiv.style.top = "0px";
		outerDiv.style.width = "100%";
		outerDiv.style.height = "100%";
		
		const cardDiv = document.createElement("div");
		outerDiv.appendChild(cardDiv);
		cardDiv.className = "bg-white shadow rounded card col-8";
		cardDiv.style.minWidth = "25em";
		
		const cardHeaderDiv = document.createElement("div");
		cardDiv.appendChild(cardHeaderDiv);
		cardHeaderDiv.className = "card-header";
		cardHeaderDiv.innerHTML = "Debian Linux Kurulum Yardımcısı";
		
		const cardBodyDiv = document.createElement("div");
		cardDiv.appendChild(cardBodyDiv);
		cardBodyDiv.className = "card-body";
		
		const cardFooterDiv = document.createElement("div");
		cardDiv.appendChild(cardFooterDiv);
		cardFooterDiv.className = "card-footer";
		cardFooterDiv.innerHTML = "By Mustafa ÖZVER";
		
		cardBodyDiv.innerHTML = "fdhfj";
	};
	
	return{
		Setup,
		WelcomePage,
		//
	};
})(ATA());