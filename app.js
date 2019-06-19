let score = 0;
let questionNum = 1;

function incrementScore() {
  score++;
}

function incrementQuestionNum() {
  questionNum++;
}

function handleStartButton() {
  $('main').on('click', '#jsStartButton', function(e) {
    $('#jsStartQuiz').remove();
    // renderBackground();
    renderQuizPage(renderQuestionAnswerSection());
  })
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
    incrementScore();
    renderQuizPage(renderCorrectSection());
  } else {
    renderQuizPage(renderWrongSection());
  }
}


function handleNextButton() {
  $('main').on('click', '#jsNextButton', function(e) {
    e.preventDefault();
    if (questionNum < questions.length) {
      incrementQuestionNum();
      renderQuizPage(renderQuestionAnswerSection());
    } else {
      renderFinalResultsPage();
    }
  });
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
