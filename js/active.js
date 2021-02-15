$('.o-select').select2({
    // placeholder: 'Select an option'
    
  });
$('.position-select-box .o-select').select2({
    // placeholder: 'Select an option'
    dropdownParent: $('.position-select-box')
  });


  var data = [
    {
        id: 0,
        text: '<i class="fa fa-book fa-fw"></i>'
    },
    {
        id: 1,
        text: '<i class="fa fa-book fa-fw"></i>'
    },
    {
        id: 2,
        text: '<i class="fa fa-book fa-fw"></i>'
    },
    {
        id: 3,
        text: '<i class="fa fa-book fa-fw"></i>'
    },
    {
        id: 4,
        text: '<i class="fa fa-book fa-fw"></i>'
    }
];
function formatState (state) {
    if (!state.id) {
      return state.text;
    }
  
    var baseUrl = "fa fa-lg fa-";
    var $state = $(
      '<span><i> </i></span>'
    );
  
    $state.find("i").attr("class", baseUrl + state.element.value.toLowerCase());
  
    return $state;
  };
  
  // $(".o-select-2").select2({
  //   templateSelection: formatState,
  //   dropdownParent: $('.media-select .append-select')
  // });

//   $(".o-select-3").select2({
//     templateSelection: formatState,
//     dropdownParent: $('.text-decoration-control .append-select')
//   });
  



$('#font-picker').fontselect();

$('.color-picker').each( function() {
    //
    // Dear reader, it's actually very easy to initialize MiniColors. For example:
    //
    //  $(selector).minicolors();
    //
    // The way I've done it below is just for the demo, so don't get confused
    // by it. Also, data- attributes aren't supported at this time...they're
    // only used for this demo.
    //
    $(this).minicolors({
      control: $(this).attr('data-control') || 'hue',
      defaultValue: $(this).attr('data-defaultValue') || '',
      format: $(this).attr('data-format') || 'hex',
      keywords: $(this).attr('data-keywords') || '',
      inline: $(this).attr('data-inline') === 'true',
      letterCase: $(this).attr('data-letterCase') || 'lowercase',
      opacity: $(this).attr('data-opacity'),
      position: $(this).attr('data-position') || 'bottom left',
      swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
      change: function(value, opacity) {
        if( !value ) return;
        if( opacity ) value += ', ' + opacity;
        if( typeof console === 'object' ) {
          console.log(value);
        }
      },
      theme: 'bootstrap'
    });

  });





  function iconSelectBox(){
    //test for getting url value from attr
// var img1 = $('.test').attr("data-thumbnail");
// console.log(img1);

//test for iterating over child elements
$(".select-dropdown-wrapper").css({"display":"none"});
// $(".select-dropdown-wrapper").addClass("hide");
var langArray = [];
var iconArray = [];
$('.media-select-original option').each(function(){
  var text = this.innerText;
  var value = $(this).val();
  var item = '<li><i class="'+ text +'"></i></li>';
  var iconItem = '<i class="'+ text +'"></i>';
  langArray.push(item);
  iconArray.push(iconItem);
})

$('.select-dropdown-wrapper ul').html(langArray);

//Set the button value to the first el of the array
$('.btn-select').html(iconArray[0]);
$('.btn-select').attr('value', 'en');

//change button stuff on click
$('.media-select .select-dropdown-wrapper li').click(function(){
  //  var icon = $(this).find('img').attr("class");
   var value = $(this).find('i').attr('class');
   var text = this.innerText;
   var item = '<i class="'+ value +'"></i>';
  $('.media-select .btn-select').html(item);
  // $('.media-select .btn-select').attr('value', value);
  $(".select-dropdown-wrapper").toggle();
  $(".select-dropdown-wrapper").toggleClass("show");
  //console.log(value);
});

$(".btn-select").click(function(){
        $(".select-dropdown-wrapper").toggle();
        $(".select-dropdown-wrapper").toggleClass("show");
    });

//check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang){
  //find an item with value of sessionLang
  var langIndex = langArray.indexOf(sessionLang);
  $('.btn-select').html(langArray[langIndex]);
  $('.btn-select').attr('value', sessionLang);
} else {
   var langIndex = langArray.indexOf('ch');
  console.log(langIndex);
  $('.btn-select').html(langArray[langIndex]);
  //$('.btn-select').attr('value', 'en');
}



  }

  iconSelectBox()