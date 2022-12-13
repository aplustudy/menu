// 현재 아이디 비밀번호가 맞으면, 비밀번호2로 변경
function change_pw() {

    if ($('#email').val() == ""){
        alert('현재 아이디(이메일 주소)를 입력해주세요.')
        return false;
    }
    if ($('#password').val() == ""){
        alert('현재 비밀번호를 입력해주세요.')
        return false;
    }
    if ($('#password2').val() == ""){
        alert('변경할 비밀번호를 입력해주세요.')
        return false;
    }

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