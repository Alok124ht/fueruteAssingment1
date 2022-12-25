const router = require("express").Router();
const User = require("../model/user");


// REGISTER
router.post("/register", async (req, res) => {
    try {
      let data = req.body
      const user = await User.findOne({ email: data.email });
      if(user) res.status(400).send({status:false,msg:"email is already exist"})
        
    //   const salt = await bcrypt.genSalt(10)
    //   data.password = await bcrypt.hash(data.password, salt)

      const result = await User.create(data)
      res.status(200).send({status:true,data:result,message:"user created successfully"})
    } catch (err) {
      res.status(500).json(err)
    } 
  });

  router.post("/login", async (req,res)=>{
    try {
       
        const data = req.body
        // if (isEmptyVar(data)) return res.status(400).send({ status: false, message: " Login BODY must be required!" })
        let { email, password } = data;

        console.log(email,password);
        //  db call for login and validation
        const user = await User.findOne({ email: req.body.email })
        console.log(user);
        if (!user) return res.status(404).send({ status: false, message: ` Wrong Email address or Password!` })

        //  vfy the password
   

        res.status(200).send({status:true,message:"login successfull"})
      } catch (err) {
        res.status(500).json(err)
      }
  })

  module.exports = router;

