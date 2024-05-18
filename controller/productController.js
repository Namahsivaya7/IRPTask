import ProductModel from "../models/ProductModel.js";
import fs from 'fs';
import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
export const createProductController=async(req,res)=>{
    try{
        const {name,slug,description,original_price,selling_price,discount,category,quantity,shipping}=req.fields
        const {photo}=req.files; 
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'name is required'})
            case !description:
                return res.status(500).send({error:'description is required'})
            case !original_price:
                return res.status(500).send({error:'original price is required'})
            case !selling_price:
                return res.status(500).send({error:'selling price is required'})
            case !discount:
                return res.status(500).send({error:'discount is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
           
            case photo && photo.size>1000000:
                return res.status(500).send({error:'photo is required'})
           
        } 
      const product= new ProductModel({...req.fields,slug:slugify(name)})
      if(photo){
        product.photo.data=fs.readFileSync(photo.path);
        product.photo.contentType=photo.type;
        console.log(product); // Check if product is fetched correctly
        console.log(product.photo.contentType); // Check the contentType value
      }
      await product.save()
      res.status(201).send({
        success:true,
        message:"product added successfully",
        product,
      });
    }
    catch(error){
     console.log(error);
     res.status(500).send({
        success:false,
        error,
        message:"error in creating product"
     })
    }
}
//get all products
export const getProductController=async(req,res)=>{
 try{
    const products= await ProductModel.find({}).populate('category').select("-photo").sort({createdAt:-1});
    res.status(200).send({
        success:true,
        counTotal:products.length,
        message:"all products",
        products,
        
    });
    
 }
 catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in getting products",
        error:error.message,
    })

 }
}

//get single product
export const getSingleProductContoller=async(req,res)=>{
    try{
        const product =await ProductModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            message:"fetched single product successfully",
            product,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in fetching single product",
            error,
        })
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        
        if (!product || !product.photo) {
            return res.status(404).send({ success: false, message: "Product photo not found" });
        }

        // Set content type to the appropriate value
        res.set("Content-Type", product.photo.contentType);

        // Send the photo data
        return res.status(200).send(product.photo.data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching product photo",
            error: error.message // It's better to send only error message to the client
        });
    }
};

//delete controller
export const deleteProductController=async(req,res)=>{
    try{
        await ProductModel.findByIdAndDelete(req.params.pid).select("photo")
        res.status(200).send({
            success:true,
            message:"product deleted successfully",
        });
    }
    catch(error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:"cant delete the product",
            error
        })
    }
}

//update controller
export const updateProductController=async(req,res)=>{
        try{
            const {name,description,original_price,selling_price,discount,category,quantity}=req.fields
            const {photo}=req.files; 
            //validation
            switch(true){
                case !name:
                    return res.status(500).send({error:'name is required'})
                case !description:
                    return res.status(500).send({error:'description is required'})
                case !original_price:
                    return res.status(500).send({error:'original price is required'})
                case !selling_price:
                    return res.status(500).send({error:'selling price is required'})
                case !discount:
                    return res.status(500).send({error:'discount is required'})
                case !category:
                    return res.status(500).send({error:'category is required'})
               
                case photo && photo.size>1000000:
                    return res.status(500).send({error:'photo is required'})
               
            } 
          const product= await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
          if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type;
            console.log(product); // Check if product is fetched correctly
            console.log(product.photo.contentType); // Check the contentType value
          }
          await product.save()
          res.status(201).send({
            success:true,
            message:"product updated successfully",
            product,
          });
        }
    
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"cannot update product",
            error
        })
    }
}
//filter products
export const productFilterController=async(req,res)=>{
try{
  const {checked,radio}=req.body 
  let args={}
  if(checked.length>0) args.category=checked;
  if(radio.length) args.selling_price={$gte:radio[0],$lte:radio[1]}
  const products=await ProductModel.find(args)
  res.status(200).send({
    success:true,
    products,
  })
}
catch(error){
    console.log(error)
    res.status(400).send({
        success:false,
        message:"error while filtering products",
        error
    })
}
}

export const productCountController=async(req,res)=>{
    try{
        const total=await ProductModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,
        })

    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in product count",
            error
        })

    }
}
//product list base on page
export const productListController=async(req,res)=>{
    try{
      const perPage=8;
      const page=req.params.page? req.params.page:1;
      const products=await ProductModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
      res.status(200).send({
        success:true,
        products
      })
      }
    catch(error){
       console.log(error)
       res.status(400).send({
        success:false,
        message:"error in per page ctrl",
        error
       })

    }
}

//search product
export const searchProductController=async(req,res)=>{
    try{
   const {keyword}=req.params 
   const results =await ProductModel.find({
    $or:[
        {name:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}}

    ]
   }).select("-photo")
   res.json(results)
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in search product api",
            error
        })
    }
}

export const relatedProductController=async(req,res)=>{
    try{
    const {pid,cid}=req.params
    const products=await ProductModel.find({
        category:cid,
        _id:{$ne:pid}
    }).select("-photo").limit(4).populate("category");
    res.status(200).send({
        success:true,
        products,
    })
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in getting similar products",
            error
        })
    }
}

export const productCategoryController=async(req,res)=>{
    try{
   const category=await CategoryModel.findOne({slug:req.params.slug})
   const products=await ProductModel.find({category}).populate("category");
   res.status(200).send({
    success:true,
    category,
    products,
   })
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in getting category product",
            error
        })
    }
}