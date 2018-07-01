/*! 
==============================================================

Project  	: <%= project.project.name %>
Author  	: <%= project.project.author %>
Author URI	: www.html-factory.cz
Created 	: <%= grunt.template.today("dd.mm.yyyy") %>

----------------------------------------
---------------- POZOR! ----------------
----------------------------------------

Stylopis byl vygenerovan pomoci CSS preprocesoru.
Nikdy needitujte primo .css soubor!
Viz readme.txt

============================================================== 
*/

// ************************************************ //
// 1. Core  
// ************************************************ //
@import 						"1_core/1_variables";
@import 						"1_core/2_mixins"; 
@import 						"1_core/3_used-fonts";
@import 						"1_core/4_reset";
@import 						"1_core/5_typography";
@import 						'1_core/keyframes';
@import 						"1_core/other-important";


// ************************************************ //
// 2. Libs  
// ************************************************ //
//@import 						"2_libs/animate";
//@import 						"../../../node_modules/slick-carousel/slick/slick";




// ************************************************ //
// 3. Components  
// ************************************************ //
//form elements
@import 						"3_components/button";
@import 						"3_components/button-colors";
@import 						"3_components/inputs";//input, select, textarea
//@import 						"3_components/select";//styled select

//web elements
@import 						"3_components/page";
@import 						"3_components/hidesvg";
@import 						"3_components/container";
@import 						"3_components/text";



// ************************************************ //
// 4 .Helpers  
// ************************************************ //
// pomocne tridy ve vsech velikostech
// ------------------------------------------------ 
//@import 						"4_helpers/color";
//@import 						"4_helpers/background";
