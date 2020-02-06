const toCarrency = price => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "UAH",
    style: "currency"
  }).format(price);
};

const toDate = date => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(date));
};

const toDateWithoutTime = date => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
};

document.querySelectorAll(".price").forEach(node => {
  node.textContent = toCarrency(node.textContent) + "/кг";
});

document.querySelectorAll(".date").forEach(node => {
  node.textContent = toDate(node.textContent);
});

document.querySelectorAll(".dateWithoutTime").forEach(node => {
  node.textContent = toDateWithoutTime(node.textContent);
});

/***************
    Carousel
****************/

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".carousel");
  var instance = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true
  });
});

/***************
    End Carousel
****************/

/*      Tabs       */

M.Tabs.init(document.querySelectorAll(".tabs"), { swipeable: false });

/*    End Tabs     */

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

/***************
     Tooltip
****************/
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems, {});
});
/***************
     End Tooltip
****************/

/***************
     Date Picker
****************/
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems, {});
});
/***************
     End Date Picker
****************/

/***************
     Parallax Container
****************/

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".parallax");
  var instances = M.Parallax.init(elems, {});
});

/***************
     End Parallax Container
****************/
