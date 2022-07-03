
export let anwswersToQuestions = [];
let currentQuestion = {};
let listQuestions = [];

const wrapperQuestion = document.getElementById('mainPageQuiz');
const nextQuestionBtn = document.getElementById('nextQuestion');
const showResultsBtn = document.getElementById('showResults');
const quizImg = document.getElementById('quizImg');
const slideInfo = document.getElementById('slideInfo');
const questionContent = document.getElementById('questionContent');
const instructions = document.getElementById('instructions');
const wrapperAnswers = document.getElementById('wrapperAnswersList');
const backBtn = document.getElementById('backBtn');

const handleChange = ( question, answer) => {
	// console.log(chk)
	if(anwswersToQuestions.find( res => res.questionId == question)){
		for(let i = 0; anwswersToQuestions.length > i; i++){
			if(anwswersToQuestions[i].questionId == question){
				anwswersToQuestions[i].answer = answer;
			}
		}
	}else{
		anwswersToQuestions.push({
			questionId: question,
			answer: answer
		});
	}
}

const renderAnswersUI = (currentResponse = false) => {
	wrapperAnswers.innerHTML = ``;
	currentQuestion.anwswers.map( ans => {
		const liItem = document.createElement('li');
		const wrapDiv = document.createElement("div");
		const chkInput = document.createElement("input");
		chkInput.type = "radio";
		chkInput.name = "question-" + currentQuestion.id;
		chkInput.id = ans.id;
		chkInput.dataset.weight = ans.weight;
		if(currentResponse && (currentResponse.answer == ans.weight)){
			chkInput.checked = true;
		}
		chkInput.dataset.question = currentQuestion.id;
		chkInput.classList.add("anwschk");
		chkInput.classList.add("form-check-input");
		const chkLabel = document.createElement("label");
		chkLabel.classList.add("form-check-label");
		chkLabel.setAttribute("for", ans.id);
		chkLabel.textContent = ans.content;

		wrapDiv.classList.add("form-check");
		wrapDiv.appendChild(chkInput);
		wrapDiv.appendChild(chkLabel);
		liItem.appendChild(wrapDiv);
		wrapperAnswers.appendChild(liItem);
	});
}

const renderPrevQuestion = (prevNmbrQues) => {
	quizImg.src = `./images/imgQuiz_${prevNmbrQues}.png`;
	questionContent.textContent = currentQuestion.question;
	wrapperQuestion.dataset.currentquestion = prevNmbrQues;

	if(prevNmbrQues >= 0){
		// instructions.hidden = true;
		slideInfo.children[prevNmbrQues + 1].classList.remove('active');
	}

	slideInfo.children[prevNmbrQues].classList.add('active');
	const currentResp = anwswersToQuestions.find( res => res.questionId == currentQuestion.id);
	renderAnswersUI(currentResp);
}


const renderNextQuestion = (crrntNmbrQues) => {
	quizImg.src = `./images/imgQuiz_${crrntNmbrQues}.png`;
	questionContent.textContent = currentQuestion.question;
	wrapperQuestion.dataset.currentindex = crrntNmbrQues;
	wrapperQuestion.dataset.currentquestion = crrntNmbrQues + 1;
	if(crrntNmbrQues > 0){
		instructions.hidden = true;
		slideInfo.children[crrntNmbrQues - 1].classList.remove('active');
	}
	slideInfo.children[crrntNmbrQues].classList.add('active');

	const currentResp = anwswersToQuestions.find( res => res.questionId == currentQuestion.id);
	renderAnswersUI(currentResp);

	if((Number(wrapperQuestion.dataset.currentquestion) + 1) > listQuestions.length){
		showResultsBtn.classList.remove('d-none');
		nextQuestionBtn.classList.add('d-none');
	}
}

const checkHasSlctdAns = () => {
	const idCrrntQuestion = currentQuestion.id;
	const result = anwswersToQuestions.find( a => a.questionId == idCrrntQuestion);
	if(result)
		return true;

	return false;
}

const handleNextClick = () => {
	const currentNmbrQuestion = Number(wrapperQuestion.dataset.currentquestion);
	if(currentNmbrQuestion == 0){
		currentQuestion = listQuestions[currentNmbrQuestion];
		renderNextQuestion(currentNmbrQuestion);
		backBtn.classList.add('d-none');
		return;
	}

	if(checkHasSlctdAns()){
		currentQuestion = listQuestions[currentNmbrQuestion];
		if(currentNmbrQuestion > 0 )
			backBtn.classList.remove('d-none');
		//Render Next Question
		renderNextQuestion(currentNmbrQuestion);
	}else{
		// selecciona una respuesta
		// console.log("Elige una respuesta..");
		Swal.fire({
			position: 'top-end',
			icon: 'warning',
			title: 'Elige una respuesta',
			showConfirmButton: false,
			timer: 1500,
		});
	}
}

const loadQuestions = async () => {
	const questionsdata = await fetch("questions.json");
	const questions = await questionsdata.json();
	// console.log(questions);
	return questions;
}

const handleResultsClick = () => {
	localStorage.setItem('answersQuiz', JSON.stringify(anwswersToQuestions));
}

if(nextQuestionBtn)
	nextQuestionBtn.addEventListener('click', handleNextClick);
if(showResultsBtn)
	showResultsBtn.addEventListener('click', handleResultsClick);


export const startQuiz = async () => {
	listQuestions = [];
	listQuestions = await loadQuestions();
	anwswersToQuestions = [];
	localStorage.setItem('answersQuiz', JSON.stringify(anwswersToQuestions));
	handleNextClick();

	wrapperAnswers.addEventListener("click", (e) => {
		if(!e.target.classList.contains('anwschk')){
			return;
		}

		handleChange(Number(e.target.dataset.question), e.target.dataset.weight);
	});

	backBtn.addEventListener('click', (e) => {
		e.preventDefault();
		const prevIndxQuestion = Number(wrapperQuestion.dataset.currentindex) - 1;
		currentQuestion = listQuestions[prevIndxQuestion];
		if(prevIndxQuestion === 0){
			backBtn.classList.add('d-none');
		}
		renderPrevQuestion(prevIndxQuestion);
		wrapperQuestion.dataset.currentindex = prevIndxQuestion;
		wrapperQuestion.dataset.currentquestion = prevIndxQuestion + 1;
	});
}