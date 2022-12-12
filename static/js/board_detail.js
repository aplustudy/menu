$(document).ready(
    function () {
        $.ajax({
        type: "GET",
        url: "/login/isAuth",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let login_name = response['name']
                document.getElementById('login_name').value = login_name
            } else {
                console.log(response['msg'])
                document.getElementById('login_name').value = null
            }
        }
        })
  });
  