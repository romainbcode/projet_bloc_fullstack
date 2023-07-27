const cloudinary = require('../utils/cloudinary');
const Post = require('../models/postModel');
const ErrorResponse = require('../utils/errorResponse');
const main = require('../app')

//create post
exports.createPost = async (req, res, next) => {
    const { title, content, postedBy, image, likes, comments } = req.body;

    try {
        //upload image in cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "posts",
            width: 1200,
            crop: "scale"
        })
        const post = await Post.create({
            title,
            content,
            postedBy: req.user._id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },

        });
        res.status(201).json({
            success: true,
            post
        })


    } catch (error) {
        console.log(error);
        next(error);
    }

}

//show posts
exports.showPost = async(req, res, next)=>{
    try{
        const posts = await Post.find().sort({createdAt: -1}).populate('postedBy', 'name')//tri avec le plus récent en premier et populate car postedBy est lien entre les deux tables
        res.status(201).json({
            success: true,
            posts
        })
    }catch(err){
        next(err);
    }
}

//show single post
exports.showSinglePost = async(req, res, next)=>{
    try{
        const post = await Post.findById(req.params.id).populate('comments.postedBy', 'name')//comments.postedBy et sa ref (lien avec autre table) est user. donc on peut utiliser name de user 
        res.status(200).json({
            success: true,
            post
        })
    }catch(err){
        next(err);
    }
}

//show single post
exports.deletePost = async(req, res, next)=>{
    //Premier, on delete l'image
    const currentPost = await Post.findById(req.params.id);
    const ImgId = currentPost.image.public_id;

    if(ImgId){//Si l'image existe
        await cloudinary.uploader.destroy(ImgId);
    }

    try{
        //Deuxieme, on delete le post dans mongoDB
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Post deleted"
        })
    }catch(err){
        next(err);
    }
}

//update post
exports.updatePost = async(req, res, next)=>{
    try{
        const {title, content, image} = req.body;
        const currentPost = await Post.findById(req.params.id);

        //Build the object data
        const data = {
            title: title || currentPost.title,
            content: content || currentPost.content,
            image: image || currentPost.image,
        }

        //modify post image conditionnaly
        if(req.body.image !== ''){//Si une image doit etre modifié
            const ImgId= currentPost.image.public_id;
            if(ImgId){
                await cloudinary.uploader.destroy(ImgId);
            }
            const newImage = await cloudinary.uploader.upload(req.body.image, {
                folder: 'posts',
                width: 1200,
                crop: 'scale'
            });

            data.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            };
        }

        const postUpdate =  await Post.findByIdAndUpdate(req.params.id, data, {new:true});
        res.status(200).json({
            success: true,
            postUpdate
        })
    }catch(err){
        next(err);
    }
}


//add comment
exports.addComment = async (req, res, next) => {
    const { comment } = req.body;
    try {
        const postComment = await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: { text: comment, postedBy: req.user._id } }
        },
            { new: true }
        );
        const post = await Post.findById(postComment._id).populate('comments.postedBy', 'name email')//Ajoute les données name et email dans postedBy alors que normalement y'a que l'id car les deux tables sont liées par postedBy
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }

}


//add like
exports.addLike = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.user._id } //comme push maiw avec un id unique
        },
            { new: true }
        );
        const posts = await Post.find().sort({createAt: -1}).populate('postedBy', 'name')
        main.io.emit('add-like', posts)
        res.status(200).json({
            success: true,
            post,
            posts
        })

    } catch (error) {
        next(error);
    }

}


//remove like
exports.removeLike = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id }
        },
            { new: true }
        );
        const posts = await Post.find().sort({createAt: -1}).populate('postedBy', 'name')
        main.io.emit('remove-like', posts)
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }

}