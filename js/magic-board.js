const container = document.querySelector('.container'),
	size = document.querySelector('#size'),
	gapSlider = document.querySelector('#gap'),
	modeBtn = document.querySelector('#mode'),
	shapeBtn = document.querySelector('#shape'),
	colorBtn = document.querySelector('#color'),
	colorPicker = document.querySelector('#color-picker'),
	randomBtn = document.querySelector('#reandom-color'),
	clearBtn = document.querySelector('#clear');

let spanBg = '#1e1f26',
	shape = 'circle', //circle, triangle, diamond
	mode = 'draw',
	color = 'ff0000',
	singelColor = false,
	colors = [
		'#ff0000',
		'#ff4000',
		'#ff8000',
		'#ffbf00',
		'#ffff00',
		'#bfff00',
		'#80ff00',
		'#40ff00',
		'#00ff00',
		'#00ff40',
		'#00ff80',
		'#00ffbf',
		'#00ffff',
		'#00bfff',
		'#0080ff',
		'#0040ff',
		'#0000ff',
		'#4000ff',
		'#8000ff',
		'#bf00ff',
		'#ff00ff',
		'#ff00bf',
		'#ff0080',
		'#ff0040',
		'#ff0000',
	];

function createGrid() {
	container.innerHTML = '';
	const containerWidth = container.offsetWidth;
	const containerHeight = container.offsetHeight;
	const spanWidth = parseInt(size.value);
	const spanHeight = parseInt(size.value);
	const gap = parseInt(gapSlider.value);

	// calc the number of columns anr rows to fill the container

	const colums = Math.round(containerWidth / (spanWidth + gap));
	const rows = Math.round(containerHeight / (spanHeight + gap));

	// Create span elements and add to container

	for (let i = 0; i < rows; i++) {
		const row = document.createElement('div');
		row.classList.add('row');

		for (let i = 0; i < colums; i++) {
			const span = document.createElement('span');
			span.style.width = `${spanWidth}px`;
			span.style.height = `${spanHeight}px`;
			span.style.margin = `${gap / 2}px`;
			span.style.backgroundColor = spanBg;

			if (shape === 'circle') {
				span.style.borderRadius = '50%';
			}

			if (shape === 'triangle') {
				span.style.width = 0;
				span.style.backgroundColor = 'transparent';
				span.style.borderLeft = `${spanWidth / 2}px solid transparent`;
				span.style.borderRight = `${spanWidth / 2}px solid transparent`;
				span.style.borderBottom = `${spanHeight}px solid ${spanBg}`;
			}

			if (shape === 'diamond') {
				span.style.transform = 'rotate(45deg)';
			}

			row.appendChild(span);
		}
		container.appendChild(row);
	}
}

createGrid();

// Resizing grid on full window screen

function resizeingGrid() {
	createGrid();
}

// window.addEventListener('resize', () => {
// 	createGrid();
// });

// // mose suport

// document.addEventListener('mousedown', function () {
// 	document.addEventListener('mousemove', mouseMoveHandler);
// });

// document.addEventListener('mouseup', function () {
// 	document.removeEventListener('mousemove', mouseMoveHandler);
// });

// // TOUCH SUPORT

// document.addEventListener('touchstart', function () {
// 	document.addEventListener('touchmove', touchMoveHandle);
// });

// document.addEventListener('touchend', function () {
// 	document.removeEventListener('touchmove', touchMoveHandle);
// });

function touchMoveHandle(e) {
	// get the touch coordinates
	let touch = e.touches[0];
	let targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
	if (targetElement.tagName === 'SPAN') {
		if (mode === 'draw') {
			draw(targetElement);
		} else {
			erase(targetElement);
		}
	}
}

function mouseMoveHandler(e) {
	const target = e.target;
	if (target.tagName === 'SPAN') {
		// draw(target);
		// erise function
		if (mode === 'draw') {
			draw(target);
		} else {
			erase(target);
		}
	}
}

function draw(target) {
	// if single color on use that color only else generate random color and user
	let randomColor = singelColor
		? color
		: colors[Math.floor(Math.random() * colors.length)];

	if (shape === 'square' || shape === 'circle' || shape === 'diamond') {
		target.style.backgroundColor = randomColor;
	}

	if (shape === 'triangle') {
		const spanHeight = parseInt(size.value);
		target.style.borderBottom = `${spanHeight}px solid ${randomColor}`;
	}

	//  add glowing efekt

	if (shape !== 'triangle') {
		target.style.boxShadow = `0 0 2px ${randomColor}, 0 0 10px ${randomColor}`;
		// efect I realy like createx by acident
		// target.style.boxShadow = `0 0 2pc ${randomColor}, 0 0 10pc ${randomColor}`
	}
}

function erase(target) {
	if (shape === 'square' || shape === 'circle' || shape === 'diamond') {
		target.style.backgroundColor = spanBg;
	}

	if (shape === 'triangle') {
		const spanHeight = parseInt(size.value);
		target.style.borderBottom = `${spanHeight}px solid ${spanBg}`;
	}
	target.style.boxShadow = 'none';
}

function drawToggleErise() {
	mode = mode === 'draw' ? 'erise' : 'draw';
	modeBtn.textContent = mode;
}



// modeBtn.addEventListener('click', () => {
// 	// if its draw make it erase or vice versa
// 	mode = mode === 'draw' ? 'erise' : 'draw';
// 	modeBtn.textContent = mode;
// });

function toChangeShape() {
	const shapes = ['square', 'circle', 'triangle', 'diamond'];
	const index = shapes.indexOf(shape);
	if (index < shapes.length - 1) {
		shape = shapes[index + 1];
	} else {
		shape = shapes[0];
	}
	shapeBtn.textContent = shape;
	createGrid();
}



colorBtn.addEventListener('click', () => {
	colorPicker.click();
});

colorPicker.addEventListener('change', (e) => {
	color = e.target.value;
	colorBtn.style.backgroundColor = color;

	// turn on single color
	singelColor = true;
});

// use rabdim color on random btn by click

function setRadomColor() {
	singelColor = false;
	colorBtn.style.backgroundColor = '#111111'; 
}

function setSizeOfTheGeometricFigure () {
	createGrid();
}

function setGapeBetweenGeometricFigure() {
	createGrid();
}




function clear() {
	// lets add a tranisition on clear
	const spans = document.querySelectorAll('span');
	spans.forEach((span) => {
		draw(span);
		//  TO   CHANGE!!!!!!!!!!!!!!!!!!!!!
		setTimeout(() => {
			erase(span);
		}, 200);
	});
}

modeBtn.addEventListener('click', drawToggleErise);

shapeBtn.addEventListener('click', toChangeShape);

randomBtn.addEventListener('click', setRadomColor);

size.addEventListener('input', setSizeOfTheGeometricFigure);

gapSlider.addEventListener('input', setGapeBetweenGeometricFigure);


// 

window.addEventListener('resize', resizeingGrid);

clearBtn.addEventListener('click', clear);



// mose suport

document.addEventListener('mousedown', function () {
	document.addEventListener('mousemove', mouseMoveHandler);
});

document.addEventListener('mouseup', function () {
	document.removeEventListener('mousemove', mouseMoveHandler);
});

// TOUCH SUPORT

document.addEventListener('touchstart', function () {
	document.addEventListener('touchmove', touchMoveHandle);
});

document.addEventListener('touchend', function () {
	document.removeEventListener('touchmove', touchMoveHandle);
});
