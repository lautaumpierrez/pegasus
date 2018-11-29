class Pegasus {
	constructor({defaultHash, config}){
		this.defaultHash = defaultHash;
		this.config = {
			router: config.router,
		}
		if(this.config.router)
			this.$element_error404 = config.template404;
	}
	verifyDefaultHash(){
		var thisObj = this;
		return new Promise((resolve, reject)=>{
			if(window.location.hash == '')
			{
				thisObj.fly(this.defaultHash);
				resolve(false);
			}else{
				resolve(true);
			}
		})
	}
	saddle(elements=[]){
		this.elements = elements;
		this.verifyDefaultHash().then((hasHash)=>{
			this.changeUrl();
		})		
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
		const page = this.elements.find(element => element.hash === window.location.hash);
		if(page == undefined && this.config.router)
		{
			this.elements.map(element=>element.$element.style['display'] = 'none');
			this.error404();
		}else{
			if(this.config.router)
				this.$element_error404.style['display'] = 'none';
			this.elements.map((element,index)=>{
				if(currentHash !== undefined){
					if(element.hash == currentHash)
					{
						element.$element.style['display'] = 'block';

						if(element.callback == null)
						{
							element.callback = ()=>{};
						}
						element.callback();
					}else{
						element.$element.style['display'] = 'none';
					}
				}else{
					element.$element.style['display'] = 'none';
				}
			});
		}
	}
	error404(){
		this.$element_error404.style['display'] = 'block';
	}
	fly(hash){
		hash = hash.split('#').join('');
		return window.location.hash = hash;
	}
	addElement({$element,hash}){
		this.elements.push({$element,hash});
	}
}
