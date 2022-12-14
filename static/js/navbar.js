// 호출하자마자 불러오기
$(document).ready(
  function () {
  $.ajax({
      type: "GET",
      url: "/login/isAuth",
      data: {},
      success: function (response) {
          if (response['result'] == 'success') {
              let name = response['name']
              $("#myname2").text(name + "님, 환영합니다!");
              let html = 
              `<li><a class="dropdown-item" href="/user_page">내정보 보기</a></li>
              <li><a class="dropdown-item" onclick="logout()" value="로그아웃" href="/">로그아웃</a></li>`
              $("#dropdown").append(html)
          } else {
              let html = 
              `<li><a class="dropdown-item" href="/login">로그인</a></li>
              <li><a class="dropdown-item" href="/join" value="회원가입" href="/">회원가입</a></li>`
              $("#dropdown").append(html)
          }
      }
  })
});

// 로그아웃 추가_토큰삭제
function logout() {
  $.removeCookie('mytoken', {path: '/'});
}

const userId = ''

class NavBar extends HTMLElement {

    // 생성자 함수
    constructor() {

        super();
        this.setAttribute('title', '타이틀');
    }
    // Custom Element가 생성될때 호출
    connectedCallback() {
        this.render();
    }
    // 해당요소가 새로운 문서로 이동될때 호출
    adoptCallback() {
    }
    // 요소의 속성이 변경될때 호출
    attributeChangedCallback(attrName, oldVal, newVal) {

        this.render();

    }


    // attributeChangedCallback 함수에서 관찰할 항목을 리턴

    static get observedAttributes() {

        return ['title'];

    }


    // title 속성 리턴

    get title() {

        return this.getAttribute('title');

    }


    // Custom Element가 제거될때 호출

    disconnectedCallback() {

        // console.log('div-header element removed.');

    }


    // 렌더링 메소드

    render() {

        this.innerHTML = `

		<div class="nav-bar">
        <nav class="navbar fixed-top" style="background-color:rgb(210, 210, 210)">
          <div class="container-fluid">
          <a class="navbar-brand" href="/"><img src="/static/images/favicon.png" style="width: 30px; height: 30px; margin-right:10px">
          <span style="color: pink;text-shadow:1px 1px 1px #000;">오</span>
          <span style="color: rgb(250, 133, 133);text-shadow:1px 1px 1px #000;">메</span>
          <span style="color: deeppink;text-shadow:1px 1px 1px #000;">추!</span></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">오메추</h5>
                <h6 id="userId">${userId}</h6>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">메인화면</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/roulette">랜덤 룰렛</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/ladder">커스텀 룰렛</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/test">메뉴 추천</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/board">게시판</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      내정보
                    </a>
                    <ul class="dropdown-menu" id="dropdown">
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

		`

    }

}


window.customElements.define('main-nav-bar', NavBar);