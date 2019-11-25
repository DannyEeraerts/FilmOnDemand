const items = document.querySelectorAll(".nav-item");
console.log(items);
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
const target3 = document.querySelector("#target3");
// variabele for copywrite year
const htmlYear = document.querySelector("#htmlYear");
let year = new Date().getFullYear();
//error
const errorText = document.querySelector(".error");
const errorText2 = document.querySelector(".error2");




htmlYear.textContent = year;
//console.log(target);

function toggleActiveClass(){
	let current = document.querySelector(".active");
	current.classList.remove("active");
	if (event.target.nodeName === "A") {
		this.className += " active";// add active to selected nav
	}
	else {
		x = this.parentNode.nextElementSibling.id ;
			if (x === ""){
				xlink = "#".concat("intro");
			}
			else{
				xlink = "#".concat(x);}
		y = document.querySelector(".item[href='"+xlink+"']");
		y.className +=" active";
	}
}

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
		makeModal();
		
		})
	.catch(error => {
		//catch error
			errorText.textContent= "This title is not found , please try again";

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
			errorText2.textContent= "To many result, please be more specific and try again";
		});
	}

	function buildtemplate(result){
		var tmpl = template.content.cloneNode(true);

		if (result.Poster == "N/A"){
			tmpl.querySelector('.moviePoster').src = "Image-not-available.jpg";
		} 
		else{
			tmpl.querySelector('.moviePoster').src = result.Poster;
		}
		tmpl.querySelector('.title').innerText = result.Title;
		let directorsString = result.Director;
		let directors = directorsStringToActorsArrayAndBack(directorsString);
		tmpl.querySelector('.movieDirector').innerHTML = "<span class='font-weight-bold'>Director:</span>" + " " + directors;
		let actorsString = result.Actors;
		let actors = actorsStringToActorsArrayAndBack(actorsString);
		tmpl.querySelector('.movieActors').innerHTML = "<span class='font-weight-bold' data-toggle='modal' data-target='#exampleModal'>Actors:</span>" + " " + actors;
		tmpl.querySelector('.movieShortContent').innerHTML = "<span class='font-weight-bold'>Short content:</span>" + " " + result.Plot;
		tmpl.querySelector('.movieGenre').innerHTML = "<span class='font-weight-bold'>Genres:</span>" + " "  + result.Genre;
		tmpl.querySelector('.movieDuration').innerHTML = "<span class='font-weight-bold'>Duration:</span>" + " " + result.Runtime;
		tmpl.querySelector('.movieCountry').innerHTML = "<span class='font-weight-bold'>Recording country:</span>" + " " + result.Country;
		tmpl.querySelector('.movieReleaseDate').innerHTML = "<span class='font-weight-bold'>Release Date:</span>" + " " + result.Released;
		tmpl.querySelector('.movieLanguage').innerHTML = "<span class='font-weight-bold'>Spoken language:</span>" + " " +result.Language;
		target.appendChild(tmpl);

	}

	function directorsStringToActorsArrayAndBack(directorsString){
		var arrayOfDirectors = directorsString.split(", ");
		let numberOfDirectors = arrayOfDirectors.length;
		let directorsNewString= "";
		for (let i=0; i<numberOfDirectors;i++){
			directorsNewString += `<span class= "director${i}">${arrayOfDirectors[i]}</span>`
			if(i< (numberOfDirectors -1 )){
				directorsNewString += ", "}
		}
		return directorsNewString;
	}

	function actorsStringToActorsArrayAndBack(actorsString){
		arrayOfActors = actorsString.split(", ");
		console.log(arrayOfActors[0]);
		let numberOfActors = arrayOfActors.length;
		let actorsNewString= "";
		for (let i=0; i<numberOfActors;i++){
			actorsNewString += `<span class= "actor${i}">${arrayOfActors[i]}</span>`
			if(i< (numberOfActors -1 )){ 
				actorsNewString += ", "}
		}
		return actorsNewString;
	}

	function buildtemplate2(result2, length){
		for(i=0; i<length ;i++){
			var tmpl2 = template2.content.cloneNode(true);
			console.log("template2");
			//console.log(tmpl2);
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

	function makeModal(){
		// Get modal elements
		var modal = document.querySelector('.my-modal');
		var modalBtn = document.querySelector('.actor0');
		var closeBtn = document.querySelector('.close');
		// Events
		modalBtn.addEventListener('click', openModal);
		closeBtn.addEventListener('click', closeModal);
		window.addEventListener('click', outsideClick);
		// Open
		function openModal() {
			modal.style.display = 'block';
			const actorNameInModal = document.querySelector(".actorNameModal");
			let actorString = arrayOfActors[0];
			let otherMovies = searchOtherMoviesOfThisActor(actorString);
			actorNameInModal.textContent = arrayOfActors[0];
		}
		// Close
		function closeModal() {
			modal.style.display = 'none';
		}
		// Close If Outside Click
		function outsideClick(e) {
			if (e.target == modal) {
				modal.style.display = 'none';
			}
		}
	}

	function searchOtherMoviesOfThisActor(actorString){
		let actorNamesArray = actorString.split(" ");
		let newActorListString= "";
		let actorListLength = actorNamesArray.length;
		for (let i=0; i<actorListLength; i++){
			if(i< (actorListLength -1 )){
				newActorListString += actorNamesArray[i] + "%20";
			} else{
				newActorListString += actorNamesArray[i];
			}
		}
		console.log(newActorListString);
		console.log("actor name hieboven");
		axios.get("http://api.tmdb.org/3/search/person?api_key=123e8de41103fbaabc178ff9d89ea8dd&query="+newActorListString)
		.then(response => {
			let extraMovies = response.data;
			let length = (extraMovies.results[0].known_for.length);
			let list = document.getElementsByClassName("alternativeMovie");
			let parent = list.parent;
		  if (list.lenght != 0){
				for (let i=1; i=list.length; i++){
					parent[i].removeChild(parent.childNodes[i]);
				}
				console.log(list[0]);
			} 
			for (let i=0; i<length; i++){
				const template3 = document.getElementById("otherMovieTemplate");
				var tmpl3 = template3.content.cloneNode(true);
				tmpl3.querySelector('li').setAttribute("class", "alternativeMovie");
				tmpl3.querySelector('li').innerText = extraMovies.results[0].known_for[i].title;
				target3.appendChild(tmpl3);
			}
		})
		.catch(error => {
			console.log("This film is not found , please try again");
		});
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

	function checkInput2(){
		//console.log("test");
		console.log(inputTitlePart.value);
		//console.log(inputTitle.value.length);
		
		if (inputTitlePart.value.length <= 0) {
			clearTarget();
		}
		else{
			btn.disabled = false;
		}
	}

	inputTitle.addEventListener("input", checkInput);
	inputTitle.addEventListener("blur", checkInput);
	inputTitlePart.addEventListener("input", checkInput2);
	inputTitlePart.addEventListener("blur", checkInput2);
	btn.addEventListener("click", refresh);
	btn2.addEventListener("click", refresh2);
	target2.addEventListener("click", searchClickedMovie);
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener("click", toggleActiveClass);
	}


















	test();
		
	function test(){

		/* axios.get("https://api.themoviedb.org/3/person?api_key=123e8de41103fbaabc178ff9d89ea8dd&query=tom%20hanks")*/

		/*http://api.tmdb.org/3/search/person?api_key=KEY&query=tom%20hanks*/

		axios.get("http://api.tmdb.org/3/search/person?api_key=123e8de41103fbaabc178ff9d89ea8dd&query=steven%20spielberg")
		

		.then(response => {
			let testresult = response.data;
			console.log(testresult);
			let length = (testresult.results[0].known_for.length);
			for (let i=0; i<length; i++){
			console.log(testresult.results[0].known_for[i].title);}
	
			})
		.catch(error => {
			console.log("This actor is not found , please try again");
		});
	}
