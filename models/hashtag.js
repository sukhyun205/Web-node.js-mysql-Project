// models/hashtag.js
const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) { // 테이블에 대한 설정
    return super.init({
      title: { // 해시 태그 이름
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt 자동 생성
      underscored: false,
      modelName: 'Hashtag',
      tableName: 'hashtags',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) { // 테이블 간 관계 설정
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
};