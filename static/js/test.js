
document.body.addEventListener('touchstart', function(e) {
    if ( (e.touches.length > 1) || e.targetTouches.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }, {passive: false});

var num = 1;

        var q = {
            1: {"title": "면 or 밥 당신의 선택은?? ( 빵은 햄버거 드세요 )",
            "type": "q1", 
            "A": "면", 
            "B": "밥",},

            2: {"title": "매운 음식 vs 안 매운 음식", 
            "type": "q2", 
            "A": "매워야 음식이지", 
            "B": "나는야 맵찔이",
            },

            3: {"title": "국물 vs 국물 X",
            "type": "q3", 
            "A": "국물", 
            "B": "국물 X",
            },
            4: {"title": "고기 vs 고기 X", 
            "type": "q4", 
            "A": "고기", 
            "B": "고기 X",
            },
            
        }
    $("#KR").click(function(){
            let cate = $("#cate").val('한식');
            start()
        })
        $("#CN").click(function(){
            let cate = $("#cate").val('중식');
            start()
        })
        $("#AM").click(function(){
            let cate = $("#cate").val('양식');
            start()
        })
        $("#JP").click(function(){
            let cate = $("#cate").val('일식');
            start()
        })
        const cateStart = () => {
            $(".start").hide();
            $(".cate_qus").show();
        }
        function start() {
            $(".cate_qus").hide();
            $(".question").show();
            next();
            };

        $("#A").click(function() {
            var type = $("#type").val();
            var preValue = $("#"+type).val();
            $("#"+type).val(parseInt(preValue)+1)
            next();
        });
        $("#B").click(function(){
            next();
        });
        const menuAjax = (cate) => {
                $.ajax({
                    type: "GET",
                    url: "/food_db",
                    data: {},
                    async: false,
                    success: function (response) {
                      const food = response['foods']
                      console.log(food);
                      const foodList = []
                      for(let i = 0; i < food.length; i++){
                        if(food[i].category === cate){
                          foodList.push(food[i].name)
                        }
                      }
        }})}

        function whatMenu() {
            let menu = $("#cate").val() 
            let menu_choice = {
                1 : $("#q1").val(),
                2 : $("#q2").val(),
                3 : $("#q3").val(),
                4 : $("#q4").val()
            }
            menuAjax()
            $(".loading").hide()
            $(".menu_result").show()
        }
        function next() {
            if(num ===  5) {
                $(".question").hide();
                $(".loading").show();
                setTimeout(() => whatMenu(),2000);
            } else {
                $(".progress-bar").attr('style','width: calc(100/5*'+num+'%)');
                $("#title").html(q[num]["title"]);
                $("#type").val(q[num]["type"]);
                $("#A").html(q[num]["A"]);
                $("#B").html(q[num]["B"]);
                num++;
        }}