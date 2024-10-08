module.exports=((ATA)=>{
	const os = ATA.Require("os");
	
	const Defaults = ATA.Require("./Config/Defaults.json");
	
	console.log({
		Defaults
	});
	
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
			SWAP: false,
			HOME: false,
			REPO: false,
			////
			USRF: false,
			TMPF: false,
			VARF: false,
			SRVF: false,
			OPTF: false,
			// reconvery
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
	
	const SetInstallationDisk = async(id)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			ATA.__.preferences.installation_disk = id;
			
			
			const installation_diskim = ATA.__.disks[ATA.__.disks_obj[id]];
			console.log("Installation Disk => ", installation_diskim);
			
			await SearchParts();
		}
	};
	
	const SetBootDisk = (id)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			ATA.__.preferences.boot_disk = id;
			
			
			const installation_diskim = ATA.__.disks[ATA.__.disks_obj[id]];
			console.log("Boot Disk => ", installation_diskim);
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
			ATA.__.preferences.sparts.SWAP = false;
			ATA.__.preferences.sparts.HOME = false;
			ATA.__.preferences.sparts.REPO = false;
			
			ATA.__.preferences.sparts.USRF = false;
			ATA.__.preferences.sparts.TMPF = false;
			ATA.__.preferences.sparts.VARF = false;
			ATA.__.preferences.sparts.SRVF = false;
			ATA.__.preferences.sparts.OPTF = false;
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
	
	const SetDirectory_SWAP = (path=false)=>{
		ATA.__.preferences.sparts.SWAP = path || false;
	};
	
	const SetDirectory_HOME = (path=false)=>{
		ATA.__.preferences.sparts.HOME = path || false;
	};
	
	const SetDirectory_REPO = (path=false)=>{
		ATA.__.preferences.sparts.REPO = path || false;
	};
	
	const SetDirectory_USRF = (path=false)=>{
		ATA.__.preferences.sparts.USRF = path || false;
	};
	
	const SetDirectory_TMPF = (path=false)=>{
		ATA.__.preferences.sparts.TMPF = path || false; // buraya /tmp fstab girdisi eklenecek
	};
	
	const SetDirectory_VARF = (path=false)=>{
		ATA.__.preferences.sparts.VARF = path || false;
	};
	
	const SetDirectory_SRVF = (path=false)=>{
		ATA.__.preferences.sparts.SRVF = path || false;
	};
	
	const SetDirectory_OPTF = (path=false)=>{
		ATA.__.preferences.sparts.OPTF = path || false;
	};
	
	const SetDirectory = (data)=>{
		SetDirectory_ROOT(data.ROOT.id);
		
		SetDirectory_UEFI(data.UEFI || false);
		SetDirectory_LMBR(data.LMBR || false);
		SetDirectory_BOOT(data.BOOT || false);
		SetDirectory_SWAP(data.SWAP || false);
		SetDirectory_HOME(data.HOME || false);
		SetDirectory_REPO(data.REPO || false);
		
		SetDirectory_USRF(data.USRF || false);
		SetDirectory_TMPF(data.TMPF || false);
		SetDirectory_VARF(data.VARF || false);
		SetDirectory_SRVF(data.SRVF || false);
		SetDirectory_OPTF(data.OPTF || false);
	};
	
	
	const SetDisks = (answer)=>{
		const regex = /^(?<name>(\w+))\s+\S+\s+\S+\s+(?<size>(\S+))\s+\S+\s+\S+$/;
		const rows = answer.trim().split("\n");
		const parsed_data = rows.filter((row)=>{
			return regex.test(row.trim());
		}).map((row)=>{
			const data = regex.exec(row.trim());
			return{
				name: data.groups.name,
				path: "/dev/" + data.groups.name,
				size: parseInt(data.groups.size),
			};
		}).map((data, index)=>{
			return{
				...data,
				psize: RenderSize(data.size),
				available: CheckDisk(data),
			}
		});
		
		return parsed_data;
	};
	
	const SetPartitions = async(answer, id=ATA.__.preferences.installation_disk)=>{
		const regex = /^(?<name>([a-z0-9]+))(\s+)(\d+)(:)(\d+)(\s+)(\d+)(\s+)(?<size>(\d+))(\s+)(\d+)(\s+)(\S+)((\s+)?)(?<mount>(.+?)?)((\s*)?)$/;
		const rows = answer.trim().split("\n");
		const parts_obj = {};
		const disk = ATA.__.disks[ATA.__.disks_obj[id]];
		let partsSize = 0;
		const parsed_data = rows.filter((row)=>{
			return regex.test(row.substring(2, row.length).trim());
		}).map((row)=>{
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
			partsSize += data.size;
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
		disk.partsSize = partsSize;
		
		await SearchDiskMap(ATA.__.preferences.installation_disk);
		
		/*SetDirectory({
			ROOT: 
		});*/
	};
	
	const SetDiskMap = (id, answer)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			
			const regex_part = /^(?<path>(\S+\d))(\s+)(?<start>(\d+))(\s+)(?<end>(\d+))(.+)$/;
			const regex_info = /^(?<key>(([^:])+))(:)(?<value>(([^:])+))$/;
			
			const _map = {};
			const rows = answer.split("\n");
			
			const map1 = rows.filter(x=>regex_part.test(x)).map(x=>regex_part.exec(x));
			const map2 = rows.filter(x=>regex_info.test(x)).map(x=>regex_info.exec(x));
			
			map1.map((match)=>{
				_map[match.groups.path] = [
					parseInt(match.groups.start),
					parseInt(match.groups.end),
				];
			});
			
			map2.map((match)=>{
				disk[match.groups.key.trim()] = match.groups.value.trim();
			});
			
			
			disk.parts.map((part, index)=>{
				const map = _map[part.path];
				disk.parts[index].SECTOR_F = map[0];
				disk.parts[index].SECTOR_L = map[1];
				
				const totalSector = map[1] - map[0] + 1;
				const size = part.size / totalSector;
				
				disk.parts[index].SECTOR_F_BYTE = size * map[0];
				disk.parts[index].SECTOR_L_BYTE = size * map[1];
				
				disk.parts[index].SECTOR_F_PBYTE = RenderSize(size * map[0]);
				disk.parts[index].SECTOR_L_PBYTE = RenderSize(size * map[1]);
			});
			
			
		}
	};
	
	
	
	
	
	
	
	const SetTypePartition = (id, num=0, type=20)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			const ccmd = ["t", num, type];
			const child = ATA.CP.RunCommand("echo -e \"" + ccmd.join("\n") + "\nw\" | fdisk " + disk.path).child;
			
			child.stdout.once("data", (data)=>{
				const text = data.toString();
				console.log("DATA => ", text);
				
			});
			
			child.stderr.once("data", (data)=>{
				const text = data.toString();
				console.log("ERROR => ", text);
			});
			
			child.addListener("exit", ()=>{
				console.log("EXİT");
			});
		}
	};
	
	const CreatePartition = (id, num=0, start="", end="", type=20)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			const ccmd = ["n", num, start, end, type];
			const child = ATA.CP.RunCommand("echo -e \"" + ccmd.join("\n") + "\nw\" | fdisk " + disk.path).child;
			
			child.stdout.once("data", (data)=>{
				const text = data.toString();
				console.log("DATA => ", text);
				
			});
			
			child.stderr.once("data", (data)=>{
				const text = data.toString();
				console.log("ERROR => ", text);
			});
			
			child.addListener("exit", ()=>{
				console.log("EXİT");
			});
		}
	};
	
	const DeletePartition = (id, num=0)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			const ccmd = ["d", num];
			const child = ATA.CP.RunCommand("echo -e \"" + ccmd.join("\n") + "\nw\" | fdisk " + disk.path).child;
			
			child.stdout.once("data", (data)=>{
				const text = data.toString();
				console.log("DATA => ", text);
				
			});
			
			child.stderr.once("data", (data)=>{
				const text = data.toString();
				console.log("ERROR => ", text);
			});
			
			child.addListener("exit", ()=>{
				console.log("EXİT");
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
		return new Promise((resolve, reject)=>{
			ATA.CallSH("getdisk").then((answer)=>{
				SetDisks(answer);
				const available_disks = ATA.__.disks.filter((data)=>{
					return data.available;
				}).map((data)=>{
					SetInstallationDisk(data.id);
					SetBootDisk(data.id);
					return data;
				});
				if(available_disks.length === 0)return Alert("No available disk !");
				
				SetInstallationDisk(available_disks[0].id);
				SetBootDisk(available_disks[0].id);
				
				ATA.Page.WelcomePage();
				resolve();
			});
		});
	};
	
	const SearchParts = ()=>{
		const disk = ATA.__.disks[ATA.__.disks_obj[ATA.__.preferences.installation_disk]];
		return new Promise((resolve, reject)=>{
			ATA.CallSH("getpart", disk.path).then(async(answer)=>{
				await SetPartitions(answer);
				resolve(disk);
				//SearchDiskMap(ATA.__.preferences.installation_disk);
			});
		});
	};
	
	const SearchDiskMap = (id)=>{
		if(ATA.__.disks_obj.hasOwnProperty(id)){
			const disk = ATA.__.disks[ATA.__.disks_obj[id]];
			return new Promise((resolve, reject)=>{
				ATA.CallSH("getdiskmap", disk.path).then((answer)=>{
					SetDiskMap(id, answer);
					resolve(disk);
				});
			});
		}
	};
	
	const Setup = ()=>{
		console.log("Installer OK");
		
		ATA.CP.RunCommand("whoami").promise.then((answer)=>{
			if(answer.trim() !== "root")return Alert("Need sudo root permits");
			
			SearchDisks();
			SearchRAM();
		}).catch((err)=>{
			Alert("Need sudo root permits");
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
		SetTypePartition,
		CreatePartition,
		DeletePartition,
		//
	});
	
	return ATA.__;
})(ATA());
