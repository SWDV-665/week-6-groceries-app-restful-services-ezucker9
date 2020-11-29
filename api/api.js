// require("./configuracion/variables");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Grocery=require("./models/grocery.js")
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Grocery API REST');
});

app.get("/grocerys",function (req, res) {
    

    Grocery.find({})
    .populate("grocery")
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json(data);

          })
 
});

app.get("/grocerys/:id",function (req, res) {
    

    Grocery.find({_id:req.params.id})
    .populate("grocery")
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json(data);

    })
 
});


app.post("/grocerys",function (req, res) {
    
   let body = req.body;

    let grocery = new Grocery({
        name: body.name,
        quantity : body.quantity,
        price : body.price
    });

    grocery.save((err, new_grocery)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json({
            ok:true,
            new_grocery
        });
    });
 
});


app.put("/grocerys/:id",function (req, res) {
    
   let body = req.body;

   id={_id:req.params.id};

    
    console.log(req.param)

    groceryUpd={
        quantity:body.quantity,
        price:body.price
    }

    Grocery.findByIdAndUpdate(id, groceryUpd, {new :true}, (err, modified) => {
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json({
            ok:true,
            modified
        });
    })

});

app.delete("/grocerys/:id",function (req, res) {
    
   let id = req.params.id;



    Grocery.findByIdAndRemove(id, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");

        return res.json({
            ok:true
        });
      })
   
 
});



mongoose.connect("mongodb://localhost/grocery", (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connect Succesfull");
});

app.listen(process.env.PORT || 3000, (err)=>{
    console.log("app listen on port: "+process.env.PORT);
})