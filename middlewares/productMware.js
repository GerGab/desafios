

function addId (req,res,next){
    req.body.id = `${Date.now()}`;
    next();
}

module.exports = {addId}