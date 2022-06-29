// Result landing
const titleResult = document.getElementById('titleResult');
const paragraphCard = document.getElementById('paragraphCard');
const imageCard = document.getElementById('imageCard');
const mainProduct = document.getElementsByClassName('main-product');
const quizFormCuidadores = document.getElementById('quiz-cuidadores');

const isMailValid = (valor) => {
	const re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	if(!re.exec(valor))
		return false

	return true
}

const handleSendDataForm = (dataForm) => {
	const object = {};
	// dataForm.append('landing', nameLanding);
	dataForm.forEach((value, key) => object[key] = value);
	if(!isMailValid(object.email)){
		Swal.fire({
			icon: 'error',
			title: 'Mail no válido',
			text: 'Por favor coloca un mail válido, para que nos podamos comunicar contigo',
		});
		return;
	}
	const jsonToSend = JSON.stringify(object);
	fetch('email_datos.php', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: jsonToSend
	}).then(res => res.json())
		.then(function (res) {
			// console.log(res);
			if (res.status) {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Hemos recibido tus datos',
					showConfirmButton: false,
					timer: 2500
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Algo salió mal',
					text: 'Intente mas tarde',
				});
			}
		});
}

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
	// console.log("Resultados by answ: ", resultsByAns);
	const maxval = resultsByAns.reduce((acc, r) => acc = acc > r.total ? acc : r.total, 0);
	const maxResult = resultsByAns.find( x => x.total === maxval);
	// console.log("Resultados: ", maxval);
	return maxResult.name;
}

const renderResultsUI = (typeResult, listResults) => {
	const resultInfo = listResults.find( x => x.name === typeResult);
	// console.log(resultInfo);

	imageCard.src = `./images/${resultInfo.image}.png`;
	titleResult.textContent = resultInfo.title;
	paragraphCard.textContent = resultInfo.paragraph;
}

export const showResults = async () => {
	const answersList = JSON.parse(localStorage.getItem('answersQuiz'));
	// console.log("RESULTADOS: ", answersList);
	const resultsList = await loadResultFromBd();
	const result = processResults(answersList);

	renderResultsUI(result, resultsList);

	quizFormCuidadores.addEventListener('submit', (e) => {
		e.preventDefault();
		const chkAgree1 = document.getElementById('agree_1');
		const chkAgree2 = document.getElementById('agree_2');
		const chkAgree3 = document.getElementById('agree_3');
		if(chkAgree1.checked && chkAgree2.checked && chkAgree3.checked) {
			const formData = new FormData(quizFormCuidadores);
			handleSendDataForm(formData);
		}else{
			Swal.fire({
				icon: 'error',
				title: 'Acepta los términos y condiciones',
				text: 'Tienes que aceptar los términos y condiciones, para poder continuar',
			});
		}
	});
}