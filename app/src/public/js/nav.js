"use strict";

$(document).ready(() => {
    $(".profile .icon-wrap").click(function () {
        $(this).parent().toggleClass("active");
        $(".notifications").removeClass("active");
    });

    $(".notifications .icon-wrap").click(function () {
        $(this).parent().toggleClass("active");
        $(".profile").removeClass("active");
    });

    $(".all").click(function () {
        $(".notifications").removeClass("active");
        $(".popup").addClass("active");
    });

    $(".close").click(function () {
        $(".popup").removeClass("active");
    });
});

const activePage = window.location.pathname;

if (activePage === "/") {
    $(".home").addClass("active");
}
if (activePage === "/about") {
    $(".about").addClass("active");
}
if (activePage === "/posts") {
    $(".board").addClass("active");
}