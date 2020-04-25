var tags = ["أخبار", "سياسة", "رياضة", "طب"];
var transformedTags = {
    أخبار: "general",
    سياسة: "business",
    رياضة: "sports",
    طب: "health"
};
var myUl = document.getElementById("myUL");
console.log(tags[0]);

loadLIs();
function loadLIs() {
    var html = "";

    for (let i = 0; i < tags.length; i++) {
        html += `<li class="nav-item active">
                    <a class="nav-link text-light" href="#">`+ tags[i] + `</a>
                </li>`;
    }

    myUl.innerHTML = html;

}
// console.log(transformedTags.أخبار);
// console.log(transformedTags.سياسة);
// console.log(transformedTags.رياضة);
// console.log(transformedTags.طب);

var links = document.querySelectorAll(".nav-link");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        // console.log(e.target.text);
        var x = e.target.text;
        // console.log("X " + x);
        var category = transformedTags[x];
        console.log(category);                   // category now has the value of the 
        loadData(category);
    });
}

loadData("general");
var myData = [];
function loadData(category) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "http://newsapi.org/v2/top-headlines?country=eg&category=" + category + "&apiKey=a602b73912c3481b85bed8de20662e57");
    httpRequest.send();

    httpRequest.addEventListener("readystatechange", function () {

        if (httpRequest.readyState == 4 && httpRequest.status == 200) {

            myData = JSON.parse(httpRequest.response).articles;
            displayData();
            // console.log(httpRequest.responseURL[this.responseURL.indexOf("country=")+("country=".length)]);
        }

    });

}


var loadMoreBtn = document.getElementById("load");
var data = 3, current = 0;
var innerData = document.getElementById("innerData");
function displayData() {
    var html = "";

    for (let i = 0; i < data; i++) {
        html += `<div class="col-lg-4 col-md-6 p-3">
                    <div class="eachNews">
                        <div class="newsPhoto" >
                            <img src=`+ myData[i].urlToImage + ` onclick=openURL("` + myData[i].url + `") class="img-fluid" />
                        </div>
                        <div class="newsBody">
                            <div class="newsTitle">
                                <h3 onclick=openURL("`+ myData[i].url + `") >` + myData[i].title + `</h3>
                            </div>
                            <div class="newsDesc">
                                <p>`+ myData[i].description + `</p>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="date float-left"><h6>`+ myData[i].author + `</h6></div>
                            <div class="date float-right"><h6>`+ myData[i].publishedAt + `</h6></div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>`;
    }


    innerData.innerHTML = html;

}

loadMoreBtn.addEventListener("click", function () {
    if (current == 0) {
        current++;
        data = Math.floor(myData.length / 5);
        displayData();
    }
    else if (current == 1) {
        current++;
        data = Math.floor(myData.length / 3);
        displayData();
    }
    else if (current == 2) {
        current++;
        data = Math.floor(myData.length / 2);
        displayData();
    }
    else if (current == 3) {
        current++;
        data = myData.length;
        displayData();
        loadMoreBtn.classList.add("d-none");
    }
});

function openURL(url) {
    window.open(url, "blank")
}

var digitalHour = document.getElementById("digitalHour");
var digitalDay = document.getElementById("digitalDay");
var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
getTime();
function getTime(){
    var d = new Date();
    digitalHour.innerHTML = d.getHours() + " : " + d.getMinutes() + " : " + d.getSeconds() +"<br/>"
    +"Today is " + weekDays[d.getDay()];
    //    digitalDay.innerHTML = "Today is " + weekDays[d.getDay()];
    setTimeout(getTime,1000);
}
