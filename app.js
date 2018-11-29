window.onload=()=>{
	const elements = [
		{
			$element: document.getElementById('hello'),
			hash: '#hello',
			callback:()=>{
				alert("adios");
			}
		},{
			$element: document.getElementById('holas'),
			hash: '#holas',
		}
	]
	const config = {
		router: true,
		template404: document.getElementById('404Template')
	};
	const pegasus = new Pegasus({config,defaultHash:'#holas'});
	pegasus.saddle(elements);
}