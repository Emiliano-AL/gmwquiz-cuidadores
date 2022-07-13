/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quiz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quiz */ \"./app/quiz.js\");\n/* harmony import */ var _result__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./result */ \"./app/result.js\");\n\r\n\r\n\r\nwindow.onload = async () => {\r\n\tlet currentPage = window.location.pathname;\r\n\tcurrentPage = (currentPage.slice(1)).split('.')[0];\r\n\tcurrentPage = currentPage.split('/').pop();\r\n\tconsole.log(\"current Page: \", currentPage);\r\n\r\n\tlet pathCountry = (window.location.pathname.slice(1)).split('/')[1];\r\n\tlet currentCountry = pathCountry ? (pathCountry).split(\"-\").pop() : \"\";\r\n\r\n\tif(currentPage === \"quiz\"){\r\n\t\t(0,_quiz__WEBPACK_IMPORTED_MODULE_0__.startQuiz)();\r\n\t}\r\n\r\n\tif(currentPage === \"results\"){\r\n\t\t(0,_result__WEBPACK_IMPORTED_MODULE_1__.showResults)(currentCountry);\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://quiz-cuidadores/./app/index.js?");

/***/ }),

/***/ "./app/quiz.js":
/*!*********************!*\
  !*** ./app/quiz.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"anwswersToQuestions\": () => (/* binding */ anwswersToQuestions),\n/* harmony export */   \"startQuiz\": () => (/* binding */ startQuiz)\n/* harmony export */ });\n\r\nlet anwswersToQuestions = [];\r\nlet currentQuestion = {};\r\nlet listQuestions = [];\r\n\r\nconst wrapperQuestion = document.getElementById('mainPageQuiz');\r\nconst nextQuestionBtn = document.getElementById('nextQuestion');\r\nconst showResultsBtn = document.getElementById('showResults');\r\nconst quizImg = document.getElementById('quizImg');\r\nconst slideInfo = document.getElementById('slideInfo');\r\nconst questionContent = document.getElementById('questionContent');\r\nconst instructions = document.getElementById('instructions');\r\nconst wrapperAnswers = document.getElementById('wrapperAnswersList');\r\nconst backBtn = document.getElementById('backBtn');\r\n\r\nconst handleChange = ( question, answer) => {\r\n\t// console.log(chk)\r\n\tif(anwswersToQuestions.find( res => res.questionId == question)){\r\n\t\tfor(let i = 0; anwswersToQuestions.length > i; i++){\r\n\t\t\tif(anwswersToQuestions[i].questionId == question){\r\n\t\t\t\tanwswersToQuestions[i].answer = answer;\r\n\t\t\t}\r\n\t\t}\r\n\t}else{\r\n\t\tanwswersToQuestions.push({\r\n\t\t\tquestionId: question,\r\n\t\t\tanswer: answer\r\n\t\t});\r\n\t}\r\n}\r\n\r\nconst renderAnswersUI = (currentResponse = false) => {\r\n\twrapperAnswers.innerHTML = ``;\r\n\tcurrentQuestion.anwswers.map( ans => {\r\n\t\tconst liItem = document.createElement('li');\r\n\t\tconst wrapDiv = document.createElement(\"div\");\r\n\t\tconst chkInput = document.createElement(\"input\");\r\n\t\tchkInput.type = \"radio\";\r\n\t\tchkInput.name = \"question-\" + currentQuestion.id;\r\n\t\tchkInput.id = ans.id;\r\n\t\tchkInput.dataset.weight = ans.weight;\r\n\t\tif(currentResponse && (currentResponse.answer == ans.weight)){\r\n\t\t\tchkInput.checked = true;\r\n\t\t}\r\n\t\tchkInput.dataset.question = currentQuestion.id;\r\n\t\tchkInput.classList.add(\"anwschk\");\r\n\t\tchkInput.classList.add(\"form-check-input\");\r\n\t\tconst chkLabel = document.createElement(\"label\");\r\n\t\tchkLabel.classList.add(\"form-check-label\");\r\n\t\tchkLabel.setAttribute(\"for\", ans.id);\r\n\t\tchkLabel.textContent = ans.content;\r\n\r\n\t\twrapDiv.classList.add(\"form-check\");\r\n\t\twrapDiv.appendChild(chkInput);\r\n\t\twrapDiv.appendChild(chkLabel);\r\n\t\tliItem.appendChild(wrapDiv);\r\n\t\twrapperAnswers.appendChild(liItem);\r\n\t});\r\n}\r\n\r\nconst renderPrevQuestion = (prevNmbrQues) => {\r\n\tquizImg.src = `./images/imgQuiz_${prevNmbrQues}.png`;\r\n\tquestionContent.textContent = currentQuestion.question;\r\n\twrapperQuestion.dataset.currentquestion = prevNmbrQues;\r\n\r\n\tif(prevNmbrQues >= 0){\r\n\t\t// instructions.hidden = true;\r\n\t\tslideInfo.children[prevNmbrQues + 1].classList.remove('active');\r\n\t}\r\n\r\n\tslideInfo.children[prevNmbrQues].classList.add('active');\r\n\tconst currentResp = anwswersToQuestions.find( res => res.questionId == currentQuestion.id);\r\n\trenderAnswersUI(currentResp);\r\n}\r\n\r\n\r\nconst renderNextQuestion = (crrntNmbrQues) => {\r\n\tquizImg.src = `./images/imgQuiz_${crrntNmbrQues}.png`;\r\n\tquestionContent.textContent = currentQuestion.question;\r\n\twrapperQuestion.dataset.currentindex = crrntNmbrQues;\r\n\twrapperQuestion.dataset.currentquestion = crrntNmbrQues + 1;\r\n\tif(crrntNmbrQues > 0){\r\n\t\tinstructions.hidden = true;\r\n\t\tslideInfo.children[crrntNmbrQues - 1].classList.remove('active');\r\n\t}\r\n\tslideInfo.children[crrntNmbrQues].classList.add('active');\r\n\r\n\tconst currentResp = anwswersToQuestions.find( res => res.questionId == currentQuestion.id);\r\n\trenderAnswersUI(currentResp);\r\n\r\n\tif((Number(wrapperQuestion.dataset.currentquestion) + 1) > listQuestions.length){\r\n\t\tshowResultsBtn.classList.remove('d-none');\r\n\t\tnextQuestionBtn.classList.add('d-none');\r\n\t}\r\n}\r\n\r\nconst checkHasSlctdAns = () => {\r\n\tconst idCrrntQuestion = currentQuestion.id;\r\n\tconst result = anwswersToQuestions.find( a => a.questionId == idCrrntQuestion);\r\n\tif(result)\r\n\t\treturn true;\r\n\r\n\treturn false;\r\n}\r\n\r\nconst handleNextClick = () => {\r\n\tconst currentNmbrQuestion = Number(wrapperQuestion.dataset.currentquestion);\r\n\tif(currentNmbrQuestion == 0){\r\n\t\tcurrentQuestion = listQuestions[currentNmbrQuestion];\r\n\t\trenderNextQuestion(currentNmbrQuestion);\r\n\t\tbackBtn.classList.add('d-none');\r\n\t\treturn;\r\n\t}\r\n\r\n\tif(checkHasSlctdAns()){\r\n\t\tcurrentQuestion = listQuestions[currentNmbrQuestion];\r\n\t\tif(currentNmbrQuestion > 0 )\r\n\t\t\tbackBtn.classList.remove('d-none');\r\n\t\t//Render Next Question\r\n\t\trenderNextQuestion(currentNmbrQuestion);\r\n\t}else{\r\n\t\t// selecciona una respuesta\r\n\t\t// console.log(\"Elige una respuesta..\");\r\n\t\tSwal.fire({\r\n\t\t\tposition: 'top-end',\r\n\t\t\ticon: 'warning',\r\n\t\t\ttitle: 'Elige una respuesta',\r\n\t\t\tshowConfirmButton: false,\r\n\t\t\ttimer: 1500,\r\n\t\t});\r\n\t}\r\n}\r\n\r\nconst loadQuestions = async () => {\r\n\tconst questionsdata = await fetch(\"questions.json\");\r\n\tconst questions = await questionsdata.json();\r\n\t// console.log(questions);\r\n\treturn questions;\r\n}\r\n\r\nconst handleResultsClick = () => {\r\n\tlocalStorage.setItem('answersQuiz', JSON.stringify(anwswersToQuestions));\r\n}\r\n\r\nif(nextQuestionBtn)\r\n\tnextQuestionBtn.addEventListener('click', handleNextClick);\r\nif(showResultsBtn)\r\n\tshowResultsBtn.addEventListener('click', handleResultsClick);\r\n\r\n\r\nconst startQuiz = async () => {\r\n\tlistQuestions = [];\r\n\tlistQuestions = await loadQuestions();\r\n\tanwswersToQuestions = [];\r\n\tlocalStorage.setItem('answersQuiz', JSON.stringify(anwswersToQuestions));\r\n\thandleNextClick();\r\n\r\n\twrapperAnswers.addEventListener(\"click\", (e) => {\r\n\t\tif(!e.target.classList.contains('anwschk')){\r\n\t\t\treturn;\r\n\t\t}\r\n\r\n\t\thandleChange(Number(e.target.dataset.question), e.target.dataset.weight);\r\n\t});\r\n\r\n\tbackBtn.addEventListener('click', (e) => {\r\n\t\te.preventDefault();\r\n\t\tconst prevIndxQuestion = Number(wrapperQuestion.dataset.currentindex) - 1;\r\n\t\tcurrentQuestion = listQuestions[prevIndxQuestion];\r\n\t\tif(prevIndxQuestion === 0){\r\n\t\t\tbackBtn.classList.add('d-none');\r\n\t\t}\r\n\t\trenderPrevQuestion(prevIndxQuestion);\r\n\t\twrapperQuestion.dataset.currentindex = prevIndxQuestion;\r\n\t\twrapperQuestion.dataset.currentquestion = prevIndxQuestion + 1;\r\n\t});\r\n}\n\n//# sourceURL=webpack://quiz-cuidadores/./app/quiz.js?");

/***/ }),

/***/ "./app/result.js":
/*!***********************!*\
  !*** ./app/result.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"showResults\": () => (/* binding */ showResults)\n/* harmony export */ });\n// Result landing\r\nconst titleResult = document.getElementById('titleResult');\r\nconst paragraphCard = document.getElementById('paragraphCard');\r\nconst imageCard = document.getElementById('imageCard');\r\nconst listImgProduct = document.getElementsByClassName('main-product');\r\nconst quizFormCuidadores = document.getElementById('quiz-cuidadores');\r\nconst listNameMdetronics = document.getElementsByClassName('nameMedtronicProduct');\r\nconst listQuestionTitle = document.getElementsByClassName('questionTitle');\r\n\r\nconst isMailValid = (valor) => {\r\n\tconst re=/^([\\da-z_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$/\r\n\tif(!re.exec(valor))\r\n\t\treturn false\r\n\r\n\treturn true\r\n}\r\n\r\nconst handleSendDataForm = (dataForm) => {\r\n\tconst object = {};\r\n\t// dataForm.append('landing', nameLanding);\r\n\tdataForm.forEach((value, key) => object[key] = value);\r\n\tif(!isMailValid(object.email)){\r\n\t\tSwal.fire({\r\n\t\t\ticon: 'error',\r\n\t\t\ttitle: 'Mail no válido',\r\n\t\t\ttext: 'Por favor coloca un mail válido, para que nos podamos comunicar contigo',\r\n\t\t});\r\n\t\treturn;\r\n\t}\r\n\tconst jsonToSend = JSON.stringify(object);\r\n\tfetch('email_datos.php', {\r\n\t\tmethod: 'POST',\r\n\t\theaders: {\r\n\t\t\t'Accept': 'application/json, text/plain, */*',\r\n\t\t\t'Content-Type': 'application/json'\r\n\t\t},\r\n\t\tbody: jsonToSend\r\n\t}).then(res => res.json())\r\n\t\t.then(function (res) {\r\n\t\t\t// console.log(res);\r\n\t\t\tif (res.status) {\r\n\t\t\t\tSwal.fire({\r\n\t\t\t\t\tposition: 'top-end',\r\n\t\t\t\t\ticon: 'success',\r\n\t\t\t\t\ttitle: 'Hemos recibido tus datos',\r\n\t\t\t\t\tshowConfirmButton: false,\r\n\t\t\t\t\ttimer: 2500\r\n\t\t\t\t});\r\n\t\t\t} else {\r\n\t\t\t\tSwal.fire({\r\n\t\t\t\t\ticon: 'error',\r\n\t\t\t\t\ttitle: 'Algo salió mal',\r\n\t\t\t\t\ttext: 'Intente mas tarde',\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t});\r\n}\r\n\r\nconst loadResultFromBd = async () => {\r\n\tconst resultsdata = await fetch(\"results.json\");\r\n\tconst results = await resultsdata.json();\r\n\t// console.log(questions);\r\n\treturn results;\r\n}\r\n\r\nconst processResults = (listAnswers) => {\r\n\t// result_1, result_2, result_3, result_4, result_5\r\n\tconst resultsByAns = [\r\n\t\t{\r\n\t\t\tname: \"result_1\",\r\n\t\t\ttotal: listAnswers.filter( x => x.answer == \"a\").length\r\n\t\t},\r\n\t\t{\r\n\t\t\tname: \"result_2\",\r\n\t\t\ttotal: listAnswers.filter( x => x.answer == \"b\").length\r\n\t\t},\r\n\t\t{\r\n\t\t\tname: \"result_3\",\r\n\t\t\ttotal: listAnswers.filter( x => x.answer == \"c\").length\r\n\t\t}\r\n\t];\r\n\t// console.log(\"Resultados by answ: \", resultsByAns);\r\n\tconst maxval = resultsByAns.reduce((acc, r) => acc = acc > r.total ? acc : r.total, 0);\r\n\tconst maxResult = resultsByAns.find( x => x.total === maxval);\r\n\t// console.log(\"Resultados: \", maxval);\r\n\treturn maxResult.name;\r\n}\r\n\r\nconst renderResultsUI = (typeResult, listResults, country, isInPen) => {\r\n\tconst resultInfo = listResults.find( x => x.name === typeResult);\r\n\r\n\tif(country === \"cl\" && isInPen){\r\n\t\tArray.prototype.forEach.call(listQuestionTitle, (element) => {\r\n\t\t\telement.textContent = \"InPen es el único sistema inteligente que combina una pluma de insulina reutilizable con Bluetooth® y una aplicación móvil intuitiva para ayudar a las personas con diabetes a administrar la cantidad correcta de insulina en el momento justo.\";\r\n\t\t});\r\n\t\tArray.prototype.forEach.call(listImgProduct, (element) => {\r\n\t\t\telement.src = `images/inpen.png`;\r\n\t\t});\r\n\t\tArray.prototype.forEach.call(listNameMdetronics, (element) => {\r\n\t\t\telement.textContent = \"Sistema Inpen ™\";\r\n\t\t});\r\n\t}else {\r\n\t\tconst nameProd = infoByCountry(country);\r\n\t\tArray.prototype.forEach.call(listNameMdetronics, (element) => {\r\n\t\t\telement.textContent = nameProd;\r\n\t\t});\r\n\t}\r\n\timageCard.src = `./images/${resultInfo.image}.png`;\r\n\ttitleResult.textContent = resultInfo.title;\r\n\tparagraphCard.textContent = resultInfo.paragraph;\r\n}\r\n\r\nconst infoByCountry = (country) => {\r\n\tconst informationByCountry = [\r\n\t\t{\r\n\t\t\tcountry : \"ar\",\r\n\t\t\t// product : \"MiniMed™ 670G\",\r\n\t\t\tproduct : \"MiniMed™ 780G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"br\",\r\n\t\t\tproduct : \"MiniMed™ 670G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"cl\",\r\n\t\t\tproduct : \"MiniMed™ 780G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"do\",\r\n\t\t\tproduct : \"MiniMed™ 670G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"mx\",\r\n\t\t\tproduct : \"MiniMed™ 670G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"pa\",\r\n\t\t\tproduct : \"MiniMed™ 780G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"pr\",\r\n\t\t\tproduct : \"MiniMed™ 770G\",\r\n\t\t},\r\n\t\t{\r\n\t\t\tcountry : \"\",\r\n\t\t\tproduct : \"MiniMed™ 670G\",\r\n\t\t},\r\n\t]\r\n\treturn informationByCountry.find( x => x.country == country).product;\r\n}\r\n\r\nconst showResults = async (currentCountry) => {\r\n\tconst answersList = JSON.parse(localStorage.getItem('answersQuiz'));\r\n\t// console.log(\"RESULTADOS: \", answersList);\r\n\tconst resultsList = await loadResultFromBd();\r\n\tconst result = processResults(answersList);\r\n\tconsole.log(\"answersList: \", answersList);\r\n\r\n\tlet isInPen = false;\r\n\t//Solo para chile\r\n\tif(currentCountry == \"cl\")\r\n\t\tisInPen = answersList.some( x => x.answer === \"inpen\");;\r\n\r\n\trenderResultsUI(result, resultsList, currentCountry, isInPen);\r\n\r\n\tquizFormCuidadores.addEventListener('submit', (e) => {\r\n\t\te.preventDefault();\r\n\t\tconst chkAgree1 = document.getElementById('agree_1');\r\n\t\tconst chkAgree2 = document.getElementById('agree_2');\r\n\t\tconst chkAgree3 = document.getElementById('agree_3');\r\n\t\tif(chkAgree1.checked && chkAgree2.checked && chkAgree3.checked) {\r\n\t\t\tconst formData = new FormData(quizFormCuidadores);\r\n\t\t\thandleSendDataForm(formData);\r\n\t\t}else{\r\n\t\t\tSwal.fire({\r\n\t\t\t\ticon: 'error',\r\n\t\t\t\ttitle: 'Acepta los términos y condiciones',\r\n\t\t\t\ttext: 'Tienes que aceptar los términos y condiciones, para poder continuar',\r\n\t\t\t});\r\n\t\t}\r\n\t});\r\n}\n\n//# sourceURL=webpack://quiz-cuidadores/./app/result.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/index.js");
/******/ 	
/******/ })()
;