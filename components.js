


function renderQuizPage(section) {
  $('main').html(renderBannerHeader() + '\n' + section);
}

function renderFinalResultsPage() {
  $('main').html(renderFinalResultsSection());
}

function renderStartPage() {
  $('main').html(renderStartSection());
}

function renderBackgroundGradient() {
  const currEnvironment = questions[questionNum - 1].correct.environment;
  const currBgColorClass = determineBgColor(currEnvironment);
  const otherLayers = $(`#gradientBgs`).find("div").not(`#layerGradient${currEnvironment}`);

  $(otherLayers).addClass('no-opacity');
  $(`#layerGradient${currEnvironment}`).removeClass('no-opacity').addClass(currBgColorClass);
  if (questionNum === 1) {
    $(`#baseGradient`).addClass(`no-opacity`);
  }
  if ($('#jsNextButton').text() === 'See My Results') {
    $(`#gradientBgs`).addClass(`no-opacity`);
    $(`#baseGradient`).removeClass(`no-opacity`);
  }
}


function resetBackgroundGradient() {
  $(`#gradientBgs`).removeClass(`no-opacity`);
  const gradientLayers = $(`#gradientBgs`).find("div");
  for (let i = 0; i < gradientLayers.length; i++) {
    $(gradientLayers[i]).addClass('no-opacity');
  }
}

function determineBgColor(environment) {
  if (environment === 'Mars') {
    return `murky-red-bg`;
  } else if (environment === 'Swamp') {
    return `murky-green-bg`;
  } else if (environment === 'Water') {
    return `murky-ltblue-bg`;
  } else if (environment === 'Death') {
    return `murky-black-bg`;
  } else if (environment === 'Earth') {
    return `murky-brown-bg`;
  }
  return `no-opacity`;
}

function renderBannerHeader() {
  return `
    <header class="banner">
      <p aria-label="logo" id="logo">Cryptids<br>Quiz</p>
      <div aria-label="quiz progress" class="count-score">
        <p>Question: <span id="questionNum">${questionNum}</span>/${questions.length}</p>
        <p>Score: <span id="scoreCount">${score}</span></p>
      </div>
    </header>
  `;
}

function renderQuestionAnswerSection() {
  const questionObject = questions[questionNum - 1];
  return `
    <section id="jsQuestionAnswerForm" class="container">
      <form >
        <fieldset>
          <legend id="question">${questionObject.question}<br>What am I?</legend>
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
        <button id="jsSubmitButton" type="submit">Submit</button>
      </form>
    </section>
  `;
}


function renderCorrectSection() {
  const questionObject = questions[questionNum - 1];
  return `
    <section role="feedback" id="jsCorrectFeedback" class="container">
      <div class="feedback">
        <h1>You got it right!</h1>
        <div role="image" class="image" style="background-image: url('${questionObject.correct.imgUrl}');"
          aria-label="${questionObject.correct.name}">
        </div>
        <p>${questionObject.correct.name} says: <br>${questionObject.correct.says}</p>
      </div>
      <button id="jsNextButton" type="button">${determineNextButtonText()}</button>
    </section>
  `;
}

function renderWrongSection() {
  const questionObject = questions[questionNum - 1];
  return `
    <section role="feedback" id="jsIncorrectFeedback" class="container">
      <div class="feedback">
        <h1>Nope, study up!</h1>
        <p>The correct answer is <br><strong>${questionObject.correct.name}</strong></p>
          <div role="image" class="image" style="background-image: url('${questionObject.correct.imgUrl}');"
            aria-label="${questionObject.correct.name}">
          </div>
          <p class="text-left">${questionObject.question}</p>
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
    <section role="quizresults" id="jsResultsPage" class="intro-results-container">
      <h1>Final Score: <br>${score}/${questions.length}</h1>
      <p>Cryptozoologist Status<br><strong>${determineStatus()}</strong></p>
      <div class='button-wrap'>
        <button type='button' id='jsRestartButton'>Take it again!</button>
      </div>
    </section>
  `;
}

function determineStatus() {
  if (score >= questions.length * .8) {
    return `Master`;
  } else if (score >= questions.length * .5) {
    return `Journeyman`;
  }
  return `Neophyte`;
}

function renderStartSection() {
  return `
    <section role="quizstart" id="jsStartQuiz" class="intro-results-container">
      <h1>Cryptids Quiz</h1>
      <p>How well do you know your folklore creatures?</p>
      <div class='button-wrap'>
        <button type='button' id='jsStartButton' >Get Started!</button>
      </div>
    </section>
  `;
}

