var CartSite = CartSite || {};
CartSite.helpers = CartSite.helpers || {};
CartSite.helpers.makeEle = (function makeEle(type) {
    return document.createElement(type);
});
CartSite.helpers.makeText = (function makeText(txt) {
    return document.createTextNode(txt);
});
CartSite.helpers.getEle = (function getEle(ele, classLookUp) {
    return (classLookUp ? document.getElementsByClassName(ele)[0] : document.getElementById(ele));
});
CartSite.helpers.cleanData = (function cleanData(d) {
    /*TODO: cleanse data*/
    return d;
});
CartSite.helpers.loadScrips = (function loadScrips(scripts) {
    scripts = scripts || [];
    var loader;
    var count = 0;
    loader = setInterval(function() {
        if (count === scripts.length) {
            return clearInterval(loader);
        }
        document.body.appendChild(addScript(scripts[count]));
        count++;
    }, 50);

    function addScript(data) {
        var readyTag = CartSite.helpers.makeEle(data.eleType);
        readyTag.type = data.type;
        readyTag.src = data.src;
        return readyTag;
    }
});
CartSite.helpers.attachEvents = (function() {
    $(window).on("resize", function() {
        var height = $(window).height();
        var barHeight = $(".bar").outerHeight();
        $(".cbp-spmenu").height(height - barHeight);
    });
});
CartSite.helpers.scripts = [{
    "eleType": "script",
    "type": "text/javascript",
    "src": "scripts/isotope.pkgd.min.js"
}, {
    "eleType": "script",
    "type": "text/javascript",
    "src": "scripts/flickity.pkgd.min.js"
}, {
    "eleType": "script",
    "type": "text/javascript",
    "src": "scripts/theme.js"
}];
CartSite.elements = CartSite.elements || {};
CartSite.elements["total-price"] = CartSite.helpers.getEle("total-price", true);
CartSite.elements["check-out-button"] = CartSite.helpers.getEle("check-out-button");
CartSite.elements["loader"] = CartSite.helpers.getEle("loader");
CartSite.elements["grid"] = CartSite.helpers.getEle("grid", true);
CartSite.elements["cart"] = CartSite.helpers.getEle("cart");
CartSite.elements["cart-menu"] = CartSite.helpers.getEle('cbp-spmenu-s2');
CartSite.cart = CartSite.cart || [];
CartSite.payment = {};
CartSite.payment.getTotal = (function calculateCartTotal() {
    var total = 0;
    for (var i = 0, len = CartSite.cart.length; i < len; i++) {
        var price = Number(CartSite.cart[i].price.replace(/[^0-9\.-]+/g, ""));
        price = price * Number(CartSite.cart[i].quantity);
        total = total + price;
    }
    return total;
});
CartSite.payment.handleShoppingCartMainButtonClick = (function handleShoppingCartMainButtonClick() {
    classie.toggle(this, 'active');
    classie.toggle(CartSite.elements["cart-menu"], 'cbp-spmenu-open');
    classie.toggle(CartSite.elements["cart"], 'disabled');
    var height = $(window).height();
    var barHeight = $(".bar").outerHeight();
    $(".cbp-spmenu").height(height - barHeight);
});
CartSite.payment.checkIfAlreadyInCart = (function checkIfAlreadyInCart(ci, it) {
    for (var i = 0, len = ci.length; i < len; i++) {
        if (ci[i].name === it.name && ci[i].price === it.price && ci[i].id === it.id) {
            return true;
        }
    }
    return false;
});
CartSite.payment.consts = {};
CartSite.payment.consts.formAction = "https://www.paypal.com/cgi-bin/webscr";
CartSite.payment.consts.formMethod = "post";
CartSite.payment.consts.inputType = "hidden";
CartSite.payment.consts.cmd = "cmd";
CartSite.payment.consts.cmdValue = "_cart";
CartSite.payment.consts.upload = "upload";
CartSite.payment.consts.uploadValue = "1";
CartSite.payment.consts.email = "business";
CartSite.payment.consts.emailValue = "lums34@yahoo.com";
CartSite.payment.consts.itemName = "item_name_";
CartSite.payment.consts.itemAmount = "amount_";
CartSite.payment.consts.itemQuantity = "quantity_";
CartSite.payment.checkout = (function checkOut() {
    if (CartSite.cart && CartSite.cart.length > 0) {
        var form = CartSite.helpers.makeEle("form");
        var cmd = CartSite.helpers.makeEle("input");
        var upload = CartSite.helpers.makeEle("input");
        var email = CartSite.helpers.makeEle("input");
        form.action = CartSite.payment.consts.formAction;
        form.method = CartSite.payment.consts.formMethod;
        cmd.type = CartSite.payment.consts.inputType;
        cmd.name = CartSite.payment.consts.cmd;
        cmd.value = CartSite.payment.consts.cmdValue;
        upload.type = CartSite.payment.consts.inputType;
        upload.name = CartSite.payment.consts.upload;
        upload.value = CartSite.payment.consts.uploadValue;
        email.type = CartSite.payment.consts.inputType;
        email.name = CartSite.payment.consts.email;
        email.value = CartSite.payment.consts.emailValue;
        form.appendChild(cmd);
        form.appendChild(upload);
        form.appendChild(email);
        for (var i = 0, len = CartSite.cart.length; i < len; i++) {
            var name = CartSite.helpers.makeEle("input");
            var amount = CartSite.helpers.makeEle("input");
            var quantity = CartSite.helpers.makeEle("input");
            name.type = CartSite.payment.consts.inputType;
            name.name = CartSite.payment.consts.itemName + (i + 1);
            name.value = CartSite.cart[i].name;
            amount.type = CartSite.payment.consts.inputType;
            amount.name = CartSite.payment.consts.itemAmount + (i + 1);
            amount.value = CartSite.cart[i].price;
            quantity.type = CartSite.payment.consts.inputType;
            quantity.name = CartSite.payment.consts.itemQuantity + (i + 1);
            quantity.value = CartSite.cart[i].quantity || 1;
            form.appendChild(name);
            form.appendChild(amount);
            form.appendChild(quantity);
        }
        form.submit();
    }
});
CartSite.elements["check-out-button"].addEventListener("click", CartSite.payment.checkout);
CartSite.elements["cart"].addEventListener("click", CartSite.payment.handleShoppingCartMainButtonClick);
CartSite.db = {};
CartSite.db.name = "https://nowaitbreaks.firebaseio.com/";
CartSite.db.ref = (function() {
    return new Firebase(CartSite.db.name + "/items");
})();
CartSite.db.handleDBResponse = (function handleDBResponse(data) {
    if (data.val()) {
        data.forEach(function(snap) {
            var tempObj = snap.val();
            tempObj.id = snap.key();
            CartSite.builder.makeNewGridItem(tempObj);
        });
    } else {
        for (var t = 0; t < productData.length; t++) {
            var id = CartSite.db.ref.push(productData[t]);
            productData[t].id = id;
            CartSite.builder.makeNewGridItem(productData[t]);
        }
    }
    CartSite.helpers.attachEvents();
    CartSite.helpers.loadScrips(CartSite.helpers.scripts);
    CartSite.elements.loader.parentNode.removeChild(loader);
});
CartSite.db.ref.once("value", CartSite.db.handleDBResponse);
CartSite.builder = {};
CartSite.builder.makeNewGridItem = (function makeNewGridItem(data) {
    data = CartSite.helpers.cleanData(data);
    var gridItem = CartSite.helpers.makeEle("div");
    var slider = CartSite.helpers.makeEle("div");
    var meta = CartSite.helpers.makeEle("div");
    var title = CartSite.helpers.makeEle("h3");
    var brand = CartSite.helpers.makeEle("span");
    var price = CartSite.helpers.makeEle("span");
    for (var i = 0; i < data.slider.length; i++) {
        slider.appendChild(CartSite.builder.makeNewSliderItem(data.slider[i]));
    }
    gridItem.className = "grid__item " + data.tags;
    slider.className = "grid__image__boarder";
    meta.id = data.id;
    meta.className = "meta";
    title.className = "meta__title";
    brand.className = "meta__brand";
    price.className = "meta__price";
    title.appendChild(CartSite.helpers.makeText(data.title));
    brand.appendChild(CartSite.helpers.makeText(data.brand));
    price.appendChild(CartSite.helpers.makeText(data.price));
    meta.appendChild(title);
    meta.appendChild(brand);
    meta.appendChild(price);
    gridItem.id = "top_" + data.id;
    gridItem.appendChild(slider);
    gridItem.appendChild(meta);
    gridItem.appendChild(CartSite.builder.makeShoppingCartButton());
    CartSite.elements["grid"].appendChild(gridItem);
});
CartSite.builder.makeNewSliderItem = (function makeNewSliderItem(data) {
    var sliderItem = CartSite.helpers.makeEle("div");
    var img = CartSite.helpers.makeEle("img");
    sliderItem.className = "slider__item";
    img.src = data.src;
    img.alt = data.alt;
    img.className = "lazy";
    img.original = data.src;
    sliderItem.appendChild(img);
    return sliderItem;
});
CartSite.builder.makeShoppingCartButton = (function makeShoppingCartButton() {
    var button = CartSite.helpers.makeEle("button");
    var icon = CartSite.helpers.makeEle("i");
    var txt = CartSite.helpers.makeEle("span");
    var buttonTxt = CartSite.helpers.makeEle("div");
    button.className = "action action--button action--buy";
    icon.className = "fa fa-shopping-cart";
    txt.className = "text-hidden";
    buttonTxt.className = "add-to-cart-button-text";
    txt.appendChild(CartSite.helpers.makeText("Add to cart"));
    buttonTxt.appendChild(CartSite.helpers.makeText("Add To"));
    button.appendChild(buttonTxt);
    button.appendChild(icon);
    button.appendChild(txt);
    button.addEventListener("click", function handleAddToCartClick(e) {
        CartSite.helpers.loadScrips();
        var me = this.parentElement.children[1];
        var itemObj = {};
        itemObj.id = me.id;
        itemObj.name = me.firstChild.innerText;
        itemObj.price = me.lastChild.innerText;
        itemObj.quantity = 1;
        var item = CartSite.helpers.makeEle("div");
        var itemName = CartSite.helpers.makeEle("div");
        var itemPrice = CartSite.helpers.makeEle("div");
        item.className = "cart-item";
        itemName.className = "cart-item-name";
        itemPrice.className = "cart-item-price";
        itemName.appendChild(CartSite.helpers.makeText(itemObj.name));
        itemPrice.appendChild(CartSite.helpers.makeText(itemObj.price));
        item.id = "cart_" + itemObj.id;
        var cartItem = CartSite.elements["cart-menu"];
        if (CartSite.payment.checkIfAlreadyInCart(CartSite.cart, itemObj)) {
            e.stopImmediatePropagation();
        } else {
            CartSite.cart.push(itemObj);
            item.appendChild(itemName);
            item.appendChild(itemPrice);
            item.appendChild(buildQuantityWidget());
            item.appendChild(buildRemoveCartItemButton())
            var mainItemWrapper = CartSite.helpers.getEle("top_" + itemObj.id);
            classie.add(mainItemWrapper, 'grid__item_selected');
            cartItem.appendChild(item);
        }
        CartSite.elements["total-price"].innerText = CartSite.payment.getTotal();

        function buildRemoveCartItemButton() {
            var removeButton = CartSite.helpers.makeEle("div");
            removeButton.className = "remove-cart-item-button";
            removeButton.appendChild(CartSite.helpers.makeText("Remove"))
            removeButton.addEventListener("click", handleRemoveCartItemButtonClick);

            function handleRemoveCartItemButtonClick(e) {
                var identifier = e.target.parentNode.id;
                identifier = identifier.substring((identifier.indexOf("_") + 1));
                var displayItem = CartSite.helpers.getEle("top_" + identifier);
                classie.remove(mainItemWrapper, 'grid__item_selected');
                var cart = document.querySelector('.cart'),
                    cartItems = cart.querySelector('.cart__count');
                for (var i = 0, len = CartSite.cart.length; i < len; i++) {
                    if (CartSite.cart[i].id === identifier) {
                        CartSite.cart.splice(i, 1);
                        var parent = e.target.parentNode.parentNode;
                        parent.removeChild(e.target.parentNode);
                        CartSite.elements["total-price"].innerText = CartSite.payment.getTotal();
                        classie.add(cart, 'cart--animate');
                        setTimeout(removeItem, 200);
                        return true;
                    }
                }

                function removeItem() {
                    cartItems.innerHTML = Number(cartItems.innerHTML) - 1;
                    classie.remove(cart, 'cart--animate');
                }
            }
            return removeButton;
        }

        function buildQuantityWidget() {
            var widget = CartSite.helpers.makeEle("div");
            widget.className = "quantity-wrapper";
            var dec = CartSite.helpers.makeEle("i");
            var inc = CartSite.helpers.makeEle("i");
            var numDisplay = CartSite.helpers.makeEle("span");
            dec.className = "fa fa-minus-circle quantity-button dec-quantity";
            inc.className = "fa fa-plus-circle quantity-button inc-quantity";
            inc.id = "inc-quantity";
            dec.id = "dec-quantity";
            numDisplay.className = "quantity-display";
            numDisplay.id = "quantity-display";
            numDisplay.appendChild(CartSite.helpers.makeText("1"));
            dec.addEventListener("click", handleChangeQuantity);
            inc.addEventListener("click", handleChangeQuantity);
            widget.appendChild(dec);
            widget.appendChild(numDisplay);
            widget.appendChild(inc);

            function handleChangeQuantity(e) {
                var identifier = e.target.parentNode.parentNode.id;
                identifier = identifier.substring((identifier.indexOf("_") + 1));
                var ele = e.target.parentNode.children[1];
                var value = parseInt(ele.innerText);
                value = (e.target.id === "inc-quantity") ? (value + 1) : (value - 1);
                value = value < 1 ? 1 : value;
                ele.innerText = value;
                for (var i = 0, len = CartSite.cart.length; i < len; i++) {
                    if (CartSite.cart[i].id === identifier) {
                        CartSite.cart[i].quantity = value;
                    }
                }
                CartSite.elements["total-price"].innerText = CartSite.payment.getTotal();
            }
            return widget;
        }
    });
    return button;
});