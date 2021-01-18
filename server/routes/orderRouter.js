const router = require("express").Router();
const auth=require("../middleware/auth");
const { Order } = require("../models/orderModel");
const {User}=require("../models/userModel");
const {Product}=require("../models/productModel");
const admin=require("../middleware/admin");

router.post("/placeOrder/:total",auth,async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.user);
    const order=new Order({
    name:user.name,
    email:user.email,
    orderDate:new Date(),
    phoneNumber:user.phoneNumber,
    address:user.address,
    total:req.params.total,
    orderList:req.body
  });
  await order.save();
  user.cart=[];
  await user.save();
});

router.get("/get",auth,admin,async(req,res)=>{
  await Order.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

router.get("/getbyId/:id",auth,async(req,res)=>{
  const order=await Order.find();
  let total=0;
  order.map(order=>{
    order.orderList.map(item=>{
      if(item.id===req.params.id){
        total+=item.quantity;
      }
    })
  });
   res.send({quantity:total});
});
router.get("/getOneOrder/:id",auth,async(req,res)=>{
  await Order.findById(req.params.id).exec((err,doc)=>{
    if(err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});
router.delete("/delete/:id",auth,admin,async(req,res)=>{
  const order=await Order.findById(req.params.id);
  var negative=false;
  order.orderList.map(async (item,i)=>{
    const product=await Product.findByIdAndUpdate(item.id);
    if(item.quantity>product.quantity){
      negative=true;
    }
    else{
    product.quantity-=item.quantity;
    product.save();
    }
  });
   await Order.findByIdAndDelete({ _id: req.params.id });
});

module.exports = router;