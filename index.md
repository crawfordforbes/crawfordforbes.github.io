<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="./assets/normalize.css">
	<link rel="stylesheet" type="text/css" href="./assets/styles.css">
	<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
	<title>The Quinn Continuum</title>
</head>
<body>
	<h1>Quinn</h1>
	<div class="album-wrapper" data-album-wrapper>
		
	</div>
	<div class="album" data-album-template>
		<img src="" alt="">
	</div>
</body>
<script>
	var folder = "/assets/images/";

	$.ajax({
	    url : folder,
	    success: function (data) {
	    	console.log(data)
	        $(data).find("a").attr("href", function (i, val) {
	            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
	                $("body").append( "<img src='"+ folder + val +"'>" );
	            } 
	        });
	    }
	});
</script>
</html>