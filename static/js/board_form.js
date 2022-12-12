$(document).ready(
    function () {
        $.ajax({
        type: "GET",
        url: "/login/isAuth",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let login_name = response['name']
                let login_email = response['email']
                document.getElementById('login_name').value = login_name
                document.getElementById('login_email').value = login_email
            } else {
                console.log(response['msg'])
                document.getElementById('login_name').value = '익명'
                document.getElementById('login_email').value = '익명'
            }
        }
        })
  });
  