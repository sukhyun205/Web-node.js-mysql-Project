// models/post.js
const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) { // 테이블에 대한 설정
    return super.init({
      content: { // 게시글 내용
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: { // 이미지 경로
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt 자동 생성
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false, 
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) { // 테이블 간 관계 설정
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};