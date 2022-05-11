const user = {
name: "juanito",
mail: "juanito@gmail.com",
age: "21"
}
console.log(user);

const products =[
   {
        name: "Boleta 3 días",
        price: 880000,
        id: 0,
        image : "./img/boleta3.png",
        quant:10,
        description:"Una manilla RFID válida para ingresar los 3 días al Festival Estéreo Picnic"
    },
    {
        name: "Boleta individual viernes",
        price: 435000,
        id: 1,
        image : "./img/boletaV.png",
        quant:10,
        description:"Un ticket válido para ingresar el día viernes 25 de marzo al Festival Estéreo Picnic"
    },
    {
        name: "Boleta individual sábado",
        price: 435000,
        id: 2,
        image : "./img/boletaS.png",
        quant:15,
        description:"Un ticket válido para ingresar el día sábado 26 de marzo al Festival Estéreo Picnic"
    },
    {
        name: "Boleta individual domingo",
        price: 435000,
        id: 3,
        image : "./img/boletaD.png",
        quant:7,
        description:"Un ticket válido para ingresar el día domingo 27 de marzo al Festival Estéreo Picnic"
    },
    {
        name: "Boleta 3 días VIP",
        price: 1690000,
        id: 4,
        image : "./img/boleta3VIP.png",
        quant:10,
        description:"Una manilla RFID válida para ingresar los 3 días al Festival Estéreo Picnic, e incluye beneficios VIP"
    },
];
products.forEach(e =>{
    const {name,price,id,image,quant,description} = e
    if(price>500000){
        document.getElementById(`obj${id}`).style.display = "block";
        document.getElementById(`obj${id}`).getElementsByClassName('name')[0].innerHTML = name;
        document.getElementById(`obj${id}`).getElementsByClassName('image')[0].src = image;
    }
}
    );