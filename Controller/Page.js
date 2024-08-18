module.exports=((ATA)=>{
	
	
	
	
	
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
	
	const Page = (()=>{
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
		const register = (ins, tagname, area, config={})=>{
			const ID = Symbol();
			ins[private_key] = ID;
			
			
			config_stack[ID] = Generate_Config(config);
			hidden_stack[ID] = {
				
			};
		};
		
		const Class = class{
			[private_key] = null;
			constructor(config){
				register(this, config);
			};
		};
		
		return Class;
	})();
	
	
	const ShowSpinner = ()=>{
		document.getElementById("spinnerpanel").style.visibility = "visible";
	};
	
	const HideSpinner = ()=>{
		document.getElementById("spinnerpanel").style.visibility = "hidden";
	};
	
	
	const _ = {
		
	};
	
	_.Setup = ()=>{
		
	};
	
	return _;
})(ATA());