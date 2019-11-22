
//input-variabel-search-one
const inputTitle = document.querySelector(".input-title");
var inputTitleValue = inputTitle.value;
// input-variabel-search-one
const inputTitlePart = document.querySelector(".input-title-part");
var inputTitlePartValue = inputTitlePart.value;
// button variabels
const btn = document.querySelector("#btn");
const btn2 = document.querySelector("#btn2");
// parts of the Link variabels
const firstPartHttpLink = "http://www.omdbapi.com/?";
const lastPartHttpLink = "&apikey=6c20b2bc";
// templates variabels
const template = document.getElementById("movieTemplate");
const template2 = document.getElementById("movieTemplate2");
// target variabels
const target = document.querySelector("#target");
const target2 = document.querySelector("#target2");
// variabele for copywrite year
let htmlYear = document.querySelector("#htmlYear");
let year = new Date().getFullYear();

htmlYear.textContent = year;
//console.log(target);

function searchFilm(inputTitleValue){
	
	//clear result
	clearTarget();
	console.log(inputTitleValue);
	axios.get(firstPartHttpLink + "t=" + inputTitleValue + lastPartHttpLink)
	.then(response => {	
		let result = response.data;
		console.log(result);

		//build template one
		buildtemplate(result);
		})
	.catch(error => {
		//catch error
			console.log("This film is not found , please try again");
	});
	// disabel submit button
	btn.disabled = true; 
}

function searchFilm2(inputTitlePartValue){

		clearTarget2();
		//var inputTitlePartValue = inputTitlePart.value;
		console.log(inputTitlePartValue);
		axios.get(firstPartHttpLink + "s=" + inputTitlePartValue + lastPartHttpLink)
		.then(response => {
			let result2 = response.data;
			console.log(result2);
			let length = result2.Search.length;
			buildtemplate2(result2, length);
	
			})
		.catch(error => {
			console.log("This film is not found , please try again");
		});
	}

	function buildtemplate(result){
		var tmpl = template.content.cloneNode(true);
		tmpl.querySelector('.moviePoster').src = result.Poster;
		tmpl.querySelector('.title').innerText = result.Title;
		tmpl.querySelector('.movieDirector').innerHTML = "<span class='font-weight-bold'>Director:</span>" + " " + result.Director;
		tmpl.querySelector('.movieActors').innerHTML = "<span class='font-weight-bold'>Actors:</span>" + " " + result.Actors;
		tmpl.querySelector('.movieShortContent').innerHTML = "<span class='font-weight -bold'>Short content:</span>" + " " + result.Plot;
		tmpl.querySelector('.movieGenre').innerHTML = "<span class='font-weight-bold'>Genres:</span>" + " "  + result.Genre;
		tmpl.querySelector('.movieDuration').innerHTML = "<span class='font-weight-bold'>Duration:</span>" + " " + result.Runtime;
		tmpl.querySelector('.movieCountry').innerHTML = "<span class='font-weight-bold'>Recording country:</span>" + " " + result.Country;
		tmpl.querySelector('.movieReleaseDate').innerHTML = "<span class='font-weight-bold'>Release Date:</span>" + " " + result.Released;
		tmpl.querySelector('.movieLanguage').innerHTML = "<span class='font-weight-bold'>Spoken language:</span>" + " " +result.Language;
		target.appendChild(tmpl);
	}

	function buildtemplate2(result2, length){
		for(i=0; i<length ;i++){
			var tmpl2 = template2.content.cloneNode(true);
			console.log("template2");
			//console.log(tmpl2);
			console.log(result2.Search[i].Poster);
			if (result2.Search[i].Poster == "N/A"){
				tmpl2.querySelector('.moviePoster').src = "Image-not-available.jpg";
			} 
			else{
				tmpl2.querySelector('.moviePoster').src = result2.Search[i].Poster;
			}
			tmpl2.querySelector('.moviePoster').setAttribute("class", "poster"); 
			//console.log(tmpl2.querySelector('.moviePoster').src);
			tmpl2.querySelector('.title').innerText = result2.Search[i].Title;
			//console.log(result2.Search[i].Title);
			//console.log(tmpl2.querySelector('.title').innerText);
			target2.appendChild(tmpl2);
		}
	}

	function refresh(){
		var inputTitleValue = inputTitle.value;
		searchFilm(inputTitleValue);
	}

	function refresh2(){
		var inputTitlePartValue = inputTitlePart.value;
		searchFilm2(inputTitlePartValue);
	}

	function searchClickedMovie(event){
		var poster = event.target.closest(".poster");
		console.log(poster);
		inputTitleValue = poster.parentNode.nextElementSibling.firstElementChild.innerText;
		searchFilm(inputTitleValue);
	}	
	
	function clearTarget(){
		//console.log("target wordt leeggemaakt");
		//console.log(document.querySelector('#target'));
		document.querySelector('#target').innerHTML = "";
	}

	function clearTarget2(){
		//console.log("target wordt leeggemaakt");
		//console.log(document.querySelector('#target'));
		document.querySelector('#target2').innerHTML = "";
	}

	function checkInput(){
		//console.log("test");
		console.log(inputTitle.value);
		//console.log(inputTitle.value.length);
		
		if (inputTitle.value.length <= 0) {
			clearTarget();
		}
		else{
			btn.disabled = false;
		}
	}

	inputTitle.addEventListener("input", checkInput);
	inputTitle.addEventListener("blur", checkInput);
	inputTitlePart.addEventListener("input", checkInput);
	inputTitlePart.addEventListener("blur", checkInput);
	btn.addEventListener("click", refresh);
	btn2.addEventListener("click", refresh2);
	target2.addEventListener("click", searchClickedMovie);
	
	test();
		
	function test(){

		/* axios.get("https://api.themoviedb.org/3/person?api_key=123e8de41103fbaabc178ff9d89ea8dd&query=tom%20hanks")*/

		/*http://api.tmdb.org/3/search/person?api_key=KEY&query=tom%20hanks*/

		axios.get("https://api.themoviedb.org/3/movie/550?api_key=123e8de41103fbaabc178ff9d89ea8dd")


		.then(response => {
			let testresult = response.data;
			console.log(testresult);
	
			})
		.catch(error => {
			console.log("This film is not found , please try again");
		});
	}


