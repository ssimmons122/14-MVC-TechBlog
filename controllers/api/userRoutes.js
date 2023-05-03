const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
    User.findAll({
      include:[Blog, Comment]
    })
      .then(dbUsers => {
        res.json(dbUsers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "UhOh. An error!", err });
      });
  });


  //find.login 
  router.post("/login", (req, res) => {
    
      User.findOne({
        where:{
        username:req.body.username
      }
  }).then(foundUser=>{
        if(!foundUser){
          return res.status(400).json({msg:"Incorrect login combination"})
        }
        // compare pw with saved hash
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
          // if match, create session 
          req.session.user = {
            id:foundUser.id,
            username:foundUser.username
          }
          return res.json(foundUser)
         
        } else {
          return res.status(400).json({msg:"Incorrect login combination"})
        }
    })
  });
    
  //logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{include:[Blog, Post]})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "UhOh. An error!", err });
      });
});
  

module.exports = router; 