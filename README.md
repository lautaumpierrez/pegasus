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

##### navigate to another hash
```javascript
const pegasus = new Pegasus('#home');
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
const pegasus = new Pegasus('home');
pegasus.saddle(elements);

$btnHome = document.getElementById('goToHome');
$btnAbout = document.getElementById('goToAbout');
$btnHome.addEventListener('click',()=>pegasus.fly('home'));
$btnAbout.addEventListener('click',()=>pegasus.fly('about'));
```