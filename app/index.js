import { startQuiz } from './quiz';
import { showResults } from './result'

window.onload = async () => {
	let currentPage = window.location.pathname;
	currentPage = (currentPage.slice(1)).split('.')[0];
	currentPage = currentPage.split('/').pop();
	console.log("current Page: ", currentPage);
	if(currentPage === "quiz"){
		startQuiz();
	}

	if(currentPage === "results"){
		showResults();
	}
}
