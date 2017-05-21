

//zavrit po kliku mimo elementy
function clouseOnBlur(el, target){
    if( el.hasClass("js-toggle-activated") ){
        setTimeout(function(){
            var customEvent;
            if( iOS == true ) customEvent = "touchend";
            else customEvent = "click";
            $body.one(customEvent, function(event){
                if(!$(event.target).closest(el).length && !$(event.target).closest(target).length) {//kliknuti mimo elementy
                    el.click();//zavre cilovy blok
                    //console.log("clicked out");
                }else{//kliknuti uvnitr elementu nebo cile
                    //console.log("clicked in");
                    var $clickedElement = $(event.target),
                        attr = $clickedElement.attr("data-close-onblur");

                    if (typeof attr !== typeof undefined && attr !== false && !$clickedElement.is(el)) {//pokud je to novy odkaz pro otevreni
                        el.click();//zavre cilovy blok
                    }else{//pokud je to proste kliknuti nekde uvnitr
                        clouseOnBlur(el, target);//nastav nove hlidani na body
                    }
                }
            });
        }, 1);
    }
}

//simulovat kliknuti na odkaz (pouziti onclick="simulateLink(event, this)")
function simulateLink(e, element){
    var $this = $(element),
        target = $( e.target );

    if( !target.is("a") && !target.parent().is("a") ){
        e.preventDefault();
        var $link = $this.find(".js-simulate-link-target").first();
        if( $link.length>0 ){//pokud odkaz existuje
            $link[0].click();//klikni na nej
        }
    }
}

//zobrazit / schovat (pouziti onclick="toggle(event, this)")
function toggle(e, element){
    var $this = $(element),
        target = $this.attr("href"),
        toggleClass = $this.attr("data-toggle-class"),//pridava tridu na tlacitko a target v aktivnim stavu
        toggleThis = $this.attr("data-this-not-toggle"),//schova tlacitko
        toggleText = $this.attr("data-toggle-text"),//vymeni text v tlacitku
        closeOnBlur = $this.attr("data-close-onblur"),//zavira po kliku mimo target a otevirajici tlacitko
        bodyFreezing = $this.attr("data-body-freeze"),//pridava tridu na body (pro zamezeni skrolu)
        effect = $this.attr("data-fadein");//vychozi je slide efekt, pro fade pouzit toto

    $this.toggleClass("js-toggle-activated");

    if( $this.is("input[type=checkbox]") || $this.is("input[type=radio]") ){//pokud se jedna o chechbox/radiobox
        var showOn = $this.attr("data-showon");//provest na hodnotu true nebo false
    }else{
        e.preventDefault();
    }


    if (typeof target == typeof undefined || target == false){//pokud target neni definovany v atributu "href"
        target = $this.attr("data-target");//pak musi byt definovany v atributu "data-darget"
    }

    var $target = $(target);//definovani cile

    if (!typeof toggleClass == typeof undefined || !toggleClass == false){
        $this.toggleClass(toggleClass);
        $target.toggleClass(toggleClass);
    }

    if (!typeof toggleThis == typeof undefined || toggleThis == true) $this.slideToggle(250);

    if (!typeof toggleText == typeof undefined || !toggleText == false){
        $this.attr("data-toggle-text", $this.text()).text(toggleText);
    }

    if (!typeof bodyFreezing == typeof undefined || !bodyFreezing == false) bodyFreeze();

    if (!typeof closeOnBlur == typeof undefined || !closeOnBlur == false) clouseOnBlur($this, $target);

    if( $this.is("input[type=checkbox]") || $this.is("input[type=radio]") ){//pokud se jedna o chechbox/radiobox
        if( $this.is(":checked") ){
            if(showOn == "checked"){
                if (!typeof effect == typeof undefined || !effect == false)
                    $target.stop().fadeIn(250);
                else 
                    $target.stop().slideDown(250);
            }
            else{
                if (!typeof effect == typeof undefined || !effect == false)
                    $target.stop().fadeOut(250);
                else 
                   $target.stop().slideUp(250); 
            }
        } 
        else{
            if(showOn == "checked"){
                if (!typeof effect == typeof undefined || !effect == false)
                    $target.stop().fadeOut(250);
                else 
                   $target.stop().slideUp(250); 
            }
            else{
                if (!typeof effect == typeof undefined || !effect == false)
                    $target.stop().fadeIn(250);
                else 
                    $target.stop().slideDown(250);
            }
        }
    }else{//neni to checkbox
        if (!typeof effect == typeof undefined || !effect == false) $target.stop().fadeToggle(250);//pokud to ma byt fade
        else $target.stop().slideToggle(250);//pokud to ma byt slide = defaultni
    }
};

//zamezeni skorolovani
function bodyFreeze(){
    if( $body.hasClass("overflow") ){//vratit do puvodniho stavu
        var scrollLength = Math.abs(parseInt($body.css("top")));
        $body.removeClass("overflow").removeClass("fixed").css("top", 0);
         $("html, body").scrollTop(scrollLength);
    }else{//zmrazit skrolovani v dokumentu
        $body.css("top", -$window.scrollTop()).addClass("overflow");
    }
}


//timer
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
    if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
    };
})();
/* usage
$(window).resize(function () {
    waitForFinalEvent(function(){
      alert('Resize...');
      //...
    }, 500, "some unique string");
});
*/



//nacist obrazek jako pozadi 
function imgToBg(el){
    var $this = $(el),
        src = $this.attr("src"),
        currentSrc = $this[0].currentSrc,
        $imgToBg = $this.next(".imgToBg");

    if( $imgToBg.length<1 ){//vytvorit div imgToBg pokud neexistuje
        $this.after('<div class="imgToBg"></div>').hide();

        $imgToBg = $this.next(".imgToBg").css({
            "opacity"   : $this.css("opacity"),
            "z-index"   : $this.css("z-index")
        });
    }

    if ( typeof currentSrc === "undefined" ){//nepodporuje current src
        $imgToBg.css("background-image", "url("+src+")");
    }else{//moderni prohlizec podporujici srcset
        $imgToBg.css("background-image", "url("+currentSrc+")");
    }

    if( !$this.hasClass("load-fired") ){
        $this.addClass("load-fired").load(function(){
            imgToBgFallback($this);
        });
    }
}


function fixedTopBar(){

    var $window = $(window);

    var pageHeader = $("#pageHeader"),
        topBar = $("topBar");
    var windowTimeout;

    /* scrolling and fixin navigation on top */
    $window.on('scroll', function(event) {
        if (windowTimeout) {
            return;
        }

        windowTimeout = setTimeout(function() {
            if (windowTimeout) {
                clearTimeout(windowTimeout);

                windowTimeout = null;
            }

            var windowScrollTop = $window.scrollTop();



                if ( windowScrollTop > (topBar.outerHeight()) ) {                   
                    setTimeout(function() {
                        
                        pageHeader.addClass('fixed');
                    
                    }, 1);
                }
                else{
                    
                    pageHeader.removeClass('fixed');                    
                        
                }

            

                
            
        }, 50);
    });
}

$(window).load(function(){
    
});
