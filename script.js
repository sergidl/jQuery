// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let query = `
query ($id: Int, $search: String) {
  Media (id: $id, type: ANIME, search: $search) {
	id
	title {
	  romaji
	  english
	  native
	}
	coverImage {
		extraLarge
	}
	startDate{
		year
		month
		day
	}
	description
  }
}
`;


//random request
async function makeRandomRequest() {
	try {

		let html = '';
		const response = await fetch('https://graphql.anilist.co', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: { id: Math.floor(Math.random() * 148266) + 1 }
			})

		});

		if (response.status != 200) {
			makeRandomRequest();
		}
		else {
			let buttons = document.querySelector('.container');
			buttons.style.display = 'none';
			const data = await handleResponse(response);
			handleData(data);
			html += `<div class="card"><div class="wrapper"> ${htmlNewsegment(data.data.Media)}  </div></div>`;
			let container = document.querySelector('.row')
			container.innerHTML += html;
			let e = document.querySelector(`.wrapper`);
			e.style.background = `url(${data.data.Media.coverImage.extraLarge}) center/cover no-repeat`

		}

	} catch (err) {
		console.log(err);
	}
}



//id request
async function makeNameRequest() {
	let title = prompt('Title: ');
	try {

		let html = '';
		const response = await fetch('https://graphql.anilist.co', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: {search: title}
			})

		});
		if (response.status != 200) {
			makeNameRequest();
		}
		else {
			let buttons = document.querySelector('.container');
			buttons.style.display = 'none';
			const data = await handleResponse(response);
			handleData(data);
			html += `<div class="card"><div class="wrapper"> ${htmlNewsegment(data.data.Media)}  </div></div>`;
			let container = document.querySelector('.row')
			container.innerHTML += html;
			let e = document.querySelector(`.wrapper`);
			e.style.background = `url(${data.data.Media.coverImage.extraLarge}) center/cover no-repeat`

		}

	} catch (err) {
		console.log(err);
	}
}















function handleResponse(response) {
	return response.json().then(function (json) {
		return response.ok ? json : Promise.reject(json);
	});
}

function handleData(data) {
	console.log(data);
}

//month number to month name
function monthNumberToName(month) {
	switch (month) {
		case 1:
			return 'January';
		case 2:
			return 'February';
		case 3:
			return 'March';
		case 4:
			return 'April';
		case 5:
			return 'May';
		case 6:
			return 'June';
		case 7:
			return 'July';
		case 8:
			return 'August';
		case 9:
			return 'September';
		case 10:
			return 'October';
		case 11:
			return 'November';
		case 12:
			return 'December';
		default:
			return 'Invalid month';
	}
}



function htmlNewsegment(data) {
	return `<div class="date">
	<span class="day">${data.startDate.day}</span>

	<span class="month">${monthNumberToName(data.startDate.month)}</span>
	<span class="year">${data.startDate.year}</span>
</div>
<div class="data">
	<div class="content">
		<h1 class="title"><a href="https://anilist.co/anime/${data.id}">${data.title.romaji}</a></h1>
		<p class="text">${data.description}</p>
		<label for="show-menu" class="menu-button"><span></span></label>
	</div>
</div>`;

}