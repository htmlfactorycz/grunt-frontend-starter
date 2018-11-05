<?php $version = "1.0" //verze stylu, scriptu = proti cachovani ?>
<!DOCTYPE html>
<html lang="cs-CZ" class="no-js">
	<head>
		<!-- ostatni -->
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, minimal-ui, viewport-fit=cover">
			<link rel="stylesheet" media="all" href="assets/css/global.css?v=<?php echo $version ?>" id="global-styles">

			<!-- <base href="/"> toto odkomentovat pro nastaveni vsech cest do korenoveho adresare -->
		<!-- //ostatni -->

		<!-- !!! vyplnit dulezite SEO metatagy !!! -->
			<title><%= project.project.title %></title>
			<meta content="index,follow" name="robots">
			<meta name="description" content="popis vaseho webu">

			<meta property="og:title" content="<%= project.project.title %>">
			<meta property="og:description" content="A description displayed below the title.">
			<meta property="og:url" content="https://www.example.com">
			<meta property="og:site_name" content="Website name">
			<meta property="og:type" content="article">
			
			<meta property="og:image" content="https://www.example.com/static/images/image.jpg">
			<meta property="og:image:width" content="1200">
			<meta property="og:image:height" content="630">
			<meta property="og:locale" content="en_US">
			<meta property="og:image:type" content="image/jpeg">
		<!-- //vyplnit dulezite SEO metatagy -->
	</head>
	<body>

		<!-- NEMAZAT! IKONKY NAPRIC CELYM WEBEM -->
		<div class="hidesvg">
			<?php @include "images/svg/all.svg"; ?>
		</div>

		<!-- pouziti 
		<svg><use xlink:href="#icon-logo"/></svg>
		-->
		
		<div class="page" id="js-page">
			<header class="header">
				<div class="container">
					
				</div>
			</header>

			<main role="main" class="page__content"><!-- toto pouzivat na obsah. Obsah typu okno, paticka, hlavicka apod sem nepatri. Patri sem opravdu jen ta "stava" ze stranky. Predstav si to jako obsah clanku, kterou ches precist. -->
				<div class="container">
					
				</div>
			</main>

			 <footer class="footer">
				<div class="container">
					footer
				</div>
			</footer>
		</div>
	

		<!-- nacitani vsech scripu a funkci -->
			<script src="assets/js/all.js?v=<?php echo $version ?>"></script>
		<!-- //nacitani vsech scripu a funkci -->
	</body>
</html>