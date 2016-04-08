var CartSite = CartSite || {};
CartSite.admin = CartSite.admin || {};
CartSite.admin.db = CartSite.admin.db || {};
CartSite.admin.db.name = "https://nowaitbreaks.firebaseio.com/";
CartSite.admin.db.ref = (function() {
    return new Firebase(CartSite.admin.db.name + "/items");
})();
CartSite.admin.db.set = (function dbSet(val, children) {
    return CartSite.admin.db.ref.push(val, function dbResponse(snap) {
        return snap;
    });
});
CartSite.admin.db.get = (function dbGet() {});
CartSite.admin.db.update = (function dbUpdate() {});
CartSite.admin.db.remove = (function dbRemove(id) {
    return CartSite.admin.db.ref.child(id).remove();
});
CartSite.admin.db.ref.once("value", buildInitialListOfItems);
// buildInitialListOfItems(productData)
/*Build existing list*/
function buildInitialListOfItems(d) {
    var wrapper = document.getElementsByClassName("all-items-list")[0];
    d.forEach(function(snap) {
        var tempObj = snap.val();
        tempObj.id = snap.key();
        wrapper.appendChild(makeItem(tempObj));
    });
    // for (var t = 0; t < d.length; t++) {
    //     var tempObj = d[t];
    //     tempObj.id = t;
    //    wrapper.appendChild(makeItem(tempObj));
    // }
    function makeItem(data) {
        //var t = CartSite.admin.db.set(data);
        // console.log(t.key());
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
        removeButton.id = data.id;
        itemHeader.appendChild(makeText(data.title));
        removeButton.appendChild(makeText("X"));
        removeButton.addEventListener("click", function() {
            var id = this.id;
            var me = this.parentNode.parentNode;
            var parent = me.parentNode;
            parent.removeChild(me);
            CartSite.admin.db.remove(id);
        });
        itemRowTop.appendChild(itemHeader);
        itemRowTop.appendChild(removeButton);
        itemImagesText.appendChild(makeText("Images:"));
        itemImages.appendChild(itemImagesText);
        data.slider = data.slider || [];
        for (var i = 0, len = data.slider.length; i < len; i++) {
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
}
var pictureButton = document.getElementById("fileToUpload");
pictureButton.addEventListener("change", handlePictureUpload);

function handlePictureUpload(e) {
    console.dir(this.files[0])
    var reader = new FileReader();
    reader.addEventListener("load", function() {
        console.log(reader.result)
        var img = document.getElementsByClassName("input-img")[0];
        img.style["background-image"] = "url(" + reader.result + ")";
        img.style["background-size"] = "cover";
        img.style["object-fit"] = "cover";
        img.style["background-repeat"] = "no-repeat";
        img.style["background-poisition"] = "50% 50%";
        var icon = document.getElementsByClassName("fa-camera")[0];
        icon.style.opacity = 0;
    }, false);
    if (this.files[0]) {
        reader.readAsDataURL(this.files[0]);
    }
}
/*Add New*/
(function() {
    var wrapper = document.getElementsByClassName("all-items-list")[0];
    var inputHeader = getEle("input-header");
    var inputPrice = getEle("input-price");
    var inputTag = getEle("input-tag");
    var inputInfo = getEle("input-info");
    var inputSubmit = getEle("input-submit");
    var inputImage = document.getElementsByClassName("input-img")[0];
    inputSubmit.addEventListener("click", handleSubmitClick);

    function handleSubmitClick() {
        var data = {};
        data.slider = [];
        if (inputImage[0].files[0]) {
            var img = {};
            img.url = inputImage[0].files[0].name;
            img.alt = img.url;
            data.slider.push(img);
        }
        data.title = inputHeader.value;
        data.brand = inputInfo.value;
        data.price = inputPrice.value;
        data.tags = inputTag.value;
        var key = CartSite.admin.db.set(data);
        data.id = key.key();
        var file = inputImage[0].files[0];
        if(typeof file !== "undefined" && file !== null){
            var file_data = file;
            var form_data = new FormData(); 
            form_data.append("file", file_data) 
            var cred = {};
            //cred.auth = new Firebase(MY_FIREBASE).getAuth();
            addImageToServer(form_data,function(err,data){
                if(!err){
                    console.log("adding", data)
                    wrapper.insertBefore(makeItem(data), wrapper.childNodes[0]);
                }else{
                    console.log(err)
                }
            });
        }   

        function addImageToServer(data, callback) {
            $.ajax({
                type: 'POST',
                contentType: false,
                processData: false,
                url: 'imageMover.php',
                data: data,
            }).success(function(data) {
                callback(null, data);
            }).fail(function(jqXHR, status, errorThrown) {
                console.log(errorThrown);
                callback(errorThrown);
            });
        }
        
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
        removeButton.id = data.id;
        itemHeader.appendChild(makeText(data.title));
        removeButton.appendChild(makeText("X"));
        removeButton.addEventListener("click", function() {
            console.log(this)
            var me = this.parentNode.parentNode;
            var parent = me.parentNode;
            // parent.removeChild(me);
        });
        itemRowTop.appendChild(itemHeader);
        itemRowTop.appendChild(removeButton);
        itemImagesText.appendChild(makeText("Images:"));
        itemImages.appendChild(itemImagesText);
        data.slider = data.slider || [];
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