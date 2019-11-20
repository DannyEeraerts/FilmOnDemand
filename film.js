
const inputTitle = document.querySelector(".input-title");
let inputTitleValue = inputTitle.value;
const btn = document.querySelector("#btn");
const firstPartHttpLink = "http://www.omdbapi.com/?";
const lastPartHttpLink = "&apikey=6c20b2bc";
const template = document.getElementById("movieTemplate");
const target = document.querySelector("#target");
console.log(target);

function searchFilm(){

	axios.get(firstPartHttpLink + "t=" + inputTitleValue + lastPartHttpLink)
	.then(response => {
			
		let result = response.data;
		/* console.log(result);
		console.log(result.Poster);
		console.log(result.Title);
		console.log(result.Genre);
		console.log(result.Runtime);
		console.log(result.Country);
		console.log(result.Released);
		console.log(result.Language);
		console.log(result.Plot);
		console.log(result.Director);
		console.log(result.Actors); */

		//console.log(template);
		var tmpl = template.content.cloneNode(true);
		//console.log(tmpl);
		tmpl.querySelector('.moviePoster').src = result.Poster;
		//console.log(tmpl.querySelector('.moviePoster').src);
		tmpl.querySelector('.title').innerText = result.Title;
		//console.log(tmpl.querySelector('.title').innerText);
		tmpl.querySelector('.movieDirector').innerHTML = "<span class='font-weight-bold'>Director:</span>" + " " + result.Director;
		tmpl.querySelector('.movieActors').innerHTML = "<span class='font-weight-bold'>Actors:</span>" + " " + result.Actors;
		tmpl.querySelector('.movieShortContent').innerHTML = "<span class='font-weight-bold'>Short content:</span>" + " " + result.Plot;
		tmpl.querySelector('.movieGenre').innerHTML = "<span class='font-weight-bold'>Genres:</span>" + " "  + result.Genre;
		tmpl.querySelector('.movieDuration').innerHTML = "<span class='font-weight-bold'>Duration:</span>" + " " + result.Runtime;
		tmpl.querySelector('.movieCountry').innerHTML = "<span class='font-weight-bold'>Recording country:</span>" + " " + result.Country;
		tmpl.querySelector('.movieReleaseDate').innerHTML = "<span class='font-weight-bold'>Release Date:</span>" + " " + result.Released;
		//console.log(tmpl.querySelector('.movieReleaseDate').innerText);
		tmpl.querySelector('.movieLanguage').innerHTML = "<span class='font-weight-bold'>Spoken language:</span>" + " " +result.Language;
		//console.log(tmpl.querySelector('.movieLanguage').innerText);
		
		//console.log(tmpl.querySelector('.movieShortContent').innerText);
		
		//console.log(tmpl.querySelector('.movieActors').innerText);
		//console.log(tmpl);
		target.appendChild(tmpl);
		})
	.catch(error => {
			console.log("This film is not found , please try again");
	});  
}

	/* function clearTarget(){
		document.querySelector('.target').innerHTMl = "";
	} */

	function checkInput(){
		console.log(inputTitle.value);
		console.log(inputTitleValue.length);
		/* if (inputTitleValue.length <= 0) {
				console.log("target wordt leeggemaakt");
				clearTarget;
		} */
	}

	//inputTitle.addEventListener("input", checkInput);
	//inputTitle.addEventListener("blur", checkInput)
	btn.addEventListener("click", searchFilm);
	
		
		
	

