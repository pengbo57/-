~function () {
    let col = document.getElementsByClassName('col'),
        container = document.getElementById('container');
    ajax();
    function ajax() {
        let data,xhr = new XMLHttpRequest();
        xhr.open('get','json/articles.json',false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                data = JSON.parse(xhr.responseText);
                bind(data);
            }
        };
        xhr.send();
    }
function bind(data) {
        let str = ``;
    for (let i = 0; i < data.length; i++) {
        let cur = data[i],
            cDiv = document.createElement('div'),
            num = Math.round(Math.random())*(250-150)+150 + 'px';
        str = `<div class = 'item'>
            <img src="img/default.jpg" trueImg = '${cur.img}' alt="" style="height: ${num}">
            <p>${cur.desc}</p>
        </div>`;
    cDiv.innerHTML = str;
    col = [...col];
    col.sort(function (a,b) {
        return a.offsetHeight - b.offsetHeight;
    });
    col[0].appendChild(cDiv);

    }
}
 let oImg = document.getElementsByTagName('img');
    delay();
    function delay() {
        for (let i = 0; i < oImg.length; i++) {
           lazyLoad(oImg[i]);
        }
    }
    window.onscroll = function () {
        delay();
        let winH = utils.win('clientHeight'),
            winT = utils.win('scrollTop'),
            conH = container.offsetHeight;
        console.log(conH,winT,winH);
        if (winT+winH+100 >=conH){
            ajax();
        }
    };
    function lazyLoad(image) {
        if(image.flag)return;
        let winH = utils.win('clientHeight'),
            winT = utils.win('scrollTop'),
            imgH = image.offsetHeight,
            imgT = utils.offset(image).top;
        // console.log(winT, winH, imgH, imgT);
        if (winH+winT>=imgH+imgT){
            let trueImg = image.getAttribute('trueImg'),
                newImg = document.createElement('img');
            newImg.src = trueImg;
            newImg.onload = function () {
                image.src = trueImg;
                image.flag = true;
                fadeIn(image)
            }
        }
    }
function fadeIn(curEle) {
    utils.css(curEle,'opacity',.4);
    setInterval(()=>{
        let op =  Number(utils.css(curEle,'opacity'));
        op+=.1;
        if (op === 1){
            utils.css(curEle,'opacity',1);
            clearInterval(1);
            return
        }
        utils.css(curEle,'opacity',op);
    },80)
}
}();