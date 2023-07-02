let score = 0;
let questionCount = 0;
let correctAnswerCount = 0;
let difficulty = 0;
let currentQuestion = null;

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function generateQuestion(difficulty) {
    const operation = getRandomNumber(3); // Gera um número aleatório de 1 a 3 para representar a operação: 1 - adição, 2 - subtração, 3 - multiplicação
    let num1, num2, answer, question;
  
    switch (operation) {
      case 1: // Adição
        num1 = getRandomNumber(difficulty);
        num2 = getRandomNumber(difficulty);
        answer = num1 + num2;
        question = `Qual é a soma de ${num1} e ${num2}?`;
        break;
      case 2: // Subtração
        num1 = getRandomNumber(difficulty);
        num2 = getRandomNumber(difficulty);
        // Certifique-se de que num1 seja maior ou igual a num2 para evitar números negativos
        if (num1 < num2) {
          [num1, num2] = [num2, num1]; // Troca os valores de num1 e num2
        }
        answer = num1 - num2;
        question = `Qual é a diferença entre ${num1} e ${num2}?`;
        break;
      case 3: // Multiplicação
        num1 = getRandomNumber(difficulty);
        num2 = getRandomNumber(difficulty);
        answer = num1 * num2;
        question = `Qual é o resultado de ${num1} multiplicado por ${num2}?`;
        break;
    }
  
    return {
      question: question,
      answer: answer.toString()
    };
  }
  

function startGame(selectedDifficulty) {
  difficulty = selectedDifficulty;
  score = 0;
  questionCount = 0;
  correctAnswerCount = 0;
  showNextQuestion();
}

function showNextQuestion() {
  if (questionCount < 5) {
    currentQuestion = generateQuestion(difficulty);
    document.getElementById('question').textContent = currentQuestion.question;
  } else {
    endGame();
  }
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value;
  if (userAnswer === currentQuestion.answer) {
    score += 1; // Pontuação de 1 ponto para cada resposta correta
    correctAnswerCount++;
    document.getElementById('result').textContent = 'Resposta correta!';
  } else {
    document.getElementById('result').textContent = 'Resposta incorreta.';
  }

  questionCount++;
  document.getElementById('score').textContent = `Pontuação atual: ${score}`;
  document.getElementById('answer').value = '';

  if (questionCount < 5) {
    showNextQuestion();
  } else {
    const playAgain = confirm('Deseja jogar novamente?');
    if (playAgain) {
      startGame(difficulty);
    } else {
      endGame();
    }
  }
}

function endGame() {
  document.getElementById('result').textContent = `Você respondeu corretamente ${correctAnswerCount} de 5 perguntas.`;
  document.getElementById('score').textContent = `Pontuação final: ${score}`;
  alert('Até logo!'); // Mensagem de "Até logo" quando o jogador para de jogar
}
