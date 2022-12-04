const fooddata = []

const randomValue = (array) => {
    const random  = Math.floor(Math.random() * array.length)
    return array[random];
}


let food = randomValue(fooddata);


const add_textbox = () => {
    const box = document.getElementById("ladder");
    const newP = document.createElement('p');
    const foodvalue = document.getElementById('want_food').value
    newP.innerHTML = "<p>"+foodvalue+"</p><input type='button' value='삭제' onclick='remove(this)'>";
    box.appendChild(newP);
}
const remove = (obj) => {
    document.getElementById('ladder').removeChild(obj.parentNode);
}