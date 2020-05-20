$(document).ready(function () {
    console.log("Loaded");
  function createBookDetails(book) {
    var $li = $("<li>");
      $li.addClass("list-group-item hover hover-invert cursor-pointer list-bg-color list-item-font");
      $li.html(book.id + ") " + book.title + " by " + book.author);
      $li.data("bookId", book.id);
      return $li;
    }

  function createCardImage() {
    return $("<img>")
      .addClass("card-img-top card-img")
      .attr({ src: currentBook.cover, alt: currentBook.title });
  }

  function createDataList() {
    console.log("List of Book Details Being Loaded");
    var list = $("<ul>").addClass("list-group list-group-flush");
    var content = ["country", "language", "pages", "year", "link"];
    content.forEach(function (details) {
      list.append(createDataItem(details));
    });

    return list;
  }
  function createDataItem(details) {
    var allDetails = $("<div>").addClass("list-group-item");
    if (details === "link") {
      var link = $("<a>")
        .attr({ href: currentBook.link, target: "_blank" })
        .addClass("btn btn-info")
        .html("Wikipedia");
      allDetails.append(link);
    } else {
      allDetails.html(
        `${details.charAt(0).toUpperCase() + details.substring(1)}: ${currentBook[details]}`
      );
    }
    return allDetails;
    
  }

  function createCardBody() {
    var cardBody = $("<div>").addClass("card-body");
    var title = $("<h4>").addClass("card-title").html(currentBook.title);
    var subTitle = $("<h6>")
      .addClass("card-subtitle")
      .html(`Written By: ${currentBook.author}`);
    var list = createDataList();
    cardBody.append([title, subTitle, list]);
    return cardBody;
  }
  function createCard() {
    var card = $("<div>")
      .addClass("card mt-5 mt-md-0 mb-5 mx-auto text-center")
      .css("width", "18rem");
    var img = createCardImage();
    var cardBody = createCardBody();
    card.append([img, cardBody]);
    return card;
  }
  var url = "http://csc225.mockable.io/books";
  var loading = $("<div>")
    .addClass("text-gray mt-5 mt-md-0")
    .attr("id", "loading")
    .html("Loading ...");
  var currentBook;

  $("body").addClass("flex");
  $("body").append(loading);

  axios
    .get(url)
    .then(function (res) {
      var data = res.data;
      loading.remove();
      $("body").removeClass("flex");
      $("#header").removeClass("hide");
      data.forEach((book) => {
        $("#book-list").append(createBookDetails(book));
      });

      $(".list-group-item").click(function () {
        $(".list-group-item").removeClass("active");
        $(this).addClass("active");
        $(".card").remove();
        $("#book-info").append(loading);
        axios
          .get(url + "/" + $(this).data("bookId"))
          .then(function (res) {
            var data = res.data;
            loading.remove();
            currentBook = data;
            $("#book-info").append(createCard());
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});