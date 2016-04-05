var productData = makeMockData();

function makeMockData() {
    var temp = [];
    var it = makeMockItem("football", "2014 Topps", "Topps", "$79", [{
        src: "images/demo3-football.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("football", "2014 Topps", "Topps", "$123", [{
        src: "images/demo4-football.jpg",
        alt: "product"
    }]);
    temp.push(it)
    it = makeMockItem("football", "USA Football", "football usa", "$54", [{
        src: "images/demo2-football.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("football", "Topps Football 2015", "Topps", "$67", [{
        src: "images/demo-football3.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("baseball", "Topps - old timey", "Topps", "$99", [{
        src: "images/demo5-baseball.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("baseball", "Fleer - Ted Williams", "Fleer", "$128", [{
        src: "images/demo-baseball2.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("basketball", "NBA Basketball", "Fleer", "$220", [{
        src: "images/demo-basketball1.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("basketball", "NBA Basketball", "Fleer", "$100", [{
        src: "images/demo-basketball2.jpg",
        alt: "product"
    }]);
    it = makeMockItem("misc", "Topps - ALF", "Topps", "$22", [{
        src: "images/demo-misc1.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("misc", "Topps - Fright Flicks", "Topps", "$12", [{
        src: "images/demo-misc2.jpg",
        alt: "product"
    }]);
    temp.push(it);
    it = makeMockItem("misc", "Spider Man", "Marvel Cards ", "$18", [{
        src: "images/demo-misc3.jpg",
        alt: "product"
    }]);
    temp.push(it);

    function makeMockItem(tags, title, brand, price, slider) {
        var item = {};
        item.tags = tags;
        item.title = title;
        item.brand = brand;
        item.price = price;
        item.slider = slider;
        return item;
    }
    return temp;
}