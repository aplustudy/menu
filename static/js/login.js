function loginCall() {
    $.ajax({
        type: "POST",
        url: "/login/",
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

// 호출하자마자 불러오기
// $('document').ready(function () {
//     $.ajax({
//         type: "GET",
//         url: "/login/isAuth",
//         data: {},
//         success: function (response) {
//             if (response['result'] == 'success') {
//                 let name = response['name']
//                 $("#myname2").text(name + "님, 환영합니다!");

//             } else {
//                 console.log(response['msg'])
//             }
//         }
//     })
// });