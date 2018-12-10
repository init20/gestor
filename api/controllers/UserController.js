/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
const localStorage = require('localStorage');
var request = require('request');
module.exports = {
  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email, password} = await Joi.validate(req.allParams(), schema);
      const encryptedPassword = await UtilService.hashPassword(password);
      const results = await User.create({
        email,
        password: encryptedPassword
      });
      return res.ok(results);
    }
    catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err});
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email, password} = await Joi.validate(req.allParams(), schema);
      const user = await User.findOne({email});
      if(!user){
        return res.notFound({err: 'user does not exist'});
      }
      const matchedPassword = await UtilService.comparePassword(password, user.password);
      if(!matchedPassword){
        return res.badRequest({err: 'unauthorized'});
      }
      const token = JWTService.issuer({user: user.id}, '1 day');
      //console.log("aaa");
      //ocalStorage.setItem("Autorized", token);
      console.log(token);
      if(typeof(Storage)!=='undifined'){
        console.log("aaaa");
      }else{
        console.log("no aaaa");
      }
      console.log(localStorage);
      localStorage.setItem('Authorization', token);
      localStorage.getItem('Authorization');
      //res.header("Authorization", token);
      //var aux = {'Authorization: '+token};
      //headers: {authorization: token};

        //res.view('lista_lectores', headers, {lectores:lectores});
      req.authorization = token;
      res.cookie('authorization', token, {signed:true});
      console.log(email);
      if(email=="rpi@uv.cl"){
        return res.ok({token});
      }
      res.redirect('/lectores/lista');




    }
    catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err});
      }
      return res.serverError(err);
    }
  },
  getout: async function (req, res) {
    //res.cookie('chocolatechip', 'undefined', {signed:true});
    res.clearCookie('authorization');
    res.redirect('/login');

  }

};
