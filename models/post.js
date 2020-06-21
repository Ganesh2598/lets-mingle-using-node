module.exports = (Sequelize, connection)=> {
    const Post = connection.define("Post",{
        caption : {
            type : Sequelize.STRING
        },
        imageUrl : {
            type : Sequelize.STRING
        },
        userName : {
            type : Sequelize.STRING
        }
    },{
        tableName : "Post"
    })

    /*Post.associate = models =>{
        Post.belongsTo(models.User, {
            foreignKey : {
                allowNull : false
            }
        })
    }*/

    return Post;
}