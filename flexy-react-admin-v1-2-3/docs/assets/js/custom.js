$(function () {
  "use strict";

  $(".preloader").fadeOut();

  // ==============================================================
  // sidebar-hover
  // ==============================================================

  $(".left-sidebar").hover(
    function () {
      $(".navbar-header").addClass("expand-logo");
    },
    function () {
      $(".navbar-header").removeClass("expand-logo");
    }
  );

  $(".sidebartoggler").on("click", function () {
    $("#main-wrapper").toggleClass("mini-sidebar");
    if ($("#main-wrapper").hasClass("mini-sidebar")) {
      $(".sidebartoggler").prop("checked", !0);
      $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
    } else {
      $(".sidebartoggler").prop("checked", !1);
      $("#main-wrapper").attr("data-sidebartype", "full");
    }
  });

  var setsidebartype = function () {
    var width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
    if (width < 1170) {
      $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
    } else {
      $("#main-wrapper").attr("data-sidebartype", "full");
    }
  };
  $(window).ready(setsidebartype);
  $(window).on("resize", setsidebartype);

  // this is for close icon when navigation open in mobile view

  $(".nav-toggler").on("click", function () {
    $("#main-wrapper").toggleClass("show-sidebar");
    $(".nav-toggler i").toggleClass("ti-menu");
  });

  // ==============================================================
  // Resize all elements
  // ==============================================================

  $("body, .page-wrapper").trigger("resize");
  $(".page-wrapper").delay(20).show();

  $("#sidebarnav a").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 85,
      },
      500
    );
    return false;
  });
  var lastId,
    topMenu = $("#sidebarnav"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });
  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight - 85;
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    if (lastId !== id) {
      lastId = id;
      menuItems
        .removeClass("active")
        .filter("[href='#" + id + "']")
        .addClass("active");
    }
  });
});
