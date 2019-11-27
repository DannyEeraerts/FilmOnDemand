const items = document.querySelectorAll(".nav-item");
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
const firstPartHttpLink = "https://www.omdbapi.com/?";
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
		axios.get(firstPartHttpLink + "s=" + inputTitlePartValue + lastPartHttpLink)
		.then(response => {
			let result2 = response.data;
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
		let directors = directorsStringToDirectorsArrayAndBack(directorsString);
		tmpl.querySelector('.movieDirector').innerHTML = "<span class='font-weight-bold' data-toggle='modal' data-target='#exampleModal'>Director:</span>" + " " + directors;
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

	function directorsStringToDirectorsArrayAndBack(directorsString){
		var arrayOfDirectors = directorsString.split(", ");
		let numberOfDirectors = arrayOfDirectors.length;
		let directorsNewString= "";
		for (let i=0; i<numberOfDirectors;i++){
			directorsNewString += `<span class= "director${i} director">${arrayOfDirectors[i]}</span>`
			if(i< (numberOfDirectors -1 )){
				directorsNewString += ", "}
		}
		return directorsNewString;
	}

	function actorsStringToActorsArrayAndBack(actorsString){
		arrayOfActors = actorsString.split(", ");
		let numberOfActors = arrayOfActors.length;
		let actorsNewString= "";
		for (let i=0; i<numberOfActors;i++){
			actorsNewString += `<span class= "actor${i} actor">${arrayOfActors[i]}</span>`
			if(i< (numberOfActors -1 )){ 
				actorsNewString += ", "}
		}
		return actorsNewString;
	}

	function buildtemplate2(result2, length){
		for(i=0; i<length ;i++){
			var tmpl2 = template2.content.cloneNode(true);
			if (result2.Search[i].Poster == "N/A"){
				tmpl2.querySelector('.moviePoster').src = "Image-not-available.jpg";
			} 
			else{
				tmpl2.querySelector('.moviePoster').src = result2.Search[i].Poster;
			}
			tmpl2.querySelector('.moviePoster').setAttribute("class", "poster"); 
			tmpl2.querySelector('.title').innerText = result2.Search[i].Title;
			target2.appendChild(tmpl2);
		}
	}

	function makeModal(){
		// Get modal elements
		modal = document.querySelector('.my-modal');
		//var modalBtn = document.querySelector('.actor0');
		var closeBtn = document.querySelector('.close');
		var modalBtn = document.querySelector('.actorList');
		var modalBtn2 = document.querySelector('.directorList');

		// Events
		modalBtn.addEventListener('click', openModal);
		modalBtn2.addEventListener('click',openModal2);
		closeBtn.addEventListener('click', closeModal);
		window.addEventListener('click', outsideClick);
		// Open
		function openModal(event) {
			modal.style.display = 'block';
			const actorNameInModal = document.querySelector(".actorNameModal");
			var choosenActor = event.target.closest(".actor").textContent;
			console.log("this");
			console.log(choosenActor);
			//let actorString = arrayOfActors[0];
			let actorString = choosenActor;
			let otherMovies = searchOtherMoviesOfThisActor(actorString);
			console.log(otherMovies);
			//actorNameInModal.textContent = arrayOfActors[0];
			actorNameInModal.textContent = actorString;
		}
		// Close
		function closeModal(){
			modal.style.display = 'none';
		};
		
		// Close If Outside Click
		function outsideClick(e) {
			if (e.target == modal) {
				modal.style.display = 'none';
			}
		}
		function openModal2(event) {
			modal.style.display = 'block';
			const directorNameInModal = document.querySelector(".directorNameModal");
			var choosenDirector = event.target.closest(".director").textContent;
			console.log("this");
			console.log(choosenDirector);
			//let actorString = arrayOfActors[0];
			let directorString = choosenDirector;
			let otherMovies = searchOtherMoviesOfThisActor(directorString);
			console.log(otherMovies);
			//actorNameInModal.textContent = arrayOfActors[0];
			directorNameInModal.textContent = directorString;
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
		axios.get("https://api.tmdb.org/3/search/person?api_key=123e8de41103fbaabc178ff9d89ea8dd&query="+newActorListString)
		.then(response => {
			let extraMovies = response.data;
			//console.log(extraMovies);
			let id = extraMovies.results[0].id;
			let length = (extraMovies.results[0].known_for.length);
			let listCountlength = document.getElementsByClassName("alternativeMovie").length;
		  if (listCountlength> 0){
				let parent = document.getElementById("target3");
					parent.innerHTML = "";
			} 
			for (let i=0; i<length; i++){
				const template3 = document.getElementById("otherMovieTemplate");
				var tmpl3 = template3.content.cloneNode(true);
				tmpl3.querySelector('li').setAttribute("class", "alternativeMovie");
				tmpl3.querySelector('li').innerText = extraMovies.results[0].known_for[i].title;
				target3.appendChild(tmpl3);
			}
			biographyInfo(id);
			target3.addEventListener("click",newSearch);
		})
		.catch(error => {
			console.log("This film is not found , please try again");
		});
	}

	function newSearch(){
		modal.style.display = 'none';
		var movie = event.target.closest(".alternativeMovie");
		inputTitleValue = movie.innerText;
		searchFilm(inputTitleValue);
	}

	function biographyInfo(id){
		axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=123e8de41103fbaabc178ff9d89ea8dd`)
			.then(response => {
				let extraInfo = response.data;
				console.log(extraInfo);
				const bioInfo = document.querySelector(".bio");
				const birth = document.querySelector(".birth");
				const death = document.querySelector(".death");
				const place = document.querySelector(".place");
				const imageActor= document.querySelector(".imgActor");
				let imageSource= extraInfo.profile_path;
				imageActor.src =`https://image.tmdb.org/t/p/original/${imageSource}`;
				bioInfo.textContent = extraInfo.biography;
				let birthdate = extraInfo.birthday;
				let convertedDate = convertDate(birthdate);
				birth.textContent = convertedDate;
				death.textContent = extraInfo.deathday;
				place.textContent = extraInfo.place_of_birth;
				
			})
			.catch(error => {
				console.log("This actor or director is not found , please try again");
			});
	}

	function convertDate(dateString) {
		var date = new Date(dateString);
		return date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
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
		scroll(0,0);
		searchFilm(inputTitleValue);
	}	
	
	function clearTarget(){
		document.querySelector('#target').innerHTML = "";
	}

	function clearTarget2(){
		document.querySelector('#target2').innerHTML = "";
	}

	function checkInput(){		
		if (inputTitle.value.length <= 0) {
			clearTarget();
		}
		else{
			btn.disabled = false;
		}
	}

	function checkInput2(){
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














	