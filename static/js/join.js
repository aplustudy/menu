const joinCall = () => {
    $.ajax({
        type: "POST",
        url: "/api/join",
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