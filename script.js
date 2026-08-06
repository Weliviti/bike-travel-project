var bgHearts = document.getElementById("bgHearts");
var askScreen = document.getElementById("askScreen");
var celebrate = document.getElementById("celebrateScreen");
var yesBtn = document.getElementById("yesBtn");
var noBtn = document.getElementById("noBtn");

var HEART = '<svg width="28" height="26" viewBox="0 0 32 29" fill="#e75480"><path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 20.4 6.5-8.5 16-11 16-20.4C32 3.8 28.2 0 23.6 0z"/></svg>';

/* ---------- floating hearts in the background ---------- */
function addBgHearts() {
  for (var i = 0; i < 12; i++) {
    var heart = document.createElement("div");
    heart.className = "bg-heart";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.width = 14 + Math.random() * 30 + "px";
    heart.style.height = 14 + Math.random() * 30 + "px";
    heart.style.animationDuration = 5 + Math.random() * 7 + "s";
    heart.style.animationDelay = -Math.random() * 15 + "s";
    heart.innerHTML = HEART;
    bgHearts.appendChild(heart);
  }
}
addBgHearts();

/* ---------- the No button runs away ---------- */
var labels = ["No", "Are you sure?", "Really sure?", "Think again…", "Last chance!", "No isn't an option 😏", "The No button is shy", "Fine, it gives up"];
var count = 0;
var moving = false;

function moveNo() {
  if (moving) return;
  moving = true;
  noBtn.className = "btn no dodging";

  var pad = 16;
  var maxX = window.innerWidth - noBtn.offsetWidth - pad;
  var maxY = window.innerHeight - noBtn.offsetHeight - pad;

  /* pick a spot that does not cover the Yes button */
  var yes = yesBtn.getBoundingClientRect();
  var x, y, tries = 0;
  do {
    x = pad + Math.random() * (maxX - pad);
    y = pad + Math.random() * (maxY - pad);
    tries++;
  } while (tries < 20 && x < yes.right && x + noBtn.offsetWidth > yes.left && y < yes.bottom && y + noBtn.offsetHeight > yes.top);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  count++;
  if (count <= labels.length) {
    noBtn.textContent = labels[count - 1];
  }
  if (count >= 6) {
    noBtn.style.transform = "scale(" + Math.max(0.55, 1 - count * 0.07) + ")";
  }

  setTimeout(function () { moving = false; }, 260);
}

noBtn.onclick = function () { moveNo(); };
noBtn.onmouseenter = function () { moveNo(); };
noBtn.ontouchstart = function (e) { e.preventDefault(); moveNo(); };

window.onresize = function () {
  if (moving) {
    var pad = 16;
    var x = Math.max(pad, Math.min(window.innerWidth - noBtn.offsetWidth - pad, parseFloat(noBtn.style.left) || 0));
    var y = Math.max(pad, Math.min(window.innerHeight - noBtn.offsetHeight - pad, parseFloat(noBtn.style.top) || 0));
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }
};

/* ---------- calendar ---------- */
var YEAR = 2026;              /* August 2026 */
var MONTH = 7;                /* 0 = January, so 7 = August */
var AVAILABLE_DAYS = [8, 9, 10, 11];
var selectedDay = null;

function buildCalendar() {
  var grid = document.getElementById("calGrid");
  var dow = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var html = "";
  for (var d = 0; d < 7; d++) {
    html += '<span class="cal-dow">' + dow[d] + "</span>";
  }

  var first = new Date(YEAR, MONTH, 1).getDay();     /* empty cells before day 1 */
  for (var i = 0; i < first; i++) {
    html += '<span></span>';
  }

  var total = new Date(YEAR, MONTH + 1, 0).getDate(); /* how many days in the month */
  for (var day = 1; day <= total; day++) {
    if (AVAILABLE_DAYS.indexOf(day) !== -1) {
      html += '<button type="button" class="cal-day available" data-day="' + day + '">' + day + "</button>";
    } else {
      html += '<span class="cal-day">' + day + "</span>";
    }
  }
  grid.innerHTML = html;

  var cells = grid.querySelectorAll(".cal-day.available");
  for (var c = 0; c < cells.length; c++) {
    cells[c].onclick = function () { selectDay(this); };
  }
}

function selectDay(cell) {
  var old = document.querySelector(".cal-day.selected");
  if (old) old.classList.remove("selected");
  cell.classList.add("selected");
  selectedDay = parseInt(cell.getAttribute("data-day"), 10);
}

function daySuffix(d) {
  if (d === 11 || d === 12 || d === 13) return "th";
  var last = d % 10;
  if (last === 1) return "st";
  if (last === 2) return "nd";
  if (last === 3) return "rd";
  return "th";
}

/* ---------- hearts burst out when Yes is pressed ---------- */
function removeLater(heart) {
  setTimeout(function () { heart.remove(); }, 1500);
}

function burst() {
  for (var i = 0; i < 32; i++) {
    var heart = document.createElement("div");
    heart.className = "burst-heart";
    heart.innerHTML = HEART;
    heart.style.left = window.innerWidth / 2 + "px";
    heart.style.top = window.innerHeight / 2 + "px";
    heart.style.width = 14 + Math.random() * 22 + "px";
    heart.style.height = 14 + Math.random() * 22 + "px";
    heart.style.setProperty("--dx", (Math.random() * 2 - 1) * (120 + Math.random() * 260) + "px");
    heart.style.setProperty("--dy", (Math.random() * 2 - 1) * (120 + Math.random() * 260) + "px");
    heart.style.setProperty("--rot", (Math.random() * 2 - 1) * 220 + "deg");
    document.body.appendChild(heart);
    removeLater(heart);
  }
}

yesBtn.onclick = function () {
  burst();
  askScreen.className = "hidden";
  celebrate.className = "celebration show";
  if (selectedDay) {
    var sub = celebrate.querySelector(".sub");
    sub.textContent = "See you on August " + selectedDay + daySuffix(selectedDay) + "!";
  }
};

buildCalendar();
