$(function() {
	
	var $toggler = $(".subnav");
	var $toggleBtn = $(".subnav .subnavbtn");
	var $menubar = $('#icontext .responsive-navigation');
	var controlSelector = '> .group-res';

	var updateSubnavContent = function() {
		var menubarPositionLeft = 0;
		
		var $subnavContent = $toggler.find(".subnav-content");
		
		var menubarChildren = $menubar.find(controlSelector);
		var subnavContentChildren = $subnavContent.find('> .group-res');
		var menubarChildrenLength = menubarChildren.length;
		var subnavContentChildrenLength = subnavContentChildren.length;
		var totalLength = menubarChildrenLength + subnavContentChildrenLength;
		var togglerWidth = 0;
		var totalWidth = 0;
		var menuWidth = $menubar.outerWidth();

		for (var i = 0; i < totalLength; i++) {
			if (i >= menubarChildrenLength) {
				$(subnavContentChildren[i-menubarChildrenLength]).insertBefore( $toggler);

				menubarChildren = $menubar.find(controlSelector);
				subnavContentChildren = $subnavContent.find('> .group-res');
				menubarChildrenLength = menubarChildren.length;
				subnavContentChildrenLength = subnavContentChildren.length;
			}
			
			var itemWidth = $(menubarChildren[i]).outerWidth(true);
			totalWidth += itemWidth;
			togglerWidth = (i === (totalLength-1) && totalWidth <= menuWidth) ? 0 : $toggler.outerWidth();
			if ((totalWidth + togglerWidth) > menuWidth) {
				break;
			}
		}

		
		for (var j = menubarChildrenLength-1; j >= i; j--) {
			$subnavContent.prepend( menubarChildren.get( j ));
			
			menubarChildren = $menubar.find(controlSelector);
			subnavContentChildren = $subnavContent.find(controlSelector);
			menubarChildrenLength = menubarChildren.length;
			subnavContentChildrenLength = subnavContentChildren.length;
		}
		
		if( $subnavContent.children().length == 0 ) { // or whatever condition makes sense
			$toggler.hide();
		} else {
			 $toggler.show();
		}  
		
		var position = $toggler.offset();
		var menuPos = position.left - $subnavContent.width() + $toggler.outerWidth();
		if (menuPos < 0) {
			menuPos = 0;
		}
		$subnavContent.css('left', menuPos);		
	};
	
	$( window ).resize(function() {
		updateSubnavContent();
	});
	
	updateSubnavContent();
});
$(function() {
	
	var $toggler = $(".subnav-1");
	var $toggleBtn = $(".subnav-1 .subnavbtn");
	var $menubar = $('.wrapper-collapse-res-1 .responsive-navigation');
	var controlSelector = '> .group-res-1';

	var updateSubnavContent = function() {
		var menubarPositionLeft = 0;
		
		var $subnavContent = $toggler.find(".subnav-content-1");
		
		var menubarChildren = $menubar.find(controlSelector);
		var subnavContentChildren = $subnavContent.find('> .group-res-1');
		var menubarChildrenLength = menubarChildren.length;
		var subnavContentChildrenLength = subnavContentChildren.length;
		var totalLength = menubarChildrenLength + subnavContentChildrenLength;
		var togglerWidth = 0;
		var totalWidth = 0;
		var menuWidth = $menubar.outerWidth();

		for (var i = 0; i < totalLength; i++) {
			if (i >= menubarChildrenLength) {
				$(subnavContentChildren[i-menubarChildrenLength]).insertBefore( $toggler);

				menubarChildren = $menubar.find(controlSelector);
				subnavContentChildren = $subnavContent.find('> .group-res-1');
				menubarChildrenLength = menubarChildren.length;
				subnavContentChildrenLength = subnavContentChildren.length;
			}
			
			var itemWidth = $(menubarChildren[i]).outerWidth(true);
			totalWidth += itemWidth;
			togglerWidth = (i === (totalLength-1) && totalWidth <= menuWidth) ? 0 : $toggler.outerWidth();
			if ((totalWidth + togglerWidth) > menuWidth) {
				break;
			}
		}

		
		for (var j = menubarChildrenLength-1; j >= i; j--) {
			$subnavContent.prepend( menubarChildren.get( j ));
			
			menubarChildren = $menubar.find(controlSelector);
			subnavContentChildren = $subnavContent.find(controlSelector);
			menubarChildrenLength = menubarChildren.length;
			subnavContentChildrenLength = subnavContentChildren.length;
		}
		
		if( $subnavContent.children().length == 0 ) { // or whatever condition makes sense
			$toggler.hide();
		} else {
			 $toggler.show();
		}  
		
		var position = $toggler.offset();
		var menuPos = position.left - $subnavContent.width() + $toggler.outerWidth();
		if (menuPos < 0) {
			menuPos = 0;
		}
		$subnavContent.css('left', menuPos);		
	};
	
	$( window ).resize(function() {
		updateSubnavContent();
	});
	
	updateSubnavContent();
});



$(".subnav .navbar-toggler").on("click",function(){
    $(this).parent().toggleClass("show");
    if($(".subnav-1").hasClass("show")){
        $(".subnav-1").removeClass("show")
    }
})
$(".subnav-1 .navbar-toggler").on("click",function(){
    $(this).parent().toggleClass("show");
    if($(".subnav").hasClass("show")){
        $(".subnav").removeClass("show")
    }
})


window.addEventListener('click', function(e){
    if (!document.getElementById('subnav-1').contains(e.target) && (!document.getElementById('subnav').contains(e.target)) && !document.getElementById('device-select').contains(e.target)){
     document.getElementById('subnav-1').classList.remove("show") //the same code you've used to hide the menu
     document.getElementById('subnav').classList.remove("show") //the same code you've used to hide the menu
     document.getElementById('device-select-inner').classList.remove("show") //the same code you've used to hide the menu
     document.getElementById('device-select-inner').style.display ="none" //the same code you've used to hide the menu
  } 
})
window.addEventListener('click', function(e){
    if (!document.getElementById('device-select').contains(e.target)){
     document.getElementById('device-select-inner').classList.remove("show") //the same code you've used to hide the menu
     document.getElementById('device-select-inner').style.display ="none" //the same code you've used to hide the menu
  } 
})


