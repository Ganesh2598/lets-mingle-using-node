const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost/${process.env.DB_DATABASE}`);

const db = {}

db.Sequelize = Sequelize;
db.connection = connection;
db.user = require("./models/user")(Sequelize, connection)
db.post = require("./models/post")(Sequelize, connection)

db.user.hasMany(db.post,{
    foreignKey : "fk_userid",
    sourceKey : "userid"
})
db.post.belongsTo(db.user, {
    foreignKey : "fk_userid",
})

module.exports = db;