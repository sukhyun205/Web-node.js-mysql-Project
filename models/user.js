// models/user.js
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) { // 테이블에 대한 설정
    return super.init({
      email: { // 이메일
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: { // 닉네임
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: { // 패스워드 
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: { // SNS 로그인한 경우에 사용하는 변수
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: { // SNS 로그인한 경우에 사용하는 변수
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt 자동 생성
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, // deletedAt 자동 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { // 테이블 간 관계 설정
    db.User.hasMany(db.Post); // 사용자와 게시물 관계
    // 사용자와 사용자 관계
    db.User.belongsToMany(db.User, { // 사용자가 여러 사용자를 팔로잉
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, { // 사용자를 팔로잉하는 여러 명의 팔로워
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};