// 현재 비밀번호가 맞으면, 수정 / 변경, 삭제는 post지
function change_pw() {
    $.ajax({
        type: "POST",
        url: "/change_pw/api",
        data: {
            email_give: $('#email').val(),
            pw1_give: $('#password').val(),
            pw2_give: $('#password2').val(),
        },
        success: function (response) {
            console.log(response)
            if (response['result'] == 'success') {
                // 로그인에 성공하면 token을 쿠키에 저장!!!!
                $.cookie('mytoken', response['token']);
                alert('비밀번호 변경완료!')
                window.location.href = '/'
            } else {
                alert(response['msg'])
            }
        }
    })
}