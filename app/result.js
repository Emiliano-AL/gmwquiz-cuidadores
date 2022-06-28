// Result landing
const titleResult = document.getElementById('titleResult');
const paragraphCard = document.getElementById('paragraphCard');
const imageCard = document.getElementById('imageCard');
const mainProduct = document.getElementsByClassName('main-product');

const loadResultFromBd = async () => {
	const resultsdata = await fetch("results.json");
	const results = await resultsdata.json();
	// console.log(questions);
	return results;
}

const processResults = (listAnswers) => {
	// result_1, result_2, result_3, result_4, result_5
	return "result_2";
}

const renderResultsUI = (typeResult, listResults) => {
	const resultInfo = listResults.find( x => x.name === typeResult);
	console.log(resultInfo);

	imageCard.src = `./images/${resultInfo.image}.png`;
	titleResult.textContent = resultInfo.title;
	paragraphCard.textContent = resultInfo.paragraph;
}

export const showResults = async () => {
	const answersList = JSON.parse(localStorage.getItem('answersQuiz'));
	console.log("RESULTADOS: ", answersList);
	const resultsList = await loadResultFromBd();
	const result = processResults(answersList);

	renderResultsUI(result, resultsList);
}