const Category = require("../models/Category");
const slugify = require("slugify");

module.exports.addCategory_post= async(req,res)=>{
    const { name, parentId} =req.body;
    try{
        const slug=slugify(name);
        const cat= new Category({
            name,
            slug,
            parentId,
        });
        await cat.save();
        res.status(201).json({cat});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}

function createCategory(categories, parentId=null){
    const categoryList=[];
    let category;
    if(parentId==null){
        category=categories.filter((cat)=>cat.parentId==undefined);
    }
    else{
        category=categories.filter((cat)=>cat.parentId==parentId);
    }
    for(let cat of category){
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            parentId:cat.parentId,
            type:cat.type,
            children:createCategory(categories,cat._id),
        });
    }
    return categoryList;
}

module.exports.getCategories_get = async (req,res)=>{
    try{
        const categories=await Category.find({});
        const categoryList=createCategory(categories);
        res.status(200).json({categoryList});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({error})
    }
}