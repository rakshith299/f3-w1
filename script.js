const cont = document.getElementById("items-cont");
const closeEle = document.getElementById("close");
const bannerEle = document.getElementById("banner-cont");

closeEle.addEventListener("click", function(){
    bannerEle.classList.add("remove-banner")
})

let ordersArr = [];


function makeEachCard(each){
    let id = each.id;
    let url = each.imgSrc;
    let name = each.name;
    let price = each.price;

    let div = document.createElement("div");
    div.classList.add("each-card");

    let img = document.createElement("img");
    img.setAttribute("src", `${url}`);
    img.classList.add("each-card-img");

    let priceBtnCont = document.createElement("div");
    priceBtnCont.classList.add("price-btn-cont");

    let namePriceCont = document.createElement("div");
    namePriceCont.classList.add("name-price-cont");


    let nameSpanEle = document.createElement("span");
    nameSpanEle.classList.add("item-name");
    nameSpanEle.innerText = `${name}`;

    let priceSpanEle = document.createElement("p");
    priceSpanEle.classList.add("item-price");
    priceSpanEle.innerText = `$${price}/-`;

    namePriceCont.appendChild(nameSpanEle);
    namePriceCont.appendChild(priceSpanEle);

    let addEle = document.createElement("span");
    addEle.innerHTML = `<i class="fa-solid fa-square-plus add"></i>`;


    priceBtnCont.appendChild(namePriceCont);
    priceBtnCont.appendChild(addEle);

    div.appendChild(img);
    div.appendChild(priceBtnCont);

    cont.appendChild(div);
}

async function getMenu(){
    let url = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

    let received = await fetch(url);
    let response = await received.json();

    for(let i = 0; i < response.length; i++){
        makeEachCard(response[i]);
    }
}

getMenu();


async function takeOrder(){
    return await new Promise((resolve,reject) => {
        setTimeout(function(){
            resolve(['Turkey Burger', 'Cheese Burger', 'Veggie Burger']);
        }, 2500);
    })
}

let takeOrderPromise = takeOrder();

takeOrderPromise.then(
    value => {
        for(let i = 0; i < value.length; i++){
            let tempObj = {
                id: i+1,
                name: value[i]
            }

            ordersArr.push(tempObj);
        }

        async function orderStatus(){
            return await new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve({order_status: true,paid: false})
                },1500);
            })
        }

        let orderStatusPromise = orderStatus();
        orderStatusPromise.then(
            value => {
                alert(`Your order has been set, Proceed to make Payment`);

                async function payOrder(){
                    return await new Promise((resolve, reject) => {
                        resolve({order_status: true,paid: true});
                    })
                }

                let payOrderPromise = payOrder();

                payOrderPromise.then(
                    value => {
                        alert("Payment is successfull");
                        
                        async function thankYouFnc(){
                            alert("Thankyou, For eating with us today!")
                        }

                        thankYouFnc();
                    },
                    error => {
                        alert(`Sorry, Your payment was rejected: ${error}`);
                    }
                )
            },
            error => {
                alert(`Sorry your order was not placed, Please try again...: ${error}`);
            }
        )

    },
    error => {
        alert(`Sorry your request has been rejected: ${error}`);
    }
)
