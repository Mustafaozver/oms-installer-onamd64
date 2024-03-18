module.exports=((ATA)=>{
	const os = ATA.Require("os");
	
	ATA.__ = {};
	
	ATA.__.preferences = {
		// disk buildings
		installation_disk: -1,
		boot_disk: -1,
		
		// system information
		// RAM:
		// disks:
		// disks_obj
		
		// partitions buildings
		ROOT_part: -1,
		sparts: {
			UEFI: false,
			LMBR: false,
			BOOT: false,
			USRF: false,
			SWAP: false,
			HOME: false,
			REPO: false,
			
		},
		
		
		
		// ETC...
		disks_obj:[],
	};
	
	const RenderSize = (size=0)=>{
		size -= 0;
		if(size < 1024)return size + " B";
		const bytes_arr = [null, "KB", "MB", "GB", "TB"];
		let i=0;
		while(size >= 1024){
			i++;
			size /= 1024;
		}
		return size.toFixed(2) + " " + bytes_arr[i];
	};
	
	const CheckDisk = (data)=>{
		if(data.size < (50 * 1024 * 1024 * 1024))return false;
		
		return true;
	};
	
	const CheckPartition = (data)=>{
		if(data.size < (50 * 1024 * 1024 * 1024))return false;
		
		return true;
	};
	
	const ParseUUID = (text)=>{
		const regex = /(?<key>(\S+))(\=)(\"?)(?<value>([^"]+))(\"?)/g;
		let match;
		const resp = {};
		while(match = regex.exec(text)){
			resp[match.groups.key] = match.groups.value;
		}
		return resp;
	};
	
	
	
	const SetInstallationDisk = (id)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			ATA.__.preferences.installation_disk = id;
			
			
			const installation_diskim = ATA.__.disks[ATA.__.disks_obj[id]];
			console.log("Installation Disk => ", installation_diskim);
			
			SearchParts();
		}
	};
	
	const SetBootDisk = (id)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			ATA.__.preferences.boot_disk = id;
			
			
			const installation_diskim = ATA.__.disks[ATA.__.disks_obj[id]];
			console.log("Boot Disk => ", installation_diskim);
			
			SearchParts();
		}
	};
	
	const SetRAM = (answer)=>{
		const regex = /((?<type>((\S)*))(:))?(\s+)(?<total>(\d+))(\s+)(?<used>(\d+))(\s+)(?<free>(\d+))(\s+)(?<shared>(\d+))(\s+)(?<cache>(\d+))(\s+)(?<available>(\d+))(\s+)/;
		const data = regex.exec(answer);
		const total = parseInt(data.groups.total);
		SetRAM2(total);
	};
	
	const SetRAM2 = (total=0)=>{
		const adSwap = (1024 * 1024 * 1024) * Math.ceil(2 ** (Math.log(total / (1024 * 1024 * 1024)) / 0.6931471805599453));
		ATA.__.RAM = {
			total,
			adSwap,
			ptotal: RenderSize(total),
			padSwap: RenderSize(adSwap),
		};
		return ATA.__.RAM;
	};
	
	const SetDirectory_ROOT = (id)=>{
		const disk = ATA.__.disks[ATA.__.disks_obj[ATA.__.preferences.installation_disk]];
		
		const [part] = disk.parts.filter((item)=>{
			return item.id === id;
		});
		
		if(part)ATA.__.preferences.ROOT_part = part;
		else{
			ATA.__.preferences.ROOT_part = false;
			
			ATA.__.preferences.sparts.UEFI = false;
			ATA.__.preferences.sparts.LMBR = false;
			ATA.__.preferences.sparts.BOOT = false;
			ATA.__.preferences.sparts.USRF = false;
			ATA.__.preferences.sparts.SWAP = false;
			ATA.__.preferences.sparts.HOME = false;
			ATA.__.preferences.sparts.REPO = false;
		}
	};
	
	const SetDirectory_UEFI = (path=false)=>{
		ATA.__.preferences.sparts.UEFI = path || false;
	};
	
	const SetDirectory_LMBR = (path=false)=>{
		ATA.__.preferences.sparts.LMBR = path || false;
	};
	
	const SetDirectory_BOOT = (path=false)=>{
		ATA.__.preferences.sparts.BOOT = path || false;
	};
	
	const SetDirectory_USRF = (path=false)=>{
		ATA.__.preferences.sparts.USRF = path || false;
	};
	
	const SetDirectory_SWAP = (path=false)=>{
		ATA.__.preferences.sparts.SWAP = path || false;
	};
	
	const SetDirectory_HOME = (path=false)=>{
		ATA.__.preferences.sparts.HOME = path || false;
	};
	
	const SetDirectory_REPO = (path=false)=>{
		ATA.__.preferences.sparts.REPO = path || false;
	};
	
	const SetDirectory = (data)=>{
		SetDirectory_ROOT(data.ROOT.id);
		
		SetDirectory_UEFI(data.UEFI || false);
		SetDirectory_LMBR(data.LMBR || false);
		SetDirectory_BOOT(data.BOOT || false);
		SetDirectory_USRF(data.USRF || false);
		SetDirectory_SWAP(data.SWAP || false);
		SetDirectory_HOME(data.HOME || false);
		SetDirectory_REPO(data.REPO || false);
	};
	
	
	const SetDisks = (answer)=>{
		const regex = /^(?<name>(\w+))\s+\S+\s+\S+\s+(?<size>(\S+))\s+\S+\s+\S+$/;
		const rows = answer.trim().split("\n");
		const disks_obj = {};
		const parsed_data = rows.map((row)=>{
			const data = regex.exec(row.trim());
			return{
				name: data.groups.name,
				path: "/dev/" + data.groups.name,
				size: parseInt(data.groups.size),
			};
		}).map((data, index)=>{
			const id = ATA.UUID.Generate();
			disks_obj[id] = index;
			return{
				...data,
				id,
				psize: RenderSize(data.size),
				available: CheckDisk(data),
			}
		});
		ATA.__.disks = parsed_data;
		ATA.__.disks_obj = disks_obj;
	};
	
	const SetPartitions = async(answer)=>{
		const regex = /^(?<name>([a-z0-9]+))(\s+)(\d+)(:)(\d+)(\s+)(\d+)(\s+)(?<size>(\d+))(\s+)(\d+)(\s+)(\S+)((\s+)?)(?<mount>(.+?)?)((\s*)?)$/;
		const rows = answer.trim().split("\n");
		const parts_obj = {};
		const disk = ATA.__.disks[ATA.__.disks_obj[ATA.__.preferences.installation_disk]];
		const parsed_data = rows.map((row)=>{
			const data = regex.exec(row.substring(2,row.length).trim());
			return{
				name: data.groups.name,
				path: "/dev/" + data.groups.name,
				mount: data.groups.mount,
				size: parseInt(data.groups.size),
			};
		}).map((data, index)=>{
			const id = ATA.UUID.Generate();
			parts_obj[id] = index;
			return{
				...data,
				disk_id: disk.id,
				id,
				psize: RenderSize(data.size),
				__: ATA.CallSH("getpartuuid", data.path)
				//available: CheckPartition(data),
				//
			}
		});
		const uuids = await Promise.all(parsed_data.map(data=>data.__));
		parsed_data.map((item, index)=>{
			const uuid = uuids[index];
			Object.assign(parsed_data[index], ParseUUID(uuid));
		});
		disk.parts = parsed_data;
		console.log("SetPartitions => ", parsed_data);
		console.log("DISK => ", ATA.__.disks[ATA.__.disks_obj[ATA.__.preferences.installation_disk]]);
		
		/*SetDirectory({
			ROOT: 
		});*/
	};
	
	const SetDiskMap = (id, answer)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			const regex_part = /^(?<path>(\S+\d))(\s+)(?<start>(\d+))(\s+)(?<end>(\d+))(.+)$/;
			const regex_info = /^(?<key>(([^:])+))(:)(\s*)(?<value>(([\.])+))(\s*)$/;
			
			const info = {};
			const _map = {};
			const rows = answer.split("\n");
			
			const map = rows.filter(x=>regex_part.test(x)).map(x=>regex_part.exec(x));
			map.map((match)=>{
				_map[match.groups.path] = [
					parseInt(match.groups.start),
					parseInt(match.groups.end),
				];
			});
			
			const infos = rows.filter(x=>regex_info.test(x)).map(x=>regex_info.exec(x));
			
			console.log(infos);
			
			infos.map((match)=>{
				console.log(match);
			});
			
			disk.parts.map((part, index)=>{
				const map = _map[part.path];
				disk.parts[index].SECTOR_F = map[0];
				disk.parts[index].SECTOR_L = map[1];
				
				disk.parts[index].SECTOR_F_ = RenderSize(512 * map[0]);
				disk.parts[index].SECTOR_L_ = RenderSize(512 * map[1]);
			});
		}
	};
	
	const Alert = (msg)=>{
		alert(msg);
		ATA.Send("EXIT");
	};
	
	const SearchRAM = ()=>{
		const totalMemory = os.totalmem();-
		SetRAM2(totalMemory);
		
		return;
		ATA.CallSH("getram").then((answer)=>{
			SetRAM(answer);
		});
	};
	
	const SearchDisks = ()=>{
		ATA.CallSH("getdisk").then((answer)=>{
			SetDisks(answer);
			const available_disks = ATA.__.disks.filter((data)=>{
				return data.available;
			});
			if(available_disks.length === 0)return Alert("No available disk !");
			
			SetInstallationDisk(available_disks[0].id);
			SetBootDisk(available_disks[0].id);
		});
	};
	
	const SearchParts = ()=>{
		const disk = ATA.__.disks[ATA.__.disks_obj[ATA.__.preferences.installation_disk]];
		ATA.CallSH("getpart", disk.path).then((answer)=>{
			SetPartitions(answer);
			SearchDiskMap(ATA.__.preferences.installation_disk);
		});
	};
	
	const SearchDiskMap = (id)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			ATA.CallSH("getdiskmap", disk.path).then((answer)=>{
				SetDiskMap(id, answer);
			});
		}
	};
	
	const Setup = ()=>{
		console.log("Installer OK");
		
		ATA.CP.RunCommand("whoami").promise.then((answer)=>{
			if(answer.trim() !== "root")return Alert("Run this program as Root!");
			
			
			
			SearchDisks();
			SearchRAM();
		});
		
		
	};
	
	Object.assign(ATA.__, {
		Setup,
		SearchDisks,
		SearchRAM,
		SetInstallationDisk,
		SetBootDisk,
		SetDirectory,
		//
	});
	
	return ATA.__;
})(ATA());