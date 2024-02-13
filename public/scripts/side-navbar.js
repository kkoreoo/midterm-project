
$(function() {

  //'Filter By' Drop Down Menu
  const $filterBy = $('.filter-tasks');

  $filterBy.on('click', function() {
    const $filterList = $('.filter-list');

    if ($filterList.css("display") == 'none') {
      $filterList.show(300);
    } else {
      $filterList.hide(300);
    }
  });

});
