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

// Carousel
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {
    duration: 300, // Продолжительность перехода в миллисекундах
    dist: -50, // Перспективный зум. Если 0, все элементы имеют одинаковый размер.
    shift: 0, // Интервал центрального элемента.
    padding: 0, // Отступ между нецентральными элементами.
    numVisible: 3, // Количество видимых элементов
    fullWidth: false, // Сделайте карусель ползунком полной ширины
    indicators: true, // Установите в true, чтобы показать индикаторы.
    noWrap: false, // Не оборачивать и не перебирать элементы
    onCycleTo: null, // Обратный вызов, когда новый слайд циклически повторяется.
    height: 640
  });
});

M.Tabs.init(document.querySelectorAll(".tabs"));

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
