# Hash Router for simple components for example show section when the hash in url is pets or about...

The use is very simple, for example:

###### app.js
```javascript
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
```
###### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>PEGASUS EXAMPLE</title>
</head>
<body>
	<div id="hello">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam praesentium tempora labore at, eos, distinctio autem, culpa id assumenda consequatur a architecto quod dolore illo ex blanditiis iusto reiciendis.</p>
	</div>
	<div id="holas">
		<strong>Buenas tardes &#x1F60E;</strong>
	</div>
	<!-- add the pegasus source code -->
	<script type="text/javascript" src="./pegasus.js"></script>
	<!-- add your script -->
	<script src="./app.js"></script>
</body>
</html>
```

