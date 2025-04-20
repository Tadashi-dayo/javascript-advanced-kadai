let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

const createText = () => {

  typed = '';
  typedfield.textContent = typed;

  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// 関数の実行 テキストを準備
// createText();

const keyPress = e => {
// ミスタイピング
  if(e.key !== untyped.substring(0,1)){
    wrap.classList.add('mistyped');

    setTimeout(() =>{
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

// 正解タイピング
  score++;
  // wrap.classList.remove('mistyped');
  typed += untyped.substring(0,1);
  // typed = typed + untyped.substring(0, 1);
  untyped = untyped.substring(1);

  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  if(untyped === ''){
    createText();
  }
};

const rankCheck = score => {
  // return `${score}文字打てました！`;

  let text = '';

  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;
  }

  return `${score}文字打てました\n${text}\n【OK】リトライ / 【キャンセル】終了`
};

const gameOver = id => {
  clearInterval(id);

  // console.log('ゲーム終了');
  const result = confirm(rankCheck(score));

  if(result == true){
    window.location.reload();
  }
};

const timer = () => {
  let time = count.textContent;

  const id = setInterval(() => {
    time--;
    count.textContent = time;

    if(time <= 0){
      // clearInterval(id);
      gameOver(id);
    }
  }, 1000);

};

// 対象要素.addEventListener(イベント, イベント発生時に呼び出す関数);
// document.addEventListener('keypress', keyPress);

start.addEventListener('click', () => {

  timer();

  createText();

  start.style.display = 'none';

  document.addEventListener('keypress',keyPress);

});

untypedfield.textContent = 'スタートボタンで開始';



