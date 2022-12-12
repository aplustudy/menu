//회원 탈퇴
function member_del() {

    if ($('#email').val() == ""){
        alert('사용 중인 아이디(이메일 주소)를 입력해주세요.')
        return false;
    }
    if ($('#password').val() == ""){
        alert('사용 중인 비밀번호를 입력해주세요.')
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/member_del/api",
        data: {
            email_give: $('#email').val(),
            pw_give: $('#password').val(),
        },
        success: function (response) {
            console.log(response)
            if (response['result'] == 'success') {
                // 로그인에 성공하면 token을 쿠키에 저장!!!!
                // $.cookie('mytoken', response['token']);
                alert('탈퇴 완료!')
                window.location.href = '/'
            } else {
                alert(response['msg'])
            }
        }
    })
}