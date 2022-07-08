import { startQuiz } from './quiz';
import { showResults } from './result'

window.onload = async () => {
	let currentPage = window.location.pathname;
	currentPage = (currentPage.slice(1)).split('.')[0];
	currentPage = currentPage.split('/').pop();
	console.log("current Page: ", currentPage);

	let pathCountry = (window.location.pathname.slice(1)).split('/')[1];
	let currentCountry = pathCountry ? (pathCountry).split("-").pop() : "";

	if(currentPage === "quiz"){
		startQuiz();
	}

	if(currentPage === "results"){
		showResults(currentCountry);
	}
}
