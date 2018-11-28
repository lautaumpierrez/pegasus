class Pegasus {
	constructor(defaultHash){
		this.defaultHash = defaultHash;
	}
	saddle(elements=[]){
		this.elements = elements;
		this.changeUrl();
		this.fly(this.defaultHash);
		window.onpopstate = ()=>this.changeUrl();
	}
	changeUrl(){
		var currentHash = undefined
		if(window.location.hash == null)
			currentHash = undefined;
		else
			currentHash = window.location.hash;
		this.dieOrlive(currentHash);
	}
	dieOrlive(currentHash){
		this.elements.map((element,index)=>{
			if(currentHash !== undefined){
				if(element.hash == currentHash)
				{
					element.$element.style['display'] = 'block';
				}else{
					element.$element.style['display'] = 'none';
				}
			}else{
				element.$element.style['display'] = 'none';
			}
		});
	}
	fly(hash){
		hash = hash.split('#').join('');
		return window.location.hash = hash;
	}
	addElement({$element,hash}){
		this.elements.push({$element,hash});
	}
}
