$('.button').click(function () {
    $(this).parent().toggleClass('expanded');
    $(this).parent().toggleClass('collapsed');
    $(this).parents('.main-content').toggleClass('active');
  });
  