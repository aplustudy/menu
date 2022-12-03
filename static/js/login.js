function login() {
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: {
            email_give: $('#email').val(),
            password_give: $('#password').val(),
        },
        success: function (response) {
            console.log(response)
            if (response['result'] == 'success') {
                // 로그인에 성공하면 token을 쿠키에 저장!!!!
                $.cookie('mytoken', response['token']);
                alert('로그인 완료!')
                window.location.href = '/'
            } else {
                alert(response['msg'])
            }
        }
    })
}