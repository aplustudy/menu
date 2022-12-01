const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);

function foodAll(){
  $.ajax({
      type: "GET",
      url: "/food_db",
      data: {},
      success: function (response) {
        const food = response['foods']
        const allFood = []
        for(let i = 0; i < food.length; i++){
          allFood.push(food[i].name)
        }
        console.log(allFood);
        const food9 = []
        for(let i = 0; food9.length < 9; i++){
          let a = allFood[Math.floor(Math.random() * allFood.length)]
          food9.includes(a) ? undefined : food9.push(a)
        if(food9.length === 9){
          product = [...food9]
          break;
        }
      }
      newMake();
      }
  });
}

const foodKorea = () => {
    $.ajax({
        type: "GET",
        url: "/food_db",
        data: {},
        async:false,
        success: function (response) {
          const food = response['foods']
          const korea = []
          for(let i = 0; i < food.length; i++){
            if(food[i].category === '한식'){
              korea.push(food[i].name)
            }
          }
          product.splice(0)
          const korea9 = []
          for(let i = 0; korea9.length < 9; i++){
              let a = korea[Math.floor(Math.random() * korea.length)]
              korea9.includes(a) ? undefined : korea9.push(a)
            if(korea9.length === 9){
              product = [...korea9]
              break;
            }
          }
          console.log(korea9);
          newMake();
         }})
}

const foodChina = () => {
  $.ajax({
    type: "GET",
    url: "/food_db",
    data: {},
    async:false,
    success: function (response) {
      const food = response['foods']
      const china = []
      for(let i = 0; i < food.length; i++){
        if(food[i].category === '중식'){
          china.push(food[i].name)
        }
      }
      product.splice(0)
      const china9 = []
      for(let i = 0; china9.length < 9; i++){
          let a = china[Math.floor(Math.random() * china.length)]
          china9.includes(a) ? undefined : china9.push(a)
        if(china9.length === 9){
          product = [...china9]
          break;
        }
      }
      newMake();
     }})
}

const foodJapen = () => {
  $.ajax({
    type: "GET",
    url: "/food_db",
    data: {},
    async:false,
    success: function (response) {
      const food = response['foods']
      const japen = []
      for(let i = 0; i < food.length; i++){
        if(food[i].category === '일식'){
          japen.push(food[i].name)
        }
      }
      product.splice(0)
      const japen9 = []
      for(let i = 0; japen9.length < 9; i++){
          let a = japen[Math.floor(Math.random() * japen.length)]
          japen9.includes(a) ? undefined : japen9.push(a)
        if(japen9.length === 9){
          product = [...japen9]
          break;
        }
      }
      console.log(japen9);
      newMake();
     }})
}

const foodAmerica = () => {
  $.ajax({
    type: "GET",
    url: "/food_db",
    data: {},
    async:false,
    success: function (response) {
      const food = response['foods']
      const america = []
      for(let i = 0; i < food.length; i++){
        if(food[i].category === '양식'){
          america.push(food[i].name)
        }
      }
      product.splice(0)
      const america9 = []
      for(let i = 0; i < america.length; i++){
        if(america9.length < 9){
          let a = america[Math.floor(Math.random() * america.length)]
          america9.includes(a) ? null : america9.push(a)
            }
        if(america9.length === 9){
          product = [...america9]
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
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;
  
  setTimeout(() => {
    
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
    const rotate = (ran * arc) + 3600 + (arc * 3) - (arc/4);
    
    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = `2s`;
    
    setTimeout(() => alert(`오늘의 메뉴는?! ${product[ran]} 어떠신가요?`), 2000);
  }, 1);
};

newMake();