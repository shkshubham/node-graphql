const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');

const register = async (_, data) =>{
  const saltRounds = 10;
  const newUser = data
  newUser.password = await bcrypt.hash(newUser.password, saltRounds);
  const createUser = await new models.User(newUser).save()
  console.log(createUser)
  return createUser
}
const login = async (_, data, {SECRET}) =>{
  var user = {};
  user = await models.User.findOne({
    email: data.email
  })
  if(!user){
    throw new Error("Enter Correct Email Address")
  }else{
    var validPassword = await bcrypt.compare(data.password, user.password)
    if(!validPassword){
      throw new Error("Enter Correct password")
    }
    const token = jwt.sign({
      user: lodash.pick(user, ['id', 'username'])
    }, SECRET, {
      expiresIn:'1y'
    });
    userObj = {
      token: token,
      email: user.email
    }
    return userObj
  }
  return null
}
const profile =  async (parent, _ , {user})=>{
  if(!user){
    throw new Error("please log in!")
    return null
  }else{
    userInfo = await models.User.findOne({_id:user.id })
    console.log(userInfo)
    return userInfo
  }
}

module.exports = {
  register,
  login,
  profile
}
