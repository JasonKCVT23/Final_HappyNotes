const express = require('express');
const app = express();
const whiteboardRoutes = require('./routes/whiteboardRoutes');

app.use(express.json());
app.use('/', whiteboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
