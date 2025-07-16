
function createUserRoutes(app){
app.post("/",function(req, res){
    res.json({
        message: "sign up"
    })
})
app.post("/", function(req, res){
    res.json({
        message: "sign up"
    })
})
app.get("/",function(req, res){
     res.json({
        message: "sign up"
    })
})
}

module.exports = {
    createUserRoutes: createUserRoutes
}