'use strict';
import category from './data.js';
import $ from 'jquery';
import Handlebars from 'handlebars';

$(document).ready(function () {
    initHtml();
    listenScroll();
    bindNavClick();
});

// 初始化html
function initHtml() {
    let source = $('#category-template').html();
    let template = Handlebars.compile(source);
    let navList = [],
        categoryList = [];
    for (let [key, value] of Object.entries(category)) {
        navList.push({
            id: value.id,
            name: value.name
        });
        categoryList.push({
            id: value.id,
            name: value.name,
            category: value.category
        });
    }
    let data = {
        navList: navList,
        categoryList: categoryList
    };

    let html = template(data);
    $('#main-content').html(html);

    $('.nav-list li.nav-item:first-child').addClass('active');
}

// 监听页面滚动
function listenScroll() {
    $(window).scroll(function () {
        let scrollTop = $(document).scrollTop();
        let windowHeight = $(window).height();
        let documentHieght = $(document).height();
        $('.data-list li.data-item').each(function (idx, el) {
            let $el = $(el);
            if (scrollTop < $el.offset().top - 100) {
                return false;
            }

            $('.nav-list li.nav-item').removeClass('active');
            if (scrollTop + windowHeight == documentHieght) {
                $('.nav-list li.nav-item:last-child').addClass('active');
            } else {
                let id = $el.attr('id');
                $('li.nav-item a[href="#' + id + '"]').parent().addClass('active');
            }
        })
    });
}

// 绑定点击事件
function bindNavClick() {
    $('.nav-list li.nav-item').click(function (e) {
        $('.nav-list li.nav-item').removeClass('active');
        let $el = $(this);
        $el.addClass('active');
        let id = $el.data('id');
        let elTop = $('#' + id).offset().top;
        let windowHeight = $(window).height();
        let documentHieght = $(document).height();
        console.log('elTop', elTop);
        $(document).scrollTop((elTop + 100));
    })
}