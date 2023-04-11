const container = document.querySelector('.container'),
	size = document.querySelector('#size'),
	gapSlider = document.querySelector('#gap');

let spanBg = '#1e1f26',
	shape = 'square',
	mode = 'draw',
	color = 'ff0000',
	singeleColor = false,
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

			row.appendChild(span);
		}
		container.appendChild(row);
	}
}

createGrid();