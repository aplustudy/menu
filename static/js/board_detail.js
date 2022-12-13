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

function delete_bucket(){
    if (confirm("정말 삭제하시겠습니까?") === true){
        $.ajax({
            type: "POST",
            url: "/board/delete",
            data: { index_give : $('#board_index').val(), email_give : $('#login_email').val() },
            success: function (response) {
                console.log(response)
                var link='/board/';
                location.href=link;
            }
        });
    }
} 