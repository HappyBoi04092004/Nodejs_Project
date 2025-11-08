const express = require("express");
const app = express();

const PORT =3000;
app.get('/', (req,res) => {
    res.send ('App is running and update');
    }
)
app.get('/1', (req,res) => {
    res.send ('Hello world Hạnh ');
    }
)

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT} `);
    console.log(`Link vao thang web: http://localhost:${PORT}`);
})

