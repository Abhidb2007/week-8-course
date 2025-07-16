function createUserRoutes(app){
    app.post("/course/purchase", function(req,res){
        res.json({
            message: " "
        })
    })

    app.post("/course/preview", function(req,res){
        res.json({
            message: " "
        })
    })
}

module.exports = {
    createUserRoutes = createUserRoutes
}
    