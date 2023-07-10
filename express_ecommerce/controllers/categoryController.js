
const Category=require('../models/categoryModel')

exports.testFunction=(req,res)=>{
    res.send('this is from the category controller')
}

// to post category 
exports.postCategory=async(req,res)=>{
    let category= new Category({
        category_name:req.body.category_name
    })
    //to check if data already exists
    Category.findOne({category_name:category.category_name})
    .then(async categories=>{
        if(categories){
            return res.status(400).json({error:'category must be unique'})
        }
        else{
            category= await category.save()
            if(!category){
                return res.status(400).json({error:'something went wrong,try again'})
            }
            res.send(category)
        }
    })
    .catch(err=>res.status(400).json({error:err}))
   
}

//to show all category 
exports.categoryList=async(req,res)=>{
    const category=await Category.find()
    if(!category){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(category)
}

//to show category details 
exports.categoryDetails=async(req,res)=>{
    const category= await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(category)
}

// to update category 
exports.updateCategory=async(req,res)=>{
    const category=await Category.findByIdAndUpdate(
        req.params.id,
        {
            category_name:req.body.category_name
        },
        {new:true}
    )
    if(!category){
        return res.status(400).json({error:'something went wrong'})  
    }
    res.send(category)
}

// to delete category 
exports.deleteCategory=(req,res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
        if(!category){
            return res.status(403).json({error:'category with that id not found'})
        }
        else{
            return res.status(200).json({message:'category deleted'})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}