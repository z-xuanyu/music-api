const Users = require("../models/users")
module.exports = async function(req,res){
  const user =  await Users.find()
  res.send(user)
}