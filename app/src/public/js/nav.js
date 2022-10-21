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
const values = {
    "/": 0,
    "/about": 1,
    "/posts": 2,
};

const value = values[activePage];

switch (value) {
    case 0:
        $(".home").addClass("active");
        break;
    case 1:
        $(".about").addClass("active");
        break;
    case 2:
        $(".posts").addClass("active");
        break;
}