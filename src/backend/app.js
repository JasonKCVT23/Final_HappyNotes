const express = require('express');
const app = express();
const PORT = 50050;

// 設定基本路由
app.get('/', (req, res) => {
      res.send('Hello, Express!');
});

// 啟動伺服器
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});