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
                document.getElementById('login_name').value = '익명'
                document.getElementById('login_email').value = 'anonymous@anonymous.com'
                $("#anonymous_warn").text("익명 게시글은 수정 및 삭제가 불가능합니다.");
            }
        }
        })
  });
  
  $('.file_delete').click( function() {
    $("#file_upload").val("");
  } );

  $('#tab1').click( function() {
    $("#dropdownMenuButton1").text('일반')
    $("#tab").val('일반')
    $("#tab1").attr('class','dropdown-item active');
    $("#tab2").attr('class','dropdown-item');
    $("#tab3").attr('class','dropdown-item');
  } );

  $('#tab2').click( function() {
    $("#dropdownMenuButton1").text('오늘 메뉴')
    $("#tab").val('오늘 메뉴')
    $("#tab1").attr('class','dropdown-item');
    $("#tab2").attr('class','dropdown-item active');
    $("#tab3").attr('class','dropdown-item');
  } );

  $('#tab3').click( function() {
    $("#dropdownMenuButton1").text('맛집 추천')
    $("#tab").val('맛집 추천')
    $("#tab1").attr('class','dropdown-item');
    $("#tab2").attr('class','dropdown-item');
    $("#tab3").attr('class','dropdown-item active');
  } );
  