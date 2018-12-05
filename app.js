window.onload=()=>{
	const elements = [
		{
			$element: document.getElementById('home'),
			hash: 'Home',
		},{
			$element: document.getElementById('contacto'),
			hash: 'Contacto',
		},{
			$element: document.getElementById('example-modal'),
			hash:'example-modal',
		}
	]
	const config = {
		router: true,
		multihash: true,
		template404: document.getElementById('404Template')
	};
	const $container = document.getElementById('container');
	const pegasus = new Pegasus({config,$container,defaultHash:'#Home'});
	window.pegasus = pegasus;
	pegasus.saddle(elements);
	// Events	
	document.querySelector('.close-pegasus-modal-bg').addEventListener('click',()=>hideModal());
	document.querySelector('.close-pegasus-modal-cross').addEventListener('click',()=>hideModal());
	document.getElementById('navbar-burger').addEventListener('click', ()=>{
		document.getElementById('navbar-menu').classList.toggle('is-active');
		document.getElementById('navbar-burger').classList.toggle('is-active');
	});
	const hideModal = ()=>{
		let $pegasus_modal = document.querySelector('.pegasus-modal');
		$pegasus_modal.classList.remove('animated', 'fadeInDown');
		$pegasus_modal.classList.add('animated', 'fadeOutUp', 'faster');
		setTimeout(()=>{
			pegasus.fly('');
			$pegasus_modal.classList.remove('animated', 'fadeOutUp', 'faster');
			$pegasus_modal.classList.add('animated', 'fadeInDown');
		},500);
	}
}

