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
                $("#user_id").text(`${user_id}님 환영합니다!`)
                $("#user_email").text(`Email : ${user_email}`)
            } else {
                $("#user_id").text('로그인 해주세요!')
                $("#user_email").text('로그인 해주세요!')
            }
        }
        })
  });