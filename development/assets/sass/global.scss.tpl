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
//@import 						"1_core/6_grid-system"; 
@import 						"1_core/other-important";

// core sprites png and svg
// ------------------------------------------------ 
@import 						"1_core/sprites/sprites";

// core forms
// ------------------------------------------------ 
@import 						"1_core/forms/buttons";
@import 						"1_core/forms/inputs";
@import 						"1_core/forms/labels";
@import 						"1_core/forms/main";
//@import 						"1_core/forms/select";
//@import 						"1_core/forms/validation";




// ************************************************ //
// 2. Libs  
// ************************************************ //
//@import 						"2_libs/animate";
//@import 						"2_libs/slick";





// ************************************************ //
// 3. Layout  
// ************************************************ //
// sem patri prvky kostry pr.: hlavicka, paticka, obal webu
// ------------------------------------------------ 
@import 						"3_layout/layout";

// header
// ------------------------------------------------ 
@import 						"3_layout/header/main";
@import 						"3_layout/header/logo";
@import 						"3_layout/header/menu";
//@import 						"3_layout/header/navigation";






// ************************************************ //
// 4. Components  
// ************************************************ //
// box
// ------------------------------------------------ 
@import 						"4_components/box/empty"; //smazat nebo nahradit

// list
// ------------------------------------------------ 
@import 						"4_components/list/items"; //smazat nebo nahradit

// table
// ------------------------------------------------ 


// window
// ------------------------------------------------ 


// form
// ------------------------------------------------ 


// wrap
// ------------------------------------------------ 


// in
// ------------------------------------------------ 




// ************************************************ //
// 5. Single  
// ************************************************ //
// samostatne stranky (radeji nepouzivat)
// ------------------------------------------------ 


// ************************************************ //
// 6 .Helpers  
// ************************************************ //
// pomocne tridy ve vsech velikostech
// ------------------------------------------------ 
// pridat xl-xs helpery + responsivity !!
@import 						"6_helpers/0_columns";
@import 						"6_helpers/1_helpers";

