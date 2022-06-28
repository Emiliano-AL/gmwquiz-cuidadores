import { startQuiz } from './quiz';
import { showResults } from './result'

window.onload = async () => {
	let currentPage = window.location.pathname;
	currentPage = (currentPage.slice(1)).split('.')[0];
	if(currentPage === "quiz"){
		startQuiz();
	}

	if(currentPage === "results"){
		// console.log("RESULTADOS: ", anwswersToQuestions);
		showResults();
	}
}
