let score = 0;
let questionNum = 1;

function incrementScore() {
  score++;
}

function incrementQuestionNum() {
  questionNum++;
}

function renderStars() {
  const starCount = 20;
  const starArr = [];
  for (let i = 1; i <= starCount; i++) {
    const size = randomNum(8, 13) + `px`;
    const positionTop = randomNum(10, 300) + `px`;
    const positionLeft = randomNum(10, $(window).width() - 10) + `px`;
    const singleStar = `<div class="star" style="width:${size}; height:${size}; top:${positionTop}; left:${positionLeft};"></div>`;
    starArr.push(singleStar);
  }
  $('#layerStars').html(starArr.join('\n'))
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function handleStartButton() {
  $('main').on('click', '#jsStartButton', function(e) {
    $('#jsStartQuiz').remove();
    renderBackground();
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
      renderBackground2();
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
  renderStars();
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
