/*Build existing list*/
(function(d) {
    var wrapper = document.getElementsByClassName("all-items-list")[0];

    function makeItem(data) {
        var itemWrapper = makeEle("div");
        var itemRowTop = makeEle("div");
        var itemRowMid = makeEle("div");
        var itemRowBot = makeEle("div");
        var itemHeader = makeEle("div");
        var removeButton = makeEle("div");
        var itemImages = makeEle("div");
        var itemImagesText = makeEle("span");
        var itemPrice = makeEle("div");
        var itemTags = makeEle("div");
        itemWrapper.className = "item-wrapper";
        itemRowTop.className = "item-row";
        itemRowMid.className = "item-row";
        itemRowBot.className = "item-row";
        itemHeader.className = "item-header";
        itemImages.className = "item-images";
        itemPrice.className = "item-price";
        itemTags.className = "item-tags";
        removeButton.className = "item-remove-button";
        itemHeader.appendChild(makeText(data.title));
        removeButton.appendChild(makeText("X"));
        removeButton.addEventListener("click", function() {
            var me = this.parentNode.parentNode;
            var parent = me.parentNode;
            parent.removeChild(me);
        });
        itemRowTop.appendChild(itemHeader);
        itemRowTop.appendChild(removeButton);
        itemImagesText.appendChild(makeText("Images:"));
        itemImages.appendChild(itemImagesText);
        for (var i = 0; i < data.slider.length; i++) {
            var img = makeEle("i");
            img.className = "fa fa-check";
            itemImages.appendChild(img);
        }
        itemRowMid.appendChild(itemImages);
        itemPrice.appendChild(makeText(data.price));
        itemTags.appendChild(makeText(data.tags));
        itemRowBot.appendChild(itemPrice);
        itemRowBot.appendChild(itemTags);
        itemWrapper.appendChild(itemRowTop);
        itemWrapper.appendChild(itemRowMid);
        itemWrapper.appendChild(itemRowBot);
        return itemWrapper;
    }

    function makeEle(type) {
        return document.createElement(type);
    }

    function makeText(txt) {
        return document.createTextNode(txt);
    }
    for (var t = 0; t < d.length; t++) {
        wrapper.appendChild(makeItem(d[t]));
    }
})(productData);
/*Add New*/
(function() {
	var wrapper = document.getElementsByClassName("all-items-list")[0];
    var inputHeader = getEle("input-header");
    var inputPrice = getEle("input-price");
    var inputTag = getEle("input-tag");
    var inputInfo = getEle("input-info");
    var inputSubmit = getEle("input-submit");
    inputSubmit.addEventListener("click", handleSubmitClick);

    function handleSubmitClick() {
        var data = {};
        data.title = inputHeader.value;
        data.brand = inputInfo.value;
        data.price = inputPrice.value;
        data.slider = [];
        data.tags = inputTag.value;
        wrapper.insertBefore(makeItem(data),wrapper.childNodes[0]);
    }

    function makeItem(data) {
        var itemWrapper = makeEle("div");
        var itemRowTop = makeEle("div");
        var itemRowMid = makeEle("div");
        var itemRowBot = makeEle("div");
        var itemHeader = makeEle("div");
        var removeButton = makeEle("div");
        var itemImages = makeEle("div");
        var itemImagesText = makeEle("span");
        var itemPrice = makeEle("div");
        var itemTags = makeEle("div");
        itemWrapper.className = "item-wrapper";
        itemRowTop.className = "item-row";
        itemRowMid.className = "item-row";
        itemRowBot.className = "item-row";
        itemHeader.className = "item-header";
        itemImages.className = "item-images";
        itemPrice.className = "item-price";
        itemTags.className = "item-tags";
        removeButton.className = "item-remove-button";
        itemHeader.appendChild(makeText(data.title));
        removeButton.appendChild(makeText("X"));
        removeButton.addEventListener("click", function() {
            var me = this.parentNode.parentNode;
            var parent = me.parentNode;
            parent.removeChild(me);
        });
        itemRowTop.appendChild(itemHeader);
        itemRowTop.appendChild(removeButton);
        itemImagesText.appendChild(makeText("Images:"));
        itemImages.appendChild(itemImagesText);
        for (var i = 0; i < data.slider.length; i++) {
            var img = makeEle("i");
            img.className = "fa fa-check";
            itemImages.appendChild(img);
        }
        itemRowMid.appendChild(itemImages);
        itemPrice.appendChild(makeText(data.price));
        itemTags.appendChild(makeText(data.tags));
        itemRowBot.appendChild(itemPrice);
        itemRowBot.appendChild(itemTags);
        itemWrapper.appendChild(itemRowTop);
        itemWrapper.appendChild(itemRowMid);
        itemWrapper.appendChild(itemRowBot);
        return itemWrapper;
    }

    function makeEle(type) {
        return document.createElement(type);
    }

    function makeText(txt) {
        return document.createTextNode(txt);
    }

    function getEle(id) {
        return document.getElementById(id);
    }
})();