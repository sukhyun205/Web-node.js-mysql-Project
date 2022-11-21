//3가지 경로에서 각각 html파일을 랜더링하여 페이지를 보여줌

// routes/page.js
const express = require('express');

const router = express.Router();

// 템플릿 엔진에서 사용할 변수 설정
router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

// http://localhost:3000/profile
router.get('/profile', (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

// http://localhost:3000/join
router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

// http://localhost:3000/
router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    title: 'NodeBird',
    twits,
  });
});

module.exports = router;