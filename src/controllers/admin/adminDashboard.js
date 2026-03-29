const User = require("../../models/user");
const Order = require("../../models/order");
const Category = require("../../models/category");


async function adminDashboard(req,res) {

    try{

        const allCategories = await Category.findAll(); // todas as categorias

        const Users = await User.findAll(); // todos
        const totalUsers = await User.count(); // total

        const totalOrders = await Order.count();
        const pendingOrders = await Order.findAll({where:{status:'PENDENTE'}});
        const paidOrders = await Order.findAll({where:{status:'PAGO'}});

        return res.status(200).render("dashboard",{Users,totalUsers,totalOrders,pendingOrders,paidOrders,allCategories})



    }catch{
        return res.status(500).send("Falha ao consultar dados");
    };
    
};


module.exports = {adminDashboard};