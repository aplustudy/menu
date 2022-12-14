const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);

const foodSelect = (selected) => {
  $.ajax({
      type: "GET",
      url: "/food_db",
      data: {},
      async: false,
      success: function (response) {
        const food = response['foods']
        const foodList = []
        for(let i = 0; i < food.length; i++){
          if(food[i].category === selected || selected === "랜덤"){
            foodList.push(food[i].name)
          }
        }
        product.splice(0)
        const foods_len = (selected === "한식" || selected === "랜덤" ? 9 : 6)
        const foods = []
        for(let i = 0; foods.length < foods_len; i++){
            let a = foodList[Math.floor(Math.random() * foodList.length)]
            foods.includes(a) ? undefined : foods.push(a)
          if(foods.length === foods_len){
            product = [...foods]
            break;
          }
        }
        newMake();
       }})
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
    
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
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