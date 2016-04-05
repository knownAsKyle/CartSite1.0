var CartSite = CartSite || {};
var loader = document.getElementById("loader");
for (var t = 0; t < productData.length; t++) {
    makeNewGridItem(productData[t]);
}
loader.parentNode.removeChild(loader);

function makeNewGridItem(data) {
    data = cleanData(data);
    var gridItem = makeEle("div");
    var slider = makeEle("div");
    var meta = makeEle("div");
    var title = makeEle("h3");
    var brand = makeEle("span");
    var price = makeEle("span");
    for (var i = 0; i < data.slider.length; i++) {
        slider.appendChild(makeNewSliderItem(data.slider[i]));
    }
    gridItem.className = "grid__item " + data.tags;
    slider.className = "grid__image__boarder";
    meta.className = "meta";
    title.className = "meta__title";
    brand.className = "meta__brand";
    price.className = "meta__price";
    title.appendChild(makeText(data.title));
    brand.appendChild(makeText(data.brand));
    price.appendChild(makeText(data.price));
    meta.appendChild(title);
    meta.appendChild(brand);
    meta.appendChild(price);
    gridItem.appendChild(slider);
    gridItem.appendChild(meta);
    gridItem.appendChild(makeShoppingCartButton());
    var grid = document.getElementsByClassName("grid")[0];
    grid.appendChild(gridItem);
}

function makeNewSliderItem(data) {
    var sliderItem = makeEle("div");
    var img = makeEle("img");
    sliderItem.className = "slider__item";
    img.src = data.src;
    img.alt = data.alt;
    img.className = "lazy";
    img.original = data.src;
    sliderItem.appendChild(img);
    return sliderItem;
}
var cartItems = [];

function makeShoppingCartButton() {
    var button = makeEle("button");
    var icon = makeEle("i");
    var txt = makeEle("span");
    button.className = "action action--button action--buy";
    icon.className = "fa fa-shopping-cart";
    txt.className = "text-hidden";
    txt.appendChild(makeText("Add to cart"))
    button.appendChild(icon);
    button.appendChild(txt);
    button.addEventListener("click", function(e) {
        var me = this.parentElement.children[1]
        var itemObj = {};
        itemObj.name = me.firstChild.innerText;
        itemObj.price = me.lastChild.innerText;
        var item = document.createElement("a");
        var itemName = document.createElement("div");
        var itemPrice = document.createElement("div");
        itemName.className = "cart-item-name";
        itemPrice.className = "cart-item-price";
        itemName.appendChild(document.createTextNode(itemObj.name))
        itemPrice.appendChild(document.createTextNode(itemObj.price))
        item.href = "#";
        var cartItem = document.getElementById("cbp-spmenu-s2");
        if (checkIfAlreadyInCart(cartItems, itemObj)) {
            console.log("IT'S ALREADY HERE!!!!");
            e.stopImmediatePropagation();
        } else {
            cartItems.push(itemObj);
            item.appendChild(itemName);
            item.appendChild(itemPrice);
            item.appendChild(buildQuantityWidget());
            cartItem.appendChild(item);
        }

        function checkIfAlreadyInCart(ci, it) {
            for (var i = 0, len = ci.length; i < len; i++) {
                if (ci[i].name === it.name && ci[i].price === it.price) {
                    return true;
                }
            }
            return false;
        }

        function buildQuantityWidget() {
            var widget = document.createElement("div");
            widget.className = "quantity-wrapper";
            var dec = document.createElement("i");
            var inc = document.createElement("i");
            var numDisplay = document.createElement("span");
            dec.className = "fa fa-minus-circle quantity-button dec-quantity";
            inc.className = "fa fa-plus-circle quantity-button inc-quantity";
            inc.id = "inc-quantity";
            dec.id = "dec-quantity";
            numDisplay.className = "quantity-display";
            numDisplay.id = "quantity-display";
            numDisplay.appendChild(document.createTextNode("1"));
            dec.addEventListener("click", handleChangeQuantity);
            inc.addEventListener("click", handleChangeQuantity);
            widget.appendChild(dec);
            widget.appendChild(numDisplay);
            widget.appendChild(inc);

            function handleChangeQuantity(e) {
                console.dir(e.target)
                var ele = e.target.parentNode.children[1];
                var value = parseInt(ele.innerText);
                value = (e.target.id === "inc-quantity") ? (value + 1) : (value - 1);
                value = value < 1 ? 1 : value;
                ele.innerText = value;
            }
            return widget;
        }
    });
    return button;
}

function cleanData(d) {
    /*TODO: cleanse data*/
    return d;
}

function makeEle(type) {
    return document.createElement(type);
}

function makeText(txt) {
    return document.createTextNode(txt);
}