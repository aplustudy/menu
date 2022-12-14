function Josa(txt, josa)
{
	var code = txt.charCodeAt(txt.length-1) - 44032;

	// 원본 문구가 없을때는 빈 문자열 반환
	if (txt.length == 0) return '';

	// 한글이 아닐때
	if (code < 0 || code > 11171) return txt;

	if (code % 28 == 0) return txt + Josa.get(josa, false);
	else return txt + Josa.get(josa, true);
}
Josa.get = function (josa, jong) {
	// jong : true면 받침있음, false면 받침없음

	if (josa == '을' || josa == '를') return (jong?'을':'를');
	if (josa == '이' || josa == '가') return (jong?'이':'가');
	if (josa == '은' || josa == '는') return (jong?'은':'는');
	if (josa == '와' || josa == '과') return (jong?'와':'과');

	// 알 수 없는 조사
	return '**';
}

// 더블 클릭시 화면 확대를 막는 기능 -> 구글링으로 긁어온거라 그냥 그런 기능이구나
// 생각하면 편합니다..ㅎㅎ document.body <- 여기에 이벤트 리스너(터치)로 터치가 다중으로
// 클릭되면 마지막 터치는 씹는식으로 작동되는 코드입니다.
document.body.addEventListener(
  'touchstart',
  function (e) {
    if (e.touches.length > 1 || e.targetTouches.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  },
  { passive: false }
);
// 문제 넘어갈때 쓸 변수입니다.
let num = 1;
// 문제와 문제 번호를 객체에 담았음 객체란 ? {} <- ex) q.1.title -> 이런식으로 사용
// 배열 + 객체는 q[0].title <- 이런식으로 사용
const q = {
  1: {
    title: '면 or 밥 당신의 선택은??',
    type: 'q1',
    A: '밥',
    B: '면',
    C: '둘 다 별로'
  },
  2: {
    title: '매운 음식 vs 안 매운 음식',
    type: 'q2',
    A: '매워야 음식이지',
    B: '나는야 맵찔이',
    C: '상관없어'
  },
  3: { title: '국물 vs 국물 X', type: 'q3', A: '국물', B: '국물 X', C: '상관없어'},
  4: { title: '고기 vs 고기 X', type: 'q4', A: '고기', B: '고기 X', C: '상관없어'},
};
// --------------------------------------------------------------

// 카테고리별 클릭하면 cate id값을 가진 input에 value를 정해줌
//  -> 나중에 결과값 낼때 써야함

$('#KR').click(function () {
  let cate = $('#cate').val('한식');
  start();
});
$('#CN').click(function () {
  let cate = $('#cate').val('중식');
  start();
});
$('#AM').click(function () {
  let cate = $('#cate').val('양식');
  num = 2
  $('#q1').val(-1);
  start();
});
$('#JP').click(function () {
  let cate = $('#cate').val('일식');
  start();
});
// 여기까지 카테고리별 클릭 기능 ---------------

// 여기부턴 버튼 눌렀을때 화면 숨기고 다음 화면 나오게 하는 기능입니다.
// 기본 js 기능이 아닌 jquery 기능이에요!
// 직관적인 코드라 cateStart 실행시 start 화면은 숨기고 그 다음 카테 고르는 화면 나오는 기능입니다.
const cateStart = () => {
  setTimeout(() => {
    $('.start').hide();
  $('.cate_qus').show();
  }, 100)
};
function start() {
  $('.cate_qus').hide();
  $('.question').show();
  next();
}
// 버튼이 위 아래로 2개가 있는데 그 중 위에 버튼을 누르면 value 값에 + 1 해주는 함수입니다.
$('#A').click(function () {
  let type = $('#type').val();
  $('#' + type).val(1);
  next();
});
$('#B').click(function () {
  let type = $('#type').val();
  $('#' + type).val(0);
  next();
});
$('#C').click(function () {
  let type = $('#type').val();
  $('#' + type).val(-1);
  next();
});

// 마지막 결과값을 뽑기 위해 Ajax 요청으로 db에 값을 가져오는 코드입니다.
const menuAjax = (cate, menu) => {
    const foodList = [];
    const randomFoodList = [];
    let b = []
    let rf = ''
  $.ajax({
    type: 'GET', // Get은 데이터 요청 POST는 데이터 보내기
    url: '/food_db',
    data: {},
    async: false, // 비동기로 진행된다는 의미입니다. 비동기란? 대충 쉽게 설명하자면 서버 요청이라
    // 시간이 오래 걸리니까 이 다음 코드들 먼저 실행하라는 뜻입니다.
    // JS는 모든 작업이 하나씩 하나씩 진행됩니다. 하나를 진행중인데 이게 1분짜리 코드면
    // 말그대로 화면이 멈춰버리는 불상사가 생기는걸 막기위해서 이런식으로 코드를 작성합니다.
    success: function (response) {
      const food = response['foods'];
      for (let i = 0; i < food.length; i++) {
        let [q1, q2, q3, q4] = [food[i].q1, food[i].q2, food[i].q3, food[i].q4];
        let condition = food[i].category === cate &&
                        (q1 == menu.q1) && (menu.q2 == -1 || q2 == -1 || q2 == menu.q2) && 
                        (menu.q3 == -1 || q3 == -1 || q3 == menu.q3) && (menu.q4 == -1 || q4 == -1 || q4 == menu.q4);
        if (food[i].category === cate){
          randomFoodList.push(food[i].name)
        }
        if (condition){ 
          foodList.push(food[i].name) 
        };
      }
      b = [...foodList]
      rf = randomFoodList[[Math.floor(Math.random() * randomFoodList.length)]]
    },
  });
  return [b, rf]
};
// 마지막 결과값을 보여주기 위해 input에 담긴 벨류들을 다 가져오는 로직입니다.
const whatMenu = () => {
  let menu = $('#cate').val();
  let menu_choice = {
    q1: $('#q1').val(),
    q2: $('#q2').val(),
    q3: $('#q3').val(),
    q4: $('#q4').val(),
  };
    const [result, rf] = menuAjax(menu, menu_choice)
    const resultOne = result[[Math.floor(Math.random() * result.length)]]
    if(resultOne){
        $("#result_menu").html(resultOne)
        for(let i = 0; i < result.length; i++){
          let new_pTag = document.createElement('p');
          new_pTag.setAttribute('class', 'pTag');
          new_pTag.innerHTML = result[i];
          let menulist = document.getElementById('menulist');
        
            menulist.append(new_pTag);

        }

    }
    else{
      $("#result_menu").html(`이런 메뉴는 없어요... 하지만 ${Josa(rf,"은")} 어떠세요?`)
      $("#all_menu_show").hide()
    }
    
    $('.loading').hide();
    $('.menu_result').show();
};

// 다음 화면으로 넘기기 위해 만약 문제가 끝나지 않았다면(num < 5) else문이 다음 문제로 바꿔주는 구조입니다.
function next() {
  if (num === 5) {
    $('.question').hide();
    $('.loading').show();
    setTimeout(() => whatMenu(), 2000);
  } else {
    $('.progress-bar').attr('style', 'width: calc(100/5*' + num + '%)');
    $('#title').html(q[num]['title']);
    $('#type').val(q[num]['type']);
    $('#A').html(q[num]['A']);
    $('#B').html(q[num]['B']);
    $('#C').html(q[num]['C']);
    num++;
  }
}
const allmenu = () => {
  $('.loading').toggle();
}
Kakao.init('ce746e4fd5d56bc3cadac185fc799d08');
function kakaoShare() {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '뭐먹지 월드컵',
      description: '오늘 메뉴 뭐먹지.. 고민되시나요?',
      imageUrl:
        'http://omecu.shop/static/images/test.png',
      link: {
        mobileWebUrl: 'http://omecu.shop',
        webUrl: 'http://omecu.shop',
      },
    },
    buttons: [
      {
        title: '테스트 하기',
        link: {
          mobileWebUrl: 'http://omecu.shop',
          webUrl: 'http://omecu.shop',
        },
      },
    ],
  });
}

function clip(){
        
  var url = 'http://omecu.shop';
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = url;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("복사 완료!")
}