(function(){
    const add_review_btn = document.querySelector('.add_review_btn');
	
	add_review_btn.addEventListener('click',()=>{
		window.location.href = '../Add_review/add_review.html'
	})
	
	 window.initMap = function() {
		
		var mapDiv = document.getElementById('map_box');
    	var map = new google.maps.Map(mapDiv, {
		  center: {lat: 44.540, lng: -78.546},
		  zoom: 11
		});
		var input = document.querySelector('.search-input');
        var options = {
                      types: ['(cities)']
                     };
		var autocomplete = new google.maps.places.Autocomplete(input, options);
  		//autocomplete.bindTo('bounds', map);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			map.setCenter(place.geometry.location);
            
            var marker = new google.maps.Marker({
                                position: place.geometry.location,
                                map: map,
                                title: 'Hello World!'
                              });
		})
	}
	
})()
	