function renderQuizPage(section) {
  $('main').html(renderBannerHeader() + '\n' + section);
}

function renderFinalResultsPage() {
  $('main').html(renderFinalResultsSection());
}

function renderBackground() {
  // $('#baseGradient').removeClass('blue-base').addClass('no-opacity');
  // $('body').removeClass('murky-blue-bg').addClass('murky-red-bg');
  // console.log(questions[questionNum -1].correct.environment);
  const currEnvironment = questions[questionNum - 1].correct.environment;
  const currBgColorClass = determineBgColor(currEnvironment);
  console.log(currBgColorClass);
  $('#layerGradient1').removeClass('no-opacity').addClass(currBgColorClass);
}

function renderBackground2() {
  const currEnvironment = questions[questionNum - 1].correct.environment;
  const currBgColorClass = determineBgColor(currEnvironment);
  console.log(currBgColorClass);
  $('#layerGradient1').removeClass(currBgColorClass).addClass('no-opacity');
  $('#layerGradient2').removeClass('no-opacity').addClass(currBgColorClass);
}

function determineBgColor(environment) {
  if (environment === 'Mars') {
    return `murky-red-bg`;
  } else if (environment === 'Night') {
    return `no-opacity`;
  } else if (environment === 'Airborn') {
    return `murky-green-bg`;
  }
  return `no-opacity`;
}

function renderBannerHeader() {
  return `
    <div class="banner">
      <h1 id="logo">Cryptids<br>Quiz</h1>
      <div class="count-score">
        <p>Question: <span id="questionNum">${questionNum}</span>/10</p>
        <p>Score: <span id="scoreCount">${score}</span></p>
      </div>
    </div>
  `;
}

function renderQuestionAnswerSection() {
  const questionObject = questions[questionNum - 1];
  return `
    <section id="jsQuestionAnswerForm" class="container">
      <form >
        <p id="question">${questionObject.question}<br>What am I?</p>
        <fieldset>
          <label>
            <input type="radio" id="radio1" name="option" value="${questionObject.options.a}" required>
            <span>${questionObject.options.a}</span>
          </label>
          <label>
            <input type="radio" id="radio2" name="option" value="${questionObject.options.b}" required>
            <span>${questionObject.options.b}</span>
          </label>
          <label>
            <input type="radio" id="radio3" name="option" value="${questionObject.options.c}" required>
            <span>${questionObject.options.c}</span>
          </label>
          <label>
            <input type="radio" id="radio4" name="option" value="${questionObject.options.d}" required>
            <span>${questionObject.options.d}</span>
          </label>
        </fieldset>
        <button id="jsSubmitButton" type="button">Submit</button>
      </form>
    </section>
  `;
}


function renderCorrectSection() {
  const questionObject = questions[questionNum - 1];
  return `
    <section id="jsCorrectFeedback" class="container">
      <div class="feedback">
        <h1>You got it right!</h1>
        <img class="image" src="${questionObject.correct.imgUrl}"
          alt="${questionObject.correct.name}">
        </img>
        <p>${questionObject.correct.name} says: <br>${questionObject.correct.says}</p>
      </div>
      <button id="jsNextButton" type="button">${determineNextButtonText()}</button>
    </section>
  `;
}

function renderWrongSection() {
  const questionObject = questions[questionNum - 1];
  return `
    <section id="jsIncorrectFeedback" class="container">
      <div class="feedback">
        <h1>Nope, but nice try!</h1>
        <p>The correct answer is <br>${questionObject.correct.name}</p>
        <img class="image"
          src="${questionObject.correct.imgUrl}"
          alt="${questionObject.correct.name}"></img>
      </div>
      <button id="jsNextButton" type="button">${determineNextButtonText()}</button>
    </section>
  `;
}

function determineNextButtonText() {
  if (questionNum === questions.length) {
    return `See My Results`;
  }
  return `Next Question`;
}

function renderFinalResultsSection() {
  return `
    <section id="jsResultsPage" class="intro-results-container">
      <h1>Final Score: ${score}</h1>
      <p>Cryptozoologist Status:<br>${determineStatus()}</p>
      <div class='button-wrap'>
        <button type='button' id='jsRestartButton'>Take it again!</button>
      </div>
    </section>
  `;
}

function determineStatus() {
  if (score >= questions.length * .8) {
    return `master`;
  } else if (score >= questions.length * .5) {
    return `journeyman`;
  }
  return `neophyte`;
}
