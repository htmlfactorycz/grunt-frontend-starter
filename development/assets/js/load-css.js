// tento kod detekuje podporu REM jednotek
// css styly najdete na teto URL adrese: /assets/css/global.css

//Author      : Vitalij Petras
//Author URI  : www.html-factory.cz
//Created     : 07.12.2016

var cssPath = "assets/css/global";
if( typeof version === 'undefined' || version === null ) version = "1.0";

function checkRem(attribute, test){
  var supports = false;
  try {
    var div = document.createElement("div");
    div.style[attribute] = test;
      if(div.style[attribute] === test){
        supports = true;
    }
  } catch(e){}
  return supports;
}


//pokud prohlizec nepodporuje REM jednotky 
if(!checkRem("fontSize", "1rem")){
  cssPath += "-rem-fallback";//nacti PX fallback
}
document.write('<link rel="stylesheet" type="text/css" media="screen" href="'+cssPath+'.css?v='+version+'">');