function generateRandom(min = 1, max = 968777) {

	// find diff
	let difference = max - min;

	// generate random number 
	let rand = Math.random();

	// multiply with difference 
	rand = Math.floor(rand * difference);

	// add with min value 
	rand = rand + min;
	// console.log(rand);
	return rand;

}
// async function makeRequest() {
// 	try {
// 		const response = await fetch(`https://api.themoviedb.org/3/movie/${generateRandom()}/external_ids?api_key=04c35731a5ee918f014970082a0088b1`, { mode: 'no-cors' });
// 		if (response.status === 404) {
			
// 			makeRequest();
// 		}
// 		else{
// 			const data = response.json();
// 			console.log(data);
// 			user = data;
// 			// render();
// 		}
// 		console.log('status code: ', response.status); // 👉️ 200

// 		if (!response.ok) {
// 			console.log(response);
// 			throw new Error(`Error! status: ${response.status}`);
// 		}

// 		const result = await response.json();
// 		return result;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }




  async function makeRequest() {
	try {
	  const response = await fetch('https://www.themoviedb.org/movie/1',{mode:'no-cors'});
  
	  console.log('response.status: ', response.status); // 👉️ 200
	  console.log(response);
  
	} catch (err) {
	  console.log(err);
	}
  }


async function cargarFile(filename) {
	try {

		const res = await fetch(filename);
		return res.json()

	} catch (error) {
		console.log(error);
	}

}

function htmlNewsegment(user) {
	//template

	return `<div class="user">
	<img src="${user.profileURL}" >
	<h2>${user.firstName} ${user.lastName}</h2>
	<div class="email"><a href="email:${user.email}">${user.email}</a></div>
	</div>`;

}

async function render() {

	//.....
	let html = '';



	html += htmlNewsegment(user)


	let container = document.querySelector('.container')
	container.innerHTML = html;

}

makeRequest();
	// cargarTexto("./demotext.json");