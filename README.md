# Hash Router with components for example show section when the hash in url is pets or about...

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
const pegasus = new Pegasus({config:{router:false},defualtHash'#holas'});
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

##### navigate to another hash
```javascript
const pegasus = new Pegasus({config:{router:false},defualtHash'#home'});
pegasus.saddle(elements);

// for go to another use the method fly
pegasus.fly('#hash') // or without # the result is equal
```
Example with button
###### HTML
```html
<div id="home">
	<h2>This is the Home</h2>
</div>
<div id="about">
	<h2>This is the about</h2>
</div>
<button id="goToAbout">About</button>
<button id="goToHome">Home</button>
```
###### JS
```javascript
let Home = document.getElementById('home');
let About = document.getElementById('About');
const elements =[
	{$element: Home, hash:'#home'},
	{$element: About: hash: '#about'}
];
const pegasus = new Pegasus({config:{route:false},defaultHash:'home'});
pegasus.saddle(elements);

$btnHome = document.getElementById('goToHome');
$btnAbout = document.getElementById('goToAbout');
$btnHome.addEventListener('click',()=>pegasus.fly('home'));
$btnAbout.addEventListener('click',()=>pegasus.fly('about'));
```

For use it like a router follow this example
if you need use Pegasus like a router, you need set the config with the value router: true
and send the template for your 404 error.
###### JS - app.js
```javascript
	let Home = document.getElementById('home');
	let About = document.getElementById('About');
	const elements =[
		{$element: Home, hash:'#home'},
		{$element: About: hash: '#about'}
	];
	const config = {
		router: true,
		template404: document.getElementById('404template');
	};
	const pegasus = new Pegasus({config, defaultHash: 'Home'});
	pegasus.saddle(elements);
	$btnHome = document.getElementById('goToHome');
	$btnAbout = document.getElementById('goToAbout');
	$btnHome.addEventListener('click',()=>pegasus.fly('home'));
	$btnAbout.addEventListener('click',()=>pegasus.fly('about'));
		
```
###### HTML - index.html
```html
	<div id="home">
		<button id="goToAbout">About</button>
		<h2>This is the Home</h2>
	</div>
	<div id="about">
		<button id="goToHome">Home</button>
		<h2>This is the about</h2>
	</div>
	<div id="404template">
		<h2>this is the 404 template</h2>
	</div>
```
The elements / components has an a callback optional method, like this 
```javascript

	let Home = document.getElementById('home');
	let About = document.getElementById('About');
	const elements =[
		{$element: Home, hash:'#home', callback: ()=>{
			console.log('HOME ROUTE');
		}},
		{$element: About: hash: '#about'}
	];
	// After build the object ...
	pegasus.saddle(elements);


``` 