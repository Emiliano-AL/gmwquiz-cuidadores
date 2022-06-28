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
	const resultsByAns = [
		{
			name: "result_1",
			total: listAnswers.filter( x => x.answer == "a").length
		},
		{
			name: "result_2",
			total: listAnswers.filter( x => x.answer == "b").length
		},
		{
			name: "result_3",
			total: listAnswers.filter( x => x.answer == "c").length
		}
	];
	console.log("Resultados by answ: ", resultsByAns);
	const maxval = resultsByAns.reduce((acc, r) => acc = acc > r.total ? acc : r.total, 0);
	const maxResult = resultsByAns.find( x => x.total === maxval);
	console.log("Resultados: ", maxval);
	return maxResult.name;
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