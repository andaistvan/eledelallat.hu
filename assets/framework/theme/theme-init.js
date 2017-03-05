$(document).ready(function() {
  // Navigation
  $(window).bind('load scroll', function(){
     var y = $(window).scrollTop();
     if (y <= 15) {
       $('#lt-navigation nav').addClass('lt-no-background');
     } else if (y > 15) {
       $('#lt-navigation nav').removeClass('lt-no-background');
     }
  });
  $('.mobile-toggle').sideNav();

  //Dropdown
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: true // Stops event propagation
    }
  );

  $('.dropdown-button-mobil').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );



  // Slider
  $('.lt-slider').slider({full_width: true});
  $(window).resize(function() {
      $('.lt-slider').height($(window).height() + 15).css('position', 'relative');
  });
  $(window).trigger('resize');

  // Parallax
  $('.parallax').parallax();

  // Tabs
  // $('.lt-tabs').tabs();

  // Modal
  // $('.modal-trigger').leanModal();

  // Owl Carousel
  // $('.owl-carousel').owlCarousel({
  //     loop:true,
  //     items: 1,
  //     center: true
  // })

  // Select
  $('select').material_select();

  // DatePicker
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

  // PUSHPIN - STICKY
  // $(document).ready(function(){
  //   $('.single-card-links').pushpin({
  //     top: 0,
  //     bottom: 0,
  //     offset: 120
  //   });
  // });


  // MASONRY GRID
   $('.grid').isotope({
      itemSelector: '.grid-item',
      masonry: {
         columnWidth: 300,
         gutter: 10,
         isFitWidth: true
      }
   });

   //Initiat WOW JS
   new WOW().init();

});
