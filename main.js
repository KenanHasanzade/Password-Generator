var copyText = document.querySelector(".inputdiv span");
var tickbox = document.getElementsByClassName("tickbox");
var color = document.getElementsByClassName("color");
var range = document.getElementById("range");
var history = document.querySelector(".history");
var position = document.querySelector(".value");
var passcheck = document.getElementsByClassName("check");
var time;
var colorcounter = 0;
var mainselector = [];
var lower = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var upper = lower.join("").toUpperCase().split("");
var number = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "~",
  "<",
  ">",
  "/",
  "?",
  ":",
  ";",
  ",",
];
//copy notification
function popup() {
  var element = document.createElement("div");
  element.setAttribute("class", "popup");
  element.innerHTML = "Copied successfully";
  document.querySelector(".popupcontainer").append(element);
  setTimeout(function () {
    document.querySelector(".popup").remove();
  }, 4000);
}
//change counter position
function positionchange() {
  var leftval = (588 * (range.value - 1)) / 20;
  position.style.left = leftval + "px";
}
// main div copy
function copytext() {
  if (copyText.innerHTML != 0) {
    navigator.clipboard.writeText(copyText.innerHTML);
    popup();
  }
}
//color change
for (let i = 0; i < color.length; i++) {
  tickbox[i].addEventListener("click", function () {
    if (color[i].style.backgroundColor == "") {
      color[i].style.backgroundColor = "#F8EF00";
    } else {
      color[i].style.backgroundColor = "";
    }
    if (
      color[0].style.backgroundColor == "" &&
      color[1].style.backgroundColor == "" &&
      color[2].style.backgroundColor == "" &&
      color[3].style.backgroundColor == ""
    ) {
      range.value = "1";
      positionchange();
      position.innerHTML = "";
    }
  });
}
//array change
function generate() {
  mainselector = [];
  passcheck[0].style.backgroundColor = "";
  passcheck[1].style.backgroundColor = "";
  passcheck[2].style.backgroundColor = "";
  passcheck[3].style.backgroundColor = "";
  // color[0].style.backgroundColor = "#F8EF00"
  if (color[0].style.backgroundColor == "") {
  } else {
    mainselector = mainselector.concat(upper);
  }
  // color[1].style.backgroundColor = "#F8EF00"
  if (color[1].style.backgroundColor == "") {
  } else {
    mainselector = mainselector.concat(number);
  }
  // color[2].style.backgroundColor = "#F8EF00"
  if (color[2].style.backgroundColor == "") {
  } else {
    mainselector = mainselector.concat(lower);
  }
  //  color[3].style.backgroundColor = "#F8EF00"
  if (color[3].style.backgroundColor == "") {
  } else {
    mainselector = mainselector.concat(symbols);
  }
  for (let i = 0; i < color.length; i++) {
    if (color[i].style.backgroundColor != "") {
      colorcounter++;
      if (colorcounter >= 1) {
        passcheck[3].style.backgroundColor = "red";
      }
      if (colorcounter >= 2) {
        passcheck[3].style.backgroundColor = "orange";
        passcheck[2].style.backgroundColor = "orange";
      }
      if (colorcounter >= 3) {
        passcheck[3].style.backgroundColor = "yellow";
        passcheck[2].style.backgroundColor = "yellow";
        passcheck[1].style.backgroundColor = "yellow";
      }
      if (colorcounter >= 4) {
        passcheck[3].style.backgroundColor = "green";
        passcheck[2].style.backgroundColor = "green";
        passcheck[1].style.backgroundColor = "green";
        passcheck[0].style.backgroundColor = "green";
      }
    }
  }
  colorcounter = 0;
}
//time of copy
function date() {
  time = new Date();
  fulldate = `${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}  ${time.getHours()}:${
    time.getMinutes() < 10 ? "0" : ""
  }${time.getMinutes()}:${
    time.getSeconds() < 10 ? "0" : ""
  }${time.getSeconds()}`;
}
//create history
function show() {
  date();
  var element = document.createElement("div");
  element.innerHTML = `
<div class="last">
    <div >
        <span class="copied">${copyText.innerHTML}</span>
        <span class="date">${fulldate}</span>
    </div>
    <i class="fa-solid fa-paste copy" onclick="popup()" ></i>
</div>`;
  document.querySelector(".history").append(element);
  if (document.getElementsByClassName("last").length == 71) {
    document.getElementsByClassName("last")[0].remove();
  }
  document.querySelector(".history").scrollTo(0, 100000);
}
//copy from history
function copy() {
  var copy = document.getElementsByClassName("copy");
  var copied = document.getElementsByClassName("copied");
  for (let i = 0; i < copy.length; i++) {
    copy[i].addEventListener("click", function () {
      navigator.clipboard.writeText(copied[i].innerHTML);
    });
  }
}
// clear history
function clearall() {
  document.querySelector(".history").innerHTML = "";
  document.querySelector(".history").style.overflowY = "";
}
//generate password
function rangechange() {
  copyText.innerHTML = "";
  generate();
  positionchange();
  //none selected
  if (
    color[0].style.backgroundColor == "" &&
    color[1].style.backgroundColor == "" &&
    color[2].style.backgroundColor == "" &&
    color[3].style.backgroundColor == ""
  ) {
    position.innerHTML = "";
  }
  //else
  else {
    for (let i = 0; i < range.value; i++) {
      count = Math.round(Math.random() * (mainselector.length - 1));
      copyText.innerHTML = copyText.innerHTML + mainselector[count];
    }
    position.innerHTML = range.value;
    show();
    copy();
  }
}
