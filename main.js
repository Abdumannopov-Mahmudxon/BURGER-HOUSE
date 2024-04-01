document.body.style.zoom = window.innerWidth / 1920;

let burgers =[
    {
        id: 1,
        amount: 1,
        renown: 'Бургер чеддер & бекон',
        description: 'Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус',
        price: 8,
        weight: 360
    },
    {
        id: 2,
        amount: 1,
        renown: 'BBQ с беконом и курицей',
        description: 'Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ',
        price: 7,
        weight: 390
    },
    {
        id: 3,
        amount: 1,
        renown: 'Дабл биф бургер',
        description: 'Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица',
        price: 10,
        weight: 420
    },
    {
        id: 4,
        amount: 1,
        renown: 'Баварский бургер',
        description: 'Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг',
        price: 7,
        weight: 220
    },
    {
        id: 5,
        amount: 1,
        renown: 'Бекон чизбургер',
        description: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень',
        price: 8,
        weight: 220
    },
    {
        id: 6,
        amount: 1,
        renown: 'Индиана бургер',
        description: 'Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
        price: 9,
        weight: 320
    },
]

let list = document.getElementById('list');
let count = JSON.parse(localStorage.getItem('count')) || 0;

if(list){
    burgers.map((item) => {
        list.innerHTML += `
        <li class="card">
            <div class="content">
                <div class="item-img">
                    <img src="./images/${item.id}.png" alt="...">
                </div>
                <h5 class="card-title">${item.renown}</h5>
                <p class="card-text">${item.description}</p>
                <div class="content-footer">
                    <div class="content-footer-frame">
                        <p class="card-price">${item.price} $</p>
                        <p class="card-weight">${item.weight} гр</p>
                    </div>
                    <button class="btn-cart" onclick="addCart(${item.id})">
                        Заказать<img src="./images/vector.png">
                    </button>
                </div>
            </div>
        </li>
        `;
    });
}

let cartArr = JSON.parse(localStorage.getItem('cart')) || [];
const addCart = (ID) => {
    let newItem = burgers.find((item) => item.id == ID);
    let existingItem = cartArr.find((item) => item.id == ID);

    if (existingItem) {
        existingItem.amount += 1; // Agar maxsulot allaqachon savatda mavjud bo'lsa, sonini o'zgartiramiz
    } else {
        newItem.amount = 1; // Aks holda yangi maxsulotni savatga qo'shamiz
        cartArr.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(cartArr));

    let totalPrice = newItem.price; // Narxni hisoblash
    count += totalPrice; // Umumiy narxga qo'shish

    document.getElementById('count').innerHTML = count;
    localStorage.setItem('count', JSON.stringify(count)); // count ni saqlash
    console.log(newItem.amount);
};

document.getElementById('count').innerHTML = count;

const removeFromCart = (ID) => {
    let minus = cartArr.findIndex((item) => item.id == ID);

    if (minus !== -1) {
        let removedItem = cartArr[minus];
        if (removedItem.amount > 1) {
            removedItem.amount -= 1; // Agar maxsulotning soni 1 dan ko'p bo'lsa, faqat sonini kamaytiramiz
        } else {
            cartArr.splice(minus, 1); // Aks holda maxsulotni to'liq o'chiramiz
        }
        
        let totalPrice = removedItem.price;
        count -= totalPrice;
        document.getElementById('count').innerHTML = count;
        localStorage.setItem('count', JSON.stringify(count));
        localStorage.setItem('cart', JSON.stringify(cartArr));
        location.reload(); // Sahifani qayta yuklash
    }
};


let basket = document.getElementById('basket');

if (basket) {
    cartArr.map((item) => {
        basket.innerHTML += `
        <li class="card">
            <div class="content">
                <i style="position:absolute;right:0;font-size:1.5rem;">${item.amount}</i>
                <div class="item-img">
                    <img src="./images/${item.id}.png" alt="...">
                </div>
                <h5 class="card-title">${item.renown}</h5>
                <p class="card-text">${item.description}</p>
                <div class="content-footer">
                    <div class="content-footer-frame">
                        <p class="card-price">${item.price} $</p>
                        <p class="card-weight">${item.weight} гр</p>
                    </div>
                    <button class="btn-cart" onclick="removeFromCart(${item.id})">
                        Заказать<img src="./images/vector.png">
                    </button>
                </div>
            </div>
        </li>
        `;
    });
}

let user = JSON.parse(localStorage.getItem('user'));
let order = document.getElementById('buyurtma');
let test = document.getElementById('button');

if(test){
    test.addEventListener('click', function(){
        if(!user){
            localStorage.setItem('user', JSON.stringify([]));
            location.reload()
        }
    })
}

if(order){
    order.addEventListener('click', () => {
        if(user){
            order.setAttribute(
                'href', './basket.html'
            );
        }
    })
}