class Pegasus{
	constructor({ router,config,baseURL, defaultRoute, defaultHash,$container }){
		if(router)
			return new PegasusRouter({config, defaultRoute,baseURL, $container});
		else
			return new PegasusHasher({config, defaultHash, $container});
	}
}

class PegasusHasher {
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
		window.addEventListener('hashchange',()=>this.changeUrl());
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

class PegasusRouter {
	constructor({config, defaultRoute, baseURL,$container}){
		if(config === undefined) throw new Error('Need config Prop');
		if(defaultRoute === undefined) throw new Error('Need defaultRoute Prop');
		if($container === undefined) throw new Error('Need $container Prop');
		if(baseURL == undefined) throw new Error('Need baseURL Prop');
		this.config = config;
		this.defaultRoute = defaultRoute;
		this.$container = $container;
		if(window.location.hash == ''){
			window.history.pushState({},'prueba',baseURL+'/');
			window.location.hash = '#/';
		}
	}
	saddle(elements=[]){
		if(window.location.hash == undefined)
			window.location.hash = this.defaultRoute;
		this.$container.innerHTML ='';
		this.elements = [];
		elements.map((item)=>{
			let route = item.route;
			route = route.split('#').join('');
			if(item.callback == null)
				item.callback = ()=>{};
			if(this.isHTMLElement(item.$element))
			{
				this.elements.push({
					route,
					$element: item.$element.cloneNode(true),
					callback: item.callback
				});
			}else{
				this.elements.push({
					route,
					$element: item.$element,
					callback: item.callback
				});
			}
		});
		this.listenRoute();
		this.changeRoute();
	}
	listenRoute(){
		window.addEventListener('hashchange',()=>this.changeRoute());
	}
	changeRoute(){
		let currentRoute = window.location.hash;
		currentRoute=currentRoute.split('#').join('');
		this.dieOrlive(currentRoute);
	}
	dieOrlive(currentRoute){
		this.$container.innerHTML = '';
		let $element = this.elements.find(element=>element.route == currentRoute);
		if($element != undefined){
			if(this.isHTMLElement($element.$element))
				this.$container.appendChild($element.$element);
			else
				this.$container.innerHTML += $element.$element;
			if($element.callback == null)
				$element.callback = ()=>{};
			$element.callback();
		}else{
			let $element404 = this.elements.find(el=> el.route == '*');
			if($element404){
				if(this.isHTMLElement($element404.$element)){
						this.$container.appendChild($element404.$element);
				}else{
					this.$container.innerHTML = $element404.$element;
				}
			}
		}

	}
	Page({template, route, action}){
		this.addRoute({
			$element: template,
			route: route,
			callback: action,
		});
	}
	dataBinding(){
		let $pegasus_fly = document.querySelectorAll('[pegasusfly]');
		$pegasus_fly.forEach($linkElement=>{
			let link = $linkElement.getAttribute('pegasusFly');
			link = link.split('/').join('');
			$linkElement.addEventListener('click', ()=>{
				this.fly(`/${link}`);
			})
		});
	}
	addRoute(element){
		if(element.callback == null)
			element.callback = ()=>{};
		if(this.isHTMLElement(element.$element))
		{
			this.elements.push({
				route: element.route,
				$element: element.$element.cloneNode(true),
				callback: element.callback
			});
		}else{
			this.elements.push({
				route: element.route,
				$element: element.$element,
				callback: element.callback
			});
		}
		this.saddle(this.elements);
	}
	go(position){
		if(position == undefined) throw new Error('Error, the position is an a number for example -1');
		window.history.go(position);
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
}
