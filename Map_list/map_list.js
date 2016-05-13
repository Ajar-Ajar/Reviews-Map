(function(){
    //reference UI elements
	const add_review_btn 	= document.querySelector('.add_review_btn');
	const reviews_list 		= document.querySelector('.reviews_list');
	
	//get local data
	var local_data 	= JSON.parse(localStorage.getItem('data_model'));
	console.log('local_data: ',local_data)
	
	var city;
	
	if(local_data){
		//if reviews exist get the first city //TODO get random city...
		var city_place_id = Object.keys(local_data.locations)[0];
		populate_reviews_list(city_place_id);
	}else{
		city = {
			lat:32.0879585,
			lng:34.7622266
		}
	}
	function populate_reviews_list(place_id){
		city = local_data.locations[place_id];
		var reviews = city.reviews;
		var html_string = '';
		reviews.forEach((review)=>{
			html_string += `<li class="review_item" data-id="${review.id}">
								<img class="review_thumb" src="${review.img_url}">
								<div class="texts_box">
									<h4 class="review_title">${review.title}</h4>
									<p class="review_description">${review.description}</p>
								</div>
							</li>`
		})
		reviews_list.innerHTML = html_string;
	}
	
	 window.initMap = function() {
		
		var mapDiv = document.getElementById('map_box');
    	var map = new google.maps.Map(mapDiv, {
		  center: {lat: city.lat, lng: city.lng},
		  zoom: 11
		});
		 
		var marker = new google.maps.Marker({
                                position: city,
                                map: map
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
            
            populate_reviews_list(place.place_id)
		})
	}
	 
	add_review_btn.addEventListener('click',()=>{
		window.location.href = '../Add_review/add_review.html'
	})
	
	
})()
	