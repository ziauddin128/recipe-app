var search_btn = document.querySelector(".search_btn");
var search_input = document.querySelector("#search_input");
var no_meal_text = document.querySelector("#no_meal_text");
var meal_container = document.querySelector(".meal_container");

search_btn.addEventListener("click", function()
{
    if(search_input.value == "")
    {
        alert("Search by name....");
    }
    else 
    {
        //fetch api
        fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${search_input.value}`)
            .then(function(response)
            {
               return response.json();
            })
            .then(function(result)
            {
                show_meal(result.meals);
            });
    }
})

function show_meal(meals)
{
    meal_container.innerHTML = "";
    meals.forEach(function(elem)
    {
        meal_container.innerHTML += `
        <div class="meal_box border border-gray-400 rounded-xl">
            <div class="meal_img">
                <img src="${elem.strMealThumb}" alt="${elem.strMeal}">
            </div>

            <div class="p-3">
                <h2 class="meal_title">${elem.strMeal}</h2>
                <p class="meal_desc">${elem.strInstructions.slice(0,100)}...</p>
    
                <p class="meal_category">
                    <span>${elem.strArea}</span>
                    <span>-</span>
                    <span>${elem.strCategory}</span>
                </p>
    
                <div class="flex gap-3 flex-wrap mt-3 meal_box_btm">
                    <a href="${elem.strYoutube}" target="_blank" class="bg-orange-500 text-white">Watch</a>
                    <button class="bg-indigo-400 text-white" onclick = "read_details('${elem.idMeal}')">Read More</button>
                </div>
            </div>
           
        </div>`;
        
    }) 
}

function read_details(id)
{
    fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(function(response)
    {
        return response.json();  
    })
    .then(function(result)
    {
       show_details(result.meals);
    });
}

var details_popup = document.querySelector(".details_popup");
var details_popup_in = document.querySelector(".details_popup_in");

function show_details(details)
{
    details_popup.style.display = "flex";

    details.forEach(function(elem)
    {
       details_popup_in.innerHTML = `<h1 class="text-4xl my-3 font-semibold text-black">${elem.strMeal}</h1>
       <p class="text-md text-gray-900">${elem.strInstructions}</p>
       <div class="flex gap-3 flex-wrap mt-3 meal_box_btm">
           <a href="${elem.strYoutube}" target="_blank" class="bg-orange-500 text-white">Watch</a>
           <button class="bg-indigo-400 text-white close_popup" onclick = "close_popup()">Close</button>
       </div>`;
    })
}

function close_popup()
{
    details_popup.style.display = "none";
}


