class Pegasus {
	constructor({defaultHash, config,$container}){
		this.defaultHash = defaultHash;
		if(config.multihash == undefined) throw new Error("set the prop <multihash> in the object of configuration");
		if(config.router == undefined) throw new Error("set the prop <router> in the object of conifguration");
		if(config.router && config.template404 == undefined) throw new Error("set the 404 template, is needed when use the router mode ...");
		if(config.template404 != null && !this.isHTMLElement(config.template404))
			throw new Error('config object need a template404 HTMLElement.');
		this.config = {
			router: config.router,
			multihash: config.multihash
		};
		if(this.isHTMLElement($container)) $container.style['display'] = 'block'; 
		if(this.config.router)
			this.$element_error404 = config.template404;
		this.dataBinding();
	}
	verifyDefaultHash(){
		return new Promise((resolve, reject)=>{
			if(window.location.hash == '')
			{
				this.fly(this.defaultHash);
				resolve(false);
			}else{
				resolve(true);
			}
		})
	}
	saddle(elements=[]){
		elements.map(element=>{
			element.hash = element.hash.split('#').join('');
		});
		this.elements = elements;
		if(this.config.router) this.verifyDefaultHash().then((hasHash)=>{
			this.changeUrl();
		})
		else this.changeUrl();
		window.onpopstate = ()=>this.changeUrl();
	}
	changeUrl(){
		var currentHash = undefined;
		var multihash =false;
		if(window.location.hash == null)
			currentHash = undefined;
		else{

			currentHash = window.location.hash;
			currentHash = currentHash.split('#').join('');
			if(this.config.multihash){
				if(currentHash.split('&').length > 1)
				{
					multihash = true;
				}
			}
		}
		if(multihash){
			var hashs = currentHash.split('#').join('');
			hashs = hashs.split('&');
			hashs.map((hash)=>{
				this.dieOrlive({ currentHash: `${hash}`, multihash: true, hashs});
			})
		}else{
			this.dieOrlive({currentHash, multihash,hashs: null});
		}
	}
	dieOrlive({currentHash,multihash,hashs}){
		var page = undefined;
		if(!multihash){
			page = this.elements.find(element => element.hash === currentHash);
		}else{
			page = this.elements.find(element => element.hash === currentHash);
		}
		if(page == undefined && this.config.router)
		{
			this.elements.map(element=>element.$element.style['display'] = 'none');
			this.error404();
			throw "ERROR 404"
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
						if(hashs !== null){
							var hashelement = hashs.find(hash => element.hash === `${hash}`);
							if(!hashelement)
							{
								element.$element.style['display'] = 'none';
							}
						}else{
							element.$element.style['display'] = 'none';
						}
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
		if(hash === undefined) throw new Error('This method need a param Array or String'); 
		if(hash == '') this.fly(this.defaultHash);
		else{
			if(Array.isArray(hash))
			{
				var destinyHash = '';
				hash.map((hash, index)=>{
					hash = hash.split('#').join('');
					if(index == 0) destinyHash +=`#${hash}`;
					else destinyHash +=`&${hash}`;
				});
				window.location.hash = destinyHash;
			}else{
				hash = hash.split('#').join('');
				window.location.hash = `#${hash}`;  
			}
		}
	}
	addElement({$element,hash}){
		this.elements.push({$element,hash});
	}
	isHTMLElement(obj){
		try {
			//Using W3 DOM2 (works for FF, Opera and Chrome)
			return obj instanceof HTMLElement;
		}
		catch(e){
			//Browsers not supporting W3 DOM2 don't have HTMLElement and
			//an exception is thrown and we end up here. Testing some
			//properties that all elements have (works on IE7)
			return (typeof obj==="object") &&
			(obj.nodeType===1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument ==="object");
		}
	}
	dataBinding(){
		let $pegasus_fly = document.querySelectorAll('[pegasusfly]');
		$pegasus_fly.forEach($linkElement=>{
			let link = $linkElement.getAttribute('pegasusFly');
			$linkElement.addEventListener('click', ()=>{
				this.fly(link);
			})
		});
	}
}