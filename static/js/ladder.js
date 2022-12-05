const fooddata = []

const randomValue = (array) => {
    if(array.length === 0){
        const random  = Math.floor(Math.random() * array.length)
        return array[random];
    }else{
        const random  = Math.floor(Math.random() * array.length)
        return array[random];
    }
}



const addTextbox = () => {
    const box = document.getElementById("ladder");
    const newP = document.createElement('div');
    newP.classList.add('p_tag')
    const foodValue = document.getElementById('want_food').value
    if(foodValue === ""){
        alert("메뉴를 입력해주셔야죠..")
    }
    else {
        newP.innerHTML = "<p class='ladder_p_tag'>" + foodValue + "</p><input type='button' class='ladder_btn' value='삭제' onclick='remove(this)'>";
        box.appendChild(newP);
        fooddata.push(foodValue);
        parent.document.getElementById('want_food').value='';
    }
}
const remove = (obj) => {
    document.getElementById('ladder').removeChild(obj.parentNode);
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