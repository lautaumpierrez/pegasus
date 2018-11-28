const elements = [
	{
		$element: document.getElementById('hello'),
		hash: '#hello'
	},{
		$element: document.getElementById('holas'),
		hash: '#holas'
	}
]
const pegasus = new Pegasus('#holas');
pegasus.saddle(elements);

