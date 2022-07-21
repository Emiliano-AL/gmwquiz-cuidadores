// Result landing
const titleResult = document.getElementById('titleResult');
const paragraphCard = document.getElementById('paragraphCard');
const imageCard = document.getElementById('imageCard');
const listImgProduct = document.getElementsByClassName('main-product');
const quizFormCuidadores = document.getElementById('quiz-cuidadores');
const listNameMdetronics = document.getElementsByClassName('nameMedtronicProduct');
const listQuestionTitle = document.getElementsByClassName('questionTitle');

const hddnLeadType = document.getElementById('lead_type');
const hddnSource = document.getElementById('source');
const hddnCampaign = document.getElementById('campaign');
const hddnMedium = document.getElementById('medium');
const hddnContent = document.getElementById('content');
const hddnUtm = document.getElementById('utm');
const hddnPerfil = document.getElementById('perfil');

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
	if(!isMailValid(object['Correo electrónico*'])){
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
				if(hddnSource.value === "Facebook" || hddnSource.value === "facebook"){
					if(hddnLeadType.value === "lead"){
						fbq('trackCustom', 'LeadBomba770G');
						fbq('trackCustom', 'LeadCuidadoresAR');
						fbq('trackCustom', 'ARBomba670');
					}else{
						fbq('trackCustom', 'ContactCuidadoresAR');
            fbq('trackCustom', 'ARBomba670Contact');
					}
				}

				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: '¡Gracias por tu interés!',
					text: 'Hemos recibido tus datos. Te contactaremos a la brevedad',
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

const renderResultsUI = (typeResult, listResults, country, isInPen) => {
	const resultInfo = listResults.find( x => x.name === typeResult);
	hddnPerfil.value = resultInfo.title;
	switch (typeResult) {
		case 'result_1':
			fbq('trackCustom', 'Quiz Tipo A');
			fbq('trackCustom', 'CuidadoresQuizTipoA_AR');
			break;
		case 'result_2':
			fbq('trackCustom', 'Quiz Tipo B');
			fbq('trackCustom', 'CuidadoresQuizTipoB_AR');
			break;
		case 'result_3':
			fbq('trackCustom', 'Quiz Tipo C');
			fbq('trackCustom', 'CuidadoresQuizTipoC_AR');
			break;
	}

	if(country === "cl" && isInPen){
		Array.prototype.forEach.call(listQuestionTitle, (element) => {
			element.textContent = "InPen es el único sistema inteligente que combina una pluma de insulina reutilizable con Bluetooth® y una aplicación móvil intuitiva para ayudar a las personas con diabetes a administrar la cantidad correcta de insulina en el momento justo.";
		});
		Array.prototype.forEach.call(listImgProduct, (element) => {
			element.src = `images/inpen.png`;
		});
		Array.prototype.forEach.call(listNameMdetronics, (element) => {
			element.textContent = "Sistema Inpen ™";
		});
	}else {
		const nameProd = infoByCountry(country);
		Array.prototype.forEach.call(listNameMdetronics, (element) => {
			element.textContent = nameProd;
		});
	}
	imageCard.src = `./images/${resultInfo.image}.png`;
	titleResult.textContent = resultInfo.title;
	paragraphCard.textContent = resultInfo.paragraph;
}

const setHiddenInformation = (country) => {
	const queryString = window.location.search;
	console.log(queryString);
	const urlParams = new URLSearchParams(queryString);

	hddnLeadType.value = "lead";
	hddnSource.value =  urlParams.get('utm_source');
	hddnCampaign.value =  urlParams.get('utm_campaign');
	hddnMedium.value =  urlParams.get('utm_medium');
	hddnContent.value =  urlParams.get('utm_content');
	hddnUtm.value = window.location.href;
}

const infoByCountry = (country) => {
	const informationByCountry = [
		{
			country : "ar",
			// product : "MiniMed™ 670G",
			product : "MiniMed™ 780G",
		},
		{
			country : "br",
			product : "MiniMed™ 670G",
		},
		{
			country : "cl",
			product : "MiniMed™ 780G",
		},
		{
			country : "do",
			product : "MiniMed™ 670G",
		},
		{
			country : "mx",
			product : "MiniMed™ 670G",
		},
		{
			country : "pa",
			product : "MiniMed™ 780G",
		},
		{
			country : "pr",
			product : "MiniMed™ 770G",
		},
		{
			country : "",
			product : "MiniMed™ 670G",
		},
	]
	return informationByCountry.find( x => x.country == country).product;
}

export const showResults = async (currentCountry) => {
	const answersList = JSON.parse(localStorage.getItem('answersQuiz'));
	// console.log("RESULTADOS: ", answersList);
	const resultsList = await loadResultFromBd();
	const result = processResults(answersList);
	console.log("answersList: ", answersList);
	setHiddenInformation(currentCountry);
	let isInPen = false;
	//Solo para chile
	if(currentCountry == "cl")
		isInPen = answersList.some( x => x.answer === "inpen");;

	renderResultsUI(result, resultsList, currentCountry, isInPen);

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