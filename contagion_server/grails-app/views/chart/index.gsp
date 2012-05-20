<html>
	<head>
		<title>CONTAGION</title>
		<link rel="stylesheet" href="${resource(dir: 'css/grid', file: '1140.css')}" />
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" />
		<g:javascript library="jquery/jquery"/>
		<g:javascript library="flot/jquery.flot"/>
		<g:javascript library="flot/jquery.flot.image.min"/>
		<g:javascript library="timeline"/>
		<g:javascript>
		
		$(document).ready(function() {
			window.data = {};
			window.data.contagionTimeline = new ContagionTimeline($('#chart'));
			window.data.contagionTimeline.setData(${contagionData});
		});
		
		</g:javascript>
	</head>
	<body>
		<div class="container" id="main">
			<div class="row content" id="chart">
			
			</div> <!-- #graph -->
		</div> <!-- #main -->
	</body>
</html>
