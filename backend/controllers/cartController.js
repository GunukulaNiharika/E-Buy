const Cart = require("../models/Cart");

module.exports.addItemToCart=  (req,res) =>{
    try{
        
        Cart.findOne({user: req.user.id}, async(err,cart)=>{
            if(err){
                res.status(400).json({error});
            }
            if(cart){
                const product=req.body.cartItems.product;
                const item =await cart.cartItems.find(c=>c.product== product);
                if(item){
                    await Cart.findOneAndUpdate({"user": req.user.id, "cartItems.product":product},{
                        "$set":{
                            "cartItems": {
                            ...req.body.cartItems,
                            quantity:item.quantity+req.body.cartItems.quantity
                            }
                        }
                    });
                    res.status(201).json({cart});
                }
                else{
                    await Cart.findOneAndUpdate({user: req.user.id},{
                        "$push":{
                            "cartItems": req.body.cartItems
                        }
                    });
                    res.status(201).json({cart});
                }
            }
            else{
                const cart= new Cart({
                    user: req.user.id,
                    cartItems: [req.body.cartItems]
                });
        
                await cart.save();
                res.status(201).json({cart});
            }
        });

        
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}
