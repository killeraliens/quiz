const questions = [
  {
    question:`Touching any part of me will cause almost instant death and tremendous pain. My venom corrodes metal and I have predilection for the color yellow. I prey on camels and lay my eggs in their intestines. What am I?`,
    options: { a: `Jersey Devil`, b: `Yowie`, c: `Mongolian Death Worm`, d: `Kongamato` },
    correct: {
      name: `Mongolian Death Worm`,
      imgUrl: `https://natgeo.imgix.net/factsheets/thumbnails/Facts_MongolianDeathWorm_deathworm%20(1).tif?auto=compress,format&w=1024&h=560&fit=crop`,
      says: `'Sunflowers are my favorite flower'`
    }
  },
  {
    question: `I am known as the "breaker of boats" and am a pterosaur-like creature with a long thin tail, and a narrow head with an elongated snout. I can be found Mwinilunga district's Jiundu swampsof Western Zambia, Angola and Congo. What am I?`,
    options: { a: `Loch Ness`, b: `Kongamato`, c: `Buru`, d: `Ebu Gogo` },
    correct: {
      name: `Kongamato`,
      imgUrl: `https://vignette.wikia.nocookie.net/villains/images/c/c4/Kongamato3.jpg/revision/latest?cb=20171230053959`,
      says: `'Batten down the hatches'`
    }
  },
  {
    question: `I crave human flesh and am never satisfied. I grow in proportion to the meal I have just eaten, and appear gaunt like a skeleton with antlers. Humans named a psychosis after me since I can possess them, causing cannibalism, greed, and corruption. What am I?`,
    options: { a: `Wendigo`, b: `Jackalope`, c: `Mapinguari`, d: `Slenderman` },
    correct: {
      name: `Wendigo`,
      imgUrl: `https://www.legendsofamerica.com/wp-content/uploads/2017/10/Wendigo1.jpg`,
      says: `'You look delicious.'`
    }
  }
];

let score = 0;
let questionNum = 1;

function handleStartButton() {
  $('main').on('click', '#jsStartButton', function(e) {
    $('#jsStartQuiz').remove();
    renderQuizPage(renderQuestionAnswerSection());
  })
}

function renderQuizPage(section) {
  // render banner header
  // render jsQuestionAnswerForm section
  //join html parts
  $('main').html(renderBannerHeader() + '\n' + section);
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
        <p id="question">${questionObject.question}</p>
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
          <button id="jsSubmitButton" type="button">Submit</button>
        </fieldset>
      </form>
    </section>
  `;
}

function handleSubmitButton() {
  $('main').on('click', '#jsSubmitButton', function(e) {
    e.preventDefault();
    const selectedName = $('input:checked').val();
    const answerName = questions[questionNum - 1].correct.name;
    checkAnswerRenderResults(selectedName, answerName);
  });
}

function checkAnswerRenderResults(selection, answer) {
  if (answer === selection) {
    score++;
    renderQuizPage(renderCorrectSection());
  } else {
    renderQuizPage(renderWrongSection());
  }
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
      <button id="jsNextButton" type="button">Next Question</button>
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
      <button id="jsNextButton" type="button">Next Question</button>
    </section>
  `;
}

function handleNextButton() {
  $('main').on('click', '#jsNextButton', function(e) {
    e.preventDefault();
    if (questionNum < questions.length) {
      questionNum++;
      renderQuizPage(renderQuestionAnswerSection());
    } else {
      renderFinalResultsPage();
    }
  });
}

function renderFinalResultsPage() {
  $('main').html(renderResults());
}

function renderResults() {
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
  if (score >= questions.length * .6) {
    return `master`;
  } else if (score >= questions.length * .3 ) {
    return `apprentice`;
  }
  return `neophyte`;
}

function handleRestartButton() {
  $('main').on('click', '#jsRestartButton', function (e) {
    location.reload();
  });
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
