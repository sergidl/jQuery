// // async function makeRequest() {
// // 	try {
// // 		const response = await fetch(`https://api.themoviedb.org/3/movie/${generateRandom()}/external_ids?api_key=04c35731a5ee918f014970082a0088b1`, { mode: 'no-cors' });
// // 		if (response.status === 404) {

// // 			makeRequest();
// // 		}
// // 		else{
// // 			const data = response.json();
// // 			console.log(data);
// // 			user = data;
// // 			// render();
// // 		}
// // 		console.log('status code: ', response.status); // 👉️ 200

// // 		if (!response.ok) {
// // 			console.log(response);
// // 			throw new Error(`Error! status: ${response.status}`);
// // 		}

// // 		const result = await response.json();
// // 		return result;
// // 	} catch (err) {
// // 		console.log(err);
// // 	}
// // }




//   async function makeRequest() {
// 	try {
// 	  const response = await fetch('https://www.themoviedb.org/movie/1',{mode:'no-cors'});

// 	  console.log('response.status: ', response.status); // 👉️ 200
// 	  console.log(response);

// 	} catch (err) {
// 	  console.log(err);
// 	}
//   }


// async function cargarFile(filename) {
// 	try {

// 		const res = await fetch(filename);
// 		return res.json()

// 	} catch (error) {
// 		console.log(error);
// 	}

// }

// function htmlNewsegment(user) {
// 	//template

// 	return `<div class="user">
// 	<img src="${user.profileURL}" >
// 	<h2>${user.firstName} ${user.lastName}</h2>
// 	<div class="email"><a href="email:${user.email}">${user.email}</a></div>
// 	</div>`;

// }

// async function render() {

// 	//.....
// 	let html = '';



// 	html += htmlNewsegment(user)


// 	let container = document.querySelector('.container')
// 	container.innerHTML = html;

// }

// makeRequest();
// 	// cargarTexto("./demotext.json");

























































// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
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
			console.log('+++++++++++++++++++++++++++++++++++++++++')
			// console.log(response);
			console.log('+++++++++++++++++++++++++++++++++++++++++')
			if (response.status != 200) {
				// await new Promise(resolve => setTimeout(resolve, 100));
				makeRandomRequest();
			}
			else {

				const data = await handleResponse(response);
				handleData(data);
				// console.log(data.data.Media.title.romaji)
				html += `<div class="card"><div class="wrapper"> ${htmlNewsegment(data.data.Media)}  </div></div>`;
				let container = document.querySelector('.row')
				container.innerHTML += html;
				// document.querySelectorAll('.example-1 .wrapper').forEach(el => {
				// 	el.style.background = `url(${data.data.Media.coverImage.extraLarge}) center/cover no-repeat`
				// })



				let e = document.querySelector(`.wrapper`);
				e.style.background = `url(${data.data.Media.coverImage.extraLarge}) center/cover no-repeat`

			}
			// await new Promise(resolve => setTimeout(resolve, 5000));

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
//make request when the page is loaded
window.addEventListener('load', makeRandomRequest);