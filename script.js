const questions = [
    {
        question: "우리나라의 최초 국가는 무엇인가요?",
        options: ["고구려", "백제", "신라", "고조선"],
        answer: "고조선"
    },
    {
        question: "조선 건국의 주역이 아닌 인물은?",
        options: ["이성계", "정도전", "정몽주", "하륜"],
        answer: "정몽주"
    },
    {
        question: "임진왜란이 발발한 연도는?",
        options: ["1592년", "1597년", "1636년", "1598년"],
        answer: "1592년"
    },
    {
        question: "세종대왕이 창제한 문자는?",
        options: ["한자", "이두", "향찰", "훈민정음"],
        answer: "훈민정음"
    },
    {
        question: "고구려의 전성기를 이끈 왕은?",
        options: ["광개토대왕", "장수왕", "태조왕", "근초고왕"],
        answer: "광개토대왕"
    },
    {
        question: "한국 전쟁이 발발한 연도는?",
        options: ["1945년", "1950년", "1953년", "1960년"],
        answer: "1950년"
    },
    {
        question: "을지문덕 장군이 살수대첩에서 승리한 나라는?",
        options: ["수나라", "당나라", "왜", "거란"],
        answer: "수나라"
    },
    {
        question: "신라가 삼국 통일을 이룬 시기에 활약한 인물은?",
        options: ["계백", "김유신", "연개소문", "강감찬"],
        answer: "김유신"
    },
    {
        question: "하얼빈역에서 의거를 한 인물은?",
        options: ["유관순", "이봉창", "윤봉길","안중근"],
        answer: "안중근"
    },
    {
        question: "1차 세계대전의 발생년도는?",
        options: ["1914", "1918", "1910", "1913"],
        answer: "1914"
    },
    {
        question: "대한민국의 건국년도는?",
        options: ["1950", "1919", "1948", "1945"],
        answer: "1948"
    },
    {
        question: "대항해시대를 시작한 인물은?",
        options: ["마젤란", "세실로즈", "빅토리아 여왕", "크리스토퍼 콜롬버스"],
        answer: "크리스토퍼 콜롬버스"
    },
    {
        question: "인도의 대표적인 독립운동가는?",
        options: ["자와할랄 네루", "아웅산", "마하트마 간디", "나세르"],
        answer: "마하트마 간디"
    },
    {
        question: "1929년에 일어나 전세계를 강타한 사건은?",
        options: ["1차 세계대전", "2차 세계대전", "소련붕괴", "대공황"],
        answer: "대공황"
    },
    {
        question: "1923년에 일본에서 조선인을 대상으로 일어난 학살은?",
        options: ["간도참변", "노구교사건", "관동대학살", "난징대학살"],
        answer: "관동대학살"
    },
    {
        question: "러시아의 공산주의 혁명가가 아닌 인물은?",
        options: ["블라디미르 레닌", "이오시프 스탈린", "레프 트로츠키", "보리스 옐친"],
        answer: "보리스 옐친"
    },
    {
        question: "중국의 왕정을 무너뜨린 혁명은?",
        options: ["신해혁명", "문화대혁명", "10월 혁명", "공산혁명"],
        answer: "신해혁명"
    },
    {
        question: "조선시대에 일어난 일은?",
        options: ["무모사화", "천리장성 건축", "무신정변", "5.16군사정변"],
        answer: "무모사화"
    },
    {
        question: "몽골제국의 정복자 이름은은?",
        options: ["오고타이 칸", "바투 칸", "쿠빌라이 칸", "칭키즈 칸"],
        answer: "칭기즈 칸칸"
    },
];

let currentScore = 0;
let availableQuestions = []; // 아직 출제되지 않은 문제들을 저장할 배열
let currentQuestionData = null; // 현재 출제된 문제의 데이터

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreElement = document.getElementById('score');
const feedbackMessage = document.getElementById('feedback-message');
const nextQuestionButton = document.getElementById('next-question-button');
const questionArea = document.getElementById('question-area');
const resultArea = document.getElementById('result-area');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// 게임 시작 및 재시작
function initializeGame() {
    currentScore = 0;
    scoreElement.textContent = `현재 점수: ${currentScore}`;
    // 깊은 복사를 통해 원래 questions 배열을 보존
    availableQuestions = [...questions]; 
    
    questionArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    feedbackMessage.classList.add('hidden'); // 피드백 메시지 숨기기
    nextQuestionButton.classList.add('hidden'); // 다음 문제 버튼 숨기기
    
    displayRandomQuestion();
}

// 랜덤 문제 표시
function displayRandomQuestion() {
    // 모든 문제를 다 풀었을 경우
    if (availableQuestions.length === 0) {
        endGame(); // 모든 문제를 다 풀었으면 게임 종료
        return;
    }

    // 피드백 메시지와 다음 문제 버튼 숨기기
    feedbackMessage.classList.add('hidden');
    nextQuestionButton.classList.add('hidden');

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestionData = availableQuestions[randomIndex];

    questionElement.textContent = currentQuestionData.question;
    optionsContainer.innerHTML = ''; // 기존 선택지 초기화

    // 선택지 섞기
    const shuffledOptions = [...currentQuestionData.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        // 각 버튼에 클릭 이벤트 리스너 추가
        button.addEventListener('click', () => handleOptionClick(button, option, currentQuestionData.answer));
        optionsContainer.appendChild(button);
    });

    // 출제된 문제는 availableQuestions 배열에서 제거
    availableQuestions.splice(randomIndex, 1);
}

// 선택지 클릭 처리
function handleOptionClick(clickedButton, selectedOption, correctAnswer) {
    // 이미 답을 선택했으면 더 이상 클릭할 수 없도록 방지
    // (nextQuestionButton이 이미 보인다는 것은 답이 선택되었다는 의미)
    if (!nextQuestionButton.classList.contains('hidden')) {
        return;
    }

    // 모든 선택지 버튼 비활성화
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.add('disabled');
        // 이벤트 리스너를 제거하는 대신, disabled 클래스가 있을 때 hover 효과를 없애는 CSS를 활용했습니다.
        // button.removeEventListener('click', () => {}); // 이 부분은 선택 사항
    });

    if (selectedOption === correctAnswer) {
        // 정답 처리
        clickedButton.classList.add('correct');
        feedbackMessage.textContent = "정답입니다! 다음 문제로 진행해주세요.";
        feedbackMessage.classList.remove('wrong-feedback');
        feedbackMessage.classList.add('correct-feedback');
        feedbackMessage.classList.remove('hidden');
        currentScore++;
        scoreElement.textContent = `현재 점수: ${currentScore}`;
    } else {
        // 오답 처리
        clickedButton.classList.add('wrong');
        // 정답 버튼도 표시하여 무엇이 정답이었는지 알려줌
        Array.from(optionsContainer.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });

        feedbackMessage.textContent = `오답입니다! 정답은 '${correctAnswer}'였습니다. 다음 문제로 진행해주세요.`;
        feedbackMessage.classList.remove('correct-feedback');
        feedbackMessage.classList.add('wrong-feedback');
        feedbackMessage.classList.remove('hidden');
        // endGame(); // 오답 시 게임 종료 로직 제거
    }
    nextQuestionButton.classList.remove('hidden'); // 정답/오답 상관없이 '다음 문제' 버튼 표시
}

// 게임 종료 (모든 문제를 다 풀었을 때만 호출)
function endGame() {
    questionArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    finalScoreElement.textContent = `최종 점수: ${currentScore}`;
}

// 다음 문제 버튼 클릭 이벤트
nextQuestionButton.addEventListener('click', displayRandomQuestion);

// 다시 시작 버튼 클릭 이벤트
restartButton.addEventListener('click', initializeGame);

// 페이지 로드 시 게임 초기화
initializeGame();