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
                document.getElementById('user_id').value = user_id
                document.getElementById('user_email').value = user_email
            } else {
                console.log(response['msg'])
                document.getElementById('user_id').value = '익명'
                document.getElementById('user_email').value = '익명'
            }
        }
        })
  });
  