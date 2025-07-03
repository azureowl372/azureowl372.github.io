// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const path = require('path');  // 引入 path 模塊
const app = express();

// 設定靜態文件目錄
app.use(express.static(path.join(__dirname, '../public')));

// 解析 JSON 請求
app.use(bodyParser.json());

// 根路徑路由，返回 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));  // 加載 index.html 文件
});

// 註冊支付路由
app.use('/payment', paymentRoutes);

// 啟動伺服器
// 設定付款成功頁面
app.get('/payment-success', (req, res) => {
    res.send(`
        <h1>Payment was successful!</h1>
        <script>
            // 儲存成功支付的狀態到 localStorage
            localStorage.setItem('paymentSuccess', 'true');
            setTimeout(function() {
                window.location.href = '/';  // 支付成功後跳回主頁
            }, 3000);  // 3秒後跳轉
        </script>
    `);
});



// 設定付款取消頁面
app.get('/payment-cancel', (req, res) => {
    res.send('<h1>Payment was cancelled.</h1>');
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
