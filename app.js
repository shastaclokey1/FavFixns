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
            "quantity" : 3
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
        }
    ],
    "Basic Vinegarette Salad" : [
        {
            "ingredient" : "Red Bell Pepper",
            "quantity" : 1
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
            "ingredient" : "Croutons",
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
}

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("home", {mealsList: Object.keys(commonMealsList)});
});

app.get("/shoppinglist", function(request, response) {
    response.render("shoppingList");
});

app.get("*", function(request, response) {
    response.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started for FavFixns");
});