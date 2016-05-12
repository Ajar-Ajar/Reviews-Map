
	const add_review_btn = document.querySelector('.add_review_btn');
	
	add_review_btn.addEventListener('click',()=>{
		window.location.href = 'add_review.html'
	})
	
	function initMap() {
		
		var mapDiv = document.getElementById('map_box');
    	var map = new google.maps.Map(mapDiv, {
		  center: {lat: 44.540, lng: -78.546},
		  zoom: 8
		});
		var input = document.querySelector('.search-input');
		var autocomplete = new google.maps.places.Autocomplete(input);
  		//autocomplete.bindTo('bounds', map);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			map.setCenter(place.geometry.location);
		})
	}
	