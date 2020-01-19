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

document.querySelectorAll(".price").forEach(node => {
  node.textContent = toCarrency(node.textContent);
});

document.querySelectorAll(".date").forEach(node => {
  node.textContent = toDate(node.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", event => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;

      fetch("/card/remove/" + id, {
        method: "delete",
        headers: {
          "X-XSRF-TOKEN": csrf
        }
      })
        .then(res => res.json())
        .then(card => {
          if (card.products.length) {
            const html = card.products
              .map(c => {
                return `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.price}</td>
                                <td>${c.count}</td>
                                <td>
                                    <button class="btn red btn-small js-remove" data-id="${c.id}">Удалить</button>
                                </td>
                            </tr>`;
              })
              .join("");

            $card.querySelector("tbody").innerHTML = html;
            console.log(html);

            $card.querySelector(".price").textContent = toCarrency(card.price);
          } else {
            $card.innerHTML = "<p>Корзина пуста</p>";
          }
        });
    }
  });
}

// Carousel
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {
    duration: 300, // Продолжительность перехода в миллисекундах
    dist: -50, // Перспективный зум. Если 0, все элементы имеют одинаковый размер.
    shift: 0, // Установите интервал центрального элемента.
    padding: 0, // Установите отступ между нецентральными элементами.
    numVisible: 5, // Установите количество видимых предметов
    fullWidth: false, // Сделайте карусель ползунком полной ширины, как во втором примере.
    indicators: false, // Установите в true, чтобы показать индикаторы.
    noWrap: false, // Не оборачивайтесь и не перебирайте предметы.
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
