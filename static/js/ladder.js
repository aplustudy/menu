console.log($.cookie('ladder') ? $.cookie('ladder').split(',') : 'no cookie!')

$(document).ready(
  function () {
    if ($.cookie('ladder')){
      let cookieSplit = $.cookie('ladder').split(',')
      for(let i = 0; i < cookieSplit.length; i++){
        const box = document.getElementById("ladder");
        const newP = document.createElement('div');
        newP.classList.add('p_tag')
        const foodValue = cookieSplit[i]
        if(foodValue !== ""){
            newP.innerHTML = "<p class='ladder_p_tag'>" + foodValue + "</p><input id='"+foodValue+"' type='button' class='ladder_btn' value='삭제' onclick='remove(this)'>";
            box.appendChild(newP);
            fooddata.push(foodValue);
            parent.document.getElementById('want_food').value='';
        }
      }
    }
  }
);

const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);
let fooddata = []

const randomValue = (array) => {
    if(array.length === 0){
        const random  = Math.floor(Math.random() * array.length)
        return array[random];
    }else{
        const random  = Math.floor(Math.random() * array.length)
        return array[random];
    }
}

const makeRl = () => {
  console.log(fooddata)
  if (fooddata.length !== 0){
    product = [...fooddata]
    newMake()
    $("#ladder_main").toggle()
    $("#makeRl").toggle()
  }else{
    alert('리스트에 메뉴가 없어요!')
  }
}

$("#want_food").keyup(function(event) {
  if (event.key == "Enter") {
    addTextbox()
  }
});
const addTextbox = () => {
    const box = document.getElementById("ladder");
    const newP = document.createElement('div');
    newP.classList.add('p_tag')
    const foodValue = document.getElementById('want_food').value
    if(foodValue !== ""){
        newP.innerHTML = "<p class='ladder_p_tag'>" + foodValue + "</p><input id='"+foodValue+"' type='button' class='ladder_btn' value='삭제' onclick='remove(this)'>";
        box.appendChild(newP);
        fooddata.push(foodValue);
        console.log(fooddata)
        $.cookie('ladder', fooddata, { expires: 36500, path: '/' });
        parent.document.getElementById('want_food').value='';
    }
}
const remove = (obj) => {
    document.getElementById('ladder').removeChild(obj.parentNode);
    for(let i = 0; i < fooddata.length; i++){
      if(fooddata[i] === obj.id){
        fooddata.splice(i, 1);
        $.cookie('ladder', fooddata, { expires: 36500, path: '/' });
        console.log(fooddata)
        return
      }
    }
}

const remove_all = (obj) => {
  if (confirm("정말 초기화 하시겠습니까?") === true){
    document.getElementById('ladder').replaceChildren();
    fooddata = []
    console.log(fooddata)
    $.cookie('ladder', fooddata, { expires: 36500, path: '/' });
  }
}

const randomFood = () => {
    let food = randomValue(fooddata);
    if(food === undefined) {
        alert("음식 안드시려구요?")
    }
    else{
        alert("오늘의 밥은 " + food + " 드셔야겠네요")
    }
}

let product = [
    "떡볶이", '돈가스', "초밥", "피자", "냉면", "치킨", '족발', "피자", "삼겹살"
  ];
  
  const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f ", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];
  
  const newMake = () => {
      const [cw, ch] = [$c.width / 2, $c.height / 2];
      const arc = Math.PI / (product.length / 2);
    
      for (let i = 0; i < product.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i % (colors.length -1)];
        ctx.moveTo(cw, ch);
        ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
        ctx.fill();
        ctx.closePath();
      }
  
      ctx.fillStyle = "#fff";
      ctx.font = "18px Pretendard";
      ctx.textAlign = "center";
  
      for (let i = 0; i < product.length; i++) {
        const angle = (arc * i) + (arc / 2);
  
        ctx.save()  ;
  
        ctx.translate(
          cw + Math.cos(angle) * (cw - 50),
          ch + Math.sin(angle) * (ch - 50),
        );
  
        ctx.rotate(angle + Math.PI / 2);
  
        product[i].split(" ").forEach((text, j) => {
          ctx.fillText(text, 0, 30 * j);
        });
  
        ctx.restore();
      }
  }
  
  const rotate = () => {
    target('on')
    $c.style.transform = `initial`;
    $c.style.transition = `initial`;
    
    setTimeout(() => {
      
    const ran = Math.floor(Math.random() * product.length)
    const arc = 360 / product.length
    const rotate = (ran * arc) + 3600 + (90 + arc/2)
    
    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = `2s`;
    setTimeout(() => {
      target('off')
      alert(`오늘의 메뉴는?! ${product[ran]} 어떠신가요?`)
    }
      , 2000);
  }, 1);
};
const target = (tf) => {
  const target = document.getElementById('r_b')
  const target1 = document.getElementById('r_b1')
  if(tf === 'on'){
  target.disabled = true;
  target1.disabled = true;
  }
  if(tf === 'off'){
    target.disabled = false;
    target1.disabled = false;
}}
  newMake();