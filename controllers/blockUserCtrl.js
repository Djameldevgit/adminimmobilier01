const Users = require('../models/userModel');
const BlockUser = require('../models/blockModel'); // Importar modelo de bloqueos
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const userCtrl = {
    /*
        blockUser: async (req, res) => {
            try {
                const { motivo, fechaLimite} = req.body;
    console.log(req.body)
                // Verificar si el usuario existe
                const user = await Users.findById(req.params.id);
                if (!user) {
                    return res.status(404).json({ msg: "Usuario no encontrado." });
                }
    
                // Verificar si ya está bloqueado en la colección BlockUser
                const usuarioBloqueado = await BlockUser.findOne({ user: req.params.id });
                if (usuarioBloqueado) {
                    return res.status(400).json({ msg: "Este usuario ya está bloqueado." });
                }
    
                // Crear el registro de bloqueo
                const blockedUser = new BlockUser({
                    user: req.params.id,
                    motivo: motivo  ,
                    fechaLimite: fechaLimite ? new Date(fechaLimite) : null
    
                });
    
                await blockedUser.save();
    
                res.json({
                    msg: "Usuario bloqueado exitosamente.",
                    block: blockedUser
                });
    
            } catch (err) {
                return res.status(500).json({ msg: err.message || "Error al bloquear usuario." });
            }
        },*/
    blockUser: async (req, res) => {
        try {
            const { motivo, content, fechaBloqueo, fechaLimite } = req.body;//

            console.log(req.body)
            const user = await Users.findById(req.params.id);
            if (!user) return res.status(404).json({ msg: "Usuario no encontrado." });

            if (user.esBloqueado) {
                return res.status(400).json({ msg: "Este usuario ya está bloqueado." });
            }

            // Crear el registro en BlockUser
            const blockedUser = new BlockUser({
                user: req.params.id,
                motivo: motivo || "Sin especificar",
                content: content || "Sin especificar",
                fechaBloqueo: fechaBloqueo ? new Date(fechaBloqueo) : new Date(), // Si no se envía, usa la fecha actual
                fechaLimite: fechaLimite,
                esBloqueado: true
            });

            await blockedUser.save();

            // Actualizar estado en Users
            user.esBloqueado = true;
            await user.save();

            res.json({ msg: "Usuario bloqueado exitosamente." });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },



    // 🟢 Desbloquear usuario
    unblockUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            if (!user) return res.status(404).json({ msg: "Usuario no encontrado." });

            if (!user.esBloqueado) {
                return res.status(400).json({ msg: "Este usuario no está bloqueado." });
            }

            // Eliminar registro de bloqueo
            await BlockUser.findOneAndDelete({ user: req.params.id });

            // Actualizar el estado en Users
            user.esBloqueado = false;
            await user.save();

            res.json({ msg: "Usuario desbloqueado exitosamente." });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


    // 🔍 Obtener todos los usuarios bloqueados
    getBlockedUsers: async (req, res) => {
        
        try {
            const features = new APIfeatures(BlockUser.find(), req.query).paginating()
            const  blockedUsers = await features.query.sort('-createdAt')
            .populate('user', 'username email')
           

            return res.json({
                success: true,

                result: blockedUsers.length,

                blockedUsers
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
};

module.exports = userCtrl;
