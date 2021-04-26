var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var commonMealsList = {
    "La Casita Tacos" : [
        {
            "ingredient" : "La Casita Salsa",
            "quantity" : 1
        },
        {
            "ingredient" : "Tortillas",
            "quantity" : 1
        },
        {
            "ingredient" : "Ground Beef",
            "quantity" : 1
        },
        {
            "ingredient" : "Rosarita Beans",
            "quantity" : 1
        },
        {
            "ingredient" : "Shredded Cheese",
            "quantity" : 1
        }
    ],
    "Turkey Taco Boats" : [
        {
            "ingredient" : "Taco Seasoning",
            "quantity" : 1
        },
        {
            "ingredient" : "Romaine Letuce",
            "quantity" : 1
        },
        {
            "ingredient" : "Ground Turkey",
            "quantity" : 1
        },
        {
            "ingredient" : "Onion",
            "quantity" : 1
        },
        {
            "ingredient" : "Jalapenos",
            "quantity" : 2
        },
        {
            "ingredient" : "Mushrooms",
            "quantity" : 1
        },
        {
            "ingredient" : "Rosarita Beans",
            "quantity" : 1
        },
        {
            "ingredient" : "Shredded Cheese",
            "quantity" : 1
        }
    ],
    "Ceaser Salad" : [
        {
            "ingredient" : "Anchove Paste",
            "quantity" : 1
        },
        {
            "ingredient" : "Romaine Letuce",
            "quantity" : 1
        },
        {
            "ingredient" : "Parmasean Cheese",
            "quantity" : 1
        },
        {
            "ingredient" : "Croutons",
            "quantity" : 1
        },
        {
            "ingredient" : "Thin Cut Boneless Chicken Breast",
            "quantity" : 1
        },
        {
            "ingredient" : "Cucumber",
            "quantity" : 1
        },
        {
            "ingredient" : "Lemon",
            "quantity" : 1
        },
        {
            "ingredient" : "Bell Pepper",
            "quantity" : 2
        }
    ],
    "Basic Vinegarette Salad" : [
        {
            "ingredient" : "Red Bell Pepper",
            "quantity" : 2
        },
        {
            "ingredient" : "Romaine Letuce",
            "quantity" : 1
        },
        {
            "ingredient" : "Cucumber",
            "quantity" : 1
        },
        {
            "ingredient" : "Thin Cut Boneless Chicken Breast",
            "quantity" : 1
        },
        {
            "ingredient" : "Fetta Cheese",
            "quantity" : 1
        }
    ],
    "Stir Fry" : [
        {
            "ingredient" : "Red Bell Pepper",
            "quantity" : 1
        },
        {
            "ingredient" : "Snow Peas",
            "quantity" : 1
        },
        {
            "ingredient" : "Broccoli",
            "quantity" : 1
        },
        {
            "ingredient" : "Colliflower",
            "quantity" : 1
        },
        {
            "ingredient" : "Thin Cut Boneless Chicken Breast",
            "quantity" : 1
        },
        {
            "ingredient" : "Panda Express Sweet And Tangy Bejing Sauce",
            "quantity" : 1
        },
        {
            "ingredient" : "Onion",
            "quantity" : 1
        }
    ],
    "Hot Wings" : [
        {
            "ingredient" : "Chicken Drummets",
            "quantity" : 2
        },
        {
            "ingredient" : "Franks Red Hot",
            "quantity" : 1
        }
    ],
    "Lemon Chicken" : [
        {
            "ingredient" : "Chicken Thighs",
            "quantity" : 1
        },
        {
            "ingredient" : "Pearl Onions",
            "quantity" : 1
        },
        {
            "ingredient" : "Garlic",
            "quantity" : 1
        },
        {
            "ingredient" : "Rosemary",
            "quantity" : 1
        },
        {
            "ingredient" : "Lemon",
            "quantity" : 2
        }
    ],
    "Pork Loin" : [
        {
            "ingredient" : "Pork Loin",
            "quantity" : 1
        },
        {
            "ingredient" : "Onion",
            "quantity" : 1
        },
        {
            "ingredient" : "Garlic",
            "quantity" : 1
        }
    ],
    "Chilie Verde" : [
        {
            "ingredient" : "Pork Shoulder (4lbs)",
            "quantity" : 1
        },
        {
            "ingredient" : "Tomatillos",
            "quantity" : 4
        },
        {
            "ingredient" : "Poblamo Peppers",
            "quantity" : 2
        },
        {
            "ingredient" : "Anaheim or cubanelle peppers",
            "quantity" : 2
        },
        {
            "ingredient" : "Serrano or jalapeno",
            "quantity" : 2
        },
        {
            "ingredient" : "Onion",
            "quantity" : 1
        },
        {
            "ingredient" : "Garlic",
            "quantity" : 1
        },
        {
            "ingredient" : "Selantro",
            "quantity" : 2
        },
        {
            "ingredient" : "Tortillas",
            "quantity" : 1
        }
    ],
}

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("home", {mealsList: Object.keys(commonMealsList)});
});

app.get("/shoppinglist", function(request, response) {
    var generatedIngredientsHashMap = selectIngredients(commonMealsList, request.query.selectedMeals);
    var generatedIngredientsKeys = Object.keys(generatedIngredientsHashMap);
    response.render("shoppingList", {ingredientsHashMap: generatedIngredientsHashMap, ingredientsKeys: generatedIngredientsKeys});
});

app.get("*", function(request, response) {
    response.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started for FavFixns");
});

function selectIngredients(mealsList, selectedMeals) 
{
    var selectedMealsArray = selectedMeals.split("");
    var allIngredients = {};
    var mealsListKeys = Object.keys(mealsList);

    mealsListKeys.forEach((key, index) => {
        if (selectedMealsArray[index] == '1')
        {
            mealsList[key].forEach(function(meal, index){
                for (var i = 0; i < meal['quantity']; i++)
                {
                    if (allIngredients[meal['ingredient']] == null)
                    {
                        allIngredients[meal['ingredient']] = 1;
                    } 
                    else 
                    {
                        allIngredients[meal['ingredient']]++;
                    }
                }
            });
        }
    });

    return allIngredients;
}