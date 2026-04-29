var cover = true;
var trigger = document.getElementById("trigger");
var div = document.getElementsByClassName("box")[0];

trigger.addEventListener("click", function () {
  if (cover) {
    div.classList.add("cover");
  } else {
    div.classList.remove("cover");
  }
  cover = !cover;
});
