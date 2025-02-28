const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 4
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {

    searchPost: async (req, res) => {
        try {
            const query = req.query.title;

            // Utiliza una expresión regular insensible a mayúsculas y minúsculas
            const regex = new RegExp(query, 'i');

            const posts = await Posts.find({ title: { $regex: regex } })
                .limit(10)
                .select("title subCategory");

            res.json({ posts });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },


    crearPostPendiente: async (req, res) => {
        try {
            const { postData, images } = req.body;
            const { category, subCategory, Vente, Location, Location_Vacances, Echange, Cherche_Location, Cherche_Achat, title, description, price, unidaddeprecio, oferta, change, wilaya, commune,
                quartier, email, telefono, contadordevisitas, informacioncontacto, activarcomentarios, duraciondelanuncio, attributes, } = postData || {};

            if (!title || !category || !subCategory) {
                return res.status(400).json({ msg: "Faltan campos obligatorios" });
            }

            const newPost = new Posts({
                category, subCategory, Vente, Location, Location_Vacances, Echange, Cherche_Location, Cherche_Achat, title, description, price, unidaddeprecio, oferta, change, wilaya, commune,
                quartier, email, telefono, contadordevisitas, informacioncontacto, activarcomentarios, duraciondelanuncio, attributes,
                attributes,
                images,
                user: req.user._id,
            });

            await newPost.save();
            res.json({
                msg: 'Created Post!',
                newPost: {
                    ...newPost._doc,
                    user: req.user
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },

    aprobarPostPendiente: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            if (!post) return res.status(404).json({ msg: 'Publicación no encontrada' });

            post.estado = 'aprobado';
            await post.save();
            // Envia el _id del post aprobado en la respuesta
            res.json({ msg: 'Poste approuvé!', _id: post._id });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getPostsPendientes: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({ estado: 'pendiente' }), req.query).paginating()

            const posts = await features.query.sort('-createdAt')
                .populate("user likes", "avatar username   followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    getPosts: async (req, res) => {
        try {
            const { subCategory, title, wilaya, commune, minPrice, maxPrice, minRooms, maxRooms } = req.query;
            let filter = { estado: "aprobado" };

            // 📌 Filtro por subCategory
            if (subCategory) {
                filter.subCategory = subCategory;
            }

            // 📌 Filtro por title (búsqueda parcial, sin distinción de mayúsculas/minúsculas)
            if (title) {
                filter.title = { $regex: title, $options: "i" };
            }

            // 📌 Filtro por rango de precio
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) filter.price.$gte = parseInt(minPrice);
                if (maxPrice) filter.price.$lte = parseInt(maxPrice);
            }

            // 📌 Filtro por wilaya (búsqueda exacta)
            if (wilaya) {
                filter.wilaya = wilaya;
            }

            // 📌 Filtro por commune (búsqueda exacta)
            if (commune) {
                filter.commune = commune;
            }

            // 📌 Filtro por número de habitaciones (rooms)
            if (minRooms || maxRooms) {
                filter.rooms = {};
                if (minRooms) filter.rooms.$gte = parseInt(minRooms);
                if (maxRooms) filter.rooms.$lte = parseInt(maxRooms);
            }

            // 📌 Aplicando paginación y búsqueda
            const features = new APIfeatures(Posts.find(filter), req.query).paginating();
            const posts = await features.query
                .sort('-createdAt')
                .populate("user likes", "avatar username followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },


    /*
 
    getPosts: async (req, res) => {
        try {
            let filter = { estado: "aprobado" };
    
            // 🔹 Filtrar solo por subCategory
            if (req.query.subCategory) {
                filter.subCategory = { $regex: req.query.subCategory, $options: "i" };
            }
         
    
            // 🔹 Buscar los posts con el filtro
            const posts = await Posts.find(filter)
                .sort('-createdAt')
                .populate("user likes", "avatar username followers");
    
            res.json({ msg: "Success!", result: posts.length, posts });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    
*/
    updatePost: async (req, res) => {
        try {
            const { category, subCategory, title, description, price, unidaddeprecio, oferta, change, wilaya, commune,
                quartier, email, telefono, contadordevisitas, informacioncontacto, activarcomentarios, duraciondelanuncio, attributes, images } = req.body;

            const post = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    category, subCategory, title, description, price, unidaddeprecio, oferta, change, wilaya, commune,
                    quartier, email, telefono, contadordevisitas, informacioncontacto, activarcomentarios, duraciondelanuncio, attributes, images
                },
                { new: true } // 🔥 Esto devuelve el post actualizado
            )
                .populate("user likes", "avatar username")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });

            if (!post) {
                return res.status(404).json({ msg: "Post not found" });
            }

            // 🔥 Respuesta optimizada con el post actualizado
            res.json({
                msg: "Post actualizado correctamente",
                newPost: post
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    likePost: async (req, res) => {
        try {
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id })
            if (post.length > 0) return res.status(400).json({ msg: "You liked this post." })

            const like = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: req.user._id }
            }, { new: true })

            if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ msg: 'Liked Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    unLikePost: async (req, res) => {
        try {

            const like = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user._id }
            }, { new: true })

            if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ msg: 'UnLiked Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({ user: req.params.id }), req.query)
                .paginating()
            const posts = await features.query.sort("-createdAt")

            res.json({
                posts,
                result: posts.length
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
                .populate("user likes", "avatar username followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            if (!post) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({
                post
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getPostsDicover: async (req, res) => {
        try {

            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 9

            const posts = await Posts.aggregate([
                { $match: { user: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
            ])

            return res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({ _id: req.params.id, user: req.user._id })
            await Comments.deleteMany({ _id: { $in: post.comments } })

            res.json({
                msg: 'Deleted Post!',
                newPost: {
                    ...post,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    savePost: async (req, res) => {
        try {
            const user = await Users.find({ _id: req.user._id, saved: req.params.id })
            if (user.length > 0) return res.status(400).json({ msg: "You saved this post." })

            const save = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { saved: req.params.id }
            }, { new: true })

            if (!save) return res.status(400).json({ msg: 'This user does not exist.' })

            res.json({ msg: 'Saved Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    unSavePost: async (req, res) => {
        try {
            const save = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { saved: req.params.id }
            }, { new: true })

            if (!save) return res.status(400).json({ msg: 'This user does not exist.' })

            res.json({ msg: 'unSaved Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSavePosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({
                _id: { $in: req.user.saved }
            }), req.query).paginating()

            const savePosts = await features.query.sort("-createdAt")

            res.json({
                savePosts,
                result: savePosts.length
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = postCtrl