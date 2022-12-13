const joinCall = () => {

    if ($('#email').val() == ""){
        alert('아이디(이메일 주소)를 입력해주세요.')
        return false;
    }
    if ($('#password').val() == ""){
        alert('비밀번호를 입력해주세요.')
        return false;
    }
    if ($('#name').val() == ""){
        alert('이름을 입력해주세요.')
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/join",
        data: {
            email_give: $('#email').val(),
            password_give: $('#password').val(),
            name_give: $('#name').val()
        },
        success: function (response) {
            if (response['result'] == 'success') {
                alert('회원가입이 완료되었습니다.')
                window.location.href = '/'
            } else {
                alert(response['msg'])
            }
        }
    })
}