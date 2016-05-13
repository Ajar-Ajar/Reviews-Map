(function(){
	
	//reference UI elements
	const title_input 		= document.querySelector('.title_input');
	const city_input 			= document.querySelector('.city_input');
	const img_input 			= document.querySelector('.img_input');
	const description_input 	= document.querySelector('.description_input');
	const submit_btn 			= document.querySelector('.submit_btn');
	
	var city;
	
	var local_data 	= JSON.parse(localStorage.getItem('data_model'));
	//console.log('local_data: '+local_data)
	
	//if local_data doesn't exist - create it!!
	if(!local_data){
		local_data = {locations:{}}
	}
	
	window.initAutoComplete = function(){
		
        var options = {
                      types: ['(cities)']
                     };
		var autocomplete = new google.maps.places.Autocomplete(city_input, options);
	
  		//autocomplete.bindTo('bounds', map);
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			console.log(place);
			//console.log(place.geometry.location.lat());
			//console.log(place.place_id);
    		city = {
				place_id : place.place_id,
				formatted_address : place.formatted_address,
				lat : place.geometry.location.lat(),
				lng : place.geometry.location.lng()
			}
		})
	}
	
	submit_btn.addEventListener('click',function(){
		if(!validate_form()) return;
		//if current location doesn't exist - create it...
		if(!local_data.locations[city.place_id]){
			local_data.locations[city.place_id] = city;
			local_data.locations[city.place_id].reviews = [];
		}
		var review = {
			id : local_data.locations[city.place_id].reviews.length,
			title:title_input.value,
			img_url:img_input.value,
			description:description_input.value
		}
		local_data.locations[city.place_id].reviews.push(review);
		
		//save updated data to localStorage
		localStorage.setItem('data_model',JSON.stringify(local_data));
		
		//redirect to main screen...
		window.location.href = '../Map_list/map_list.html';
	})
	function validate_form(){
		var form_is_valid = true;
		if(!title_input.value){
			form_is_valid = false;
			title_input.className += " red_border";
		}
		if(!city_input.value){
			form_is_valid = false;
			city_input.className += " red_border";
		}
		if(!img_input.value){
			form_is_valid = false;
			img_input.className += " red_border";
		}else if(!validateUrl(img_input.value)){
			form_is_valid = false;
			img_input.className += " red_border";
		}
		if(!description_input.value){
			form_is_valid = false;
			description_input.className += " red_border";
		}
		return form_is_valid;
	}
})()