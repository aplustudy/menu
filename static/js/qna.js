// 포스팅기능
// $(document).ready(function(){
//     listing();
//   });


$(document).ready(
    function () {
        $.ajax({
        type: "GET",
        url: "/login/isAuth",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let user_id = response['name']
                let user_email = response['email']
                $("#user_id").text(`${user_id}님, 문의사항을 남겨주세요! 순차 확인 후 아래 이메일로 답변드리도록 하겠습니다.`)
                $("#user_email").text(`${user_email}`)
            } else {
                console.log(response['msg'])
                $("#user_id").text('로그인 해주세요!')
                $("#user_email").text('로그인 해주세요!')
            }
        }
        })
  });
  

// 나중에 내가 쓴 글만 보게 해볼까. 그때 참고용.
//   function board_list_mypost(){
//     let user_email = $('#user_email').val()
//     $.ajax({
//         type: 'POST',
//         url: '/user_page/mypost',
//         data: { user_email_give : user_email },
//         success: function (response) {
//         }
//     });
// }



  function listing() {
      $.ajax({
          type: 'GET',
          url: '/qna',
          data: {},
          success: function (response) {
              let rows = response['qna']
              for (let i = 0; i<rows.length; i++){
                  let comment = rows[i]['comment']
                  let email = rows[i]['user_email']

                  let temp_html = `<div class="col">
                                      <div class="card h-100">
                                          <div class="card-body">
                                              <h5 class="card-title">${email}</h5>
                                              <p class="mycomment">${comment}</p>
                                          </div>
                                      </div>
                                  </div>`

                  $('#qna-box').append(temp_html)
              }
          }
      })
  }

  function posting() {
      let email = $('#user_email').html()
      let comment = $('#comment').val()

    if (email == ""){
        alert('로그인 후 이용해주세요.')
        return false;
    }
    if ($('#comment').val() == ""){
        alert('문의하실 내용을 입력해주세요.')
        return false;
    }

      $.ajax({
          type: 'POST',
          url: '/qna',
          data: {email_give:email, comment_give:comment},
          success: function (response) {
              alert(response['msg'])
              window.location.reload()
          }
      });

  }