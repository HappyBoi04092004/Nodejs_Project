import express,{Express} from "express";

const router = express.Router();
const webrouters = (app) =>{
    router.get('/', (req,res) => {
    res.render ("home.ejs");
    }
)
    router.get('/1', (req,res) => {
        res.send ('Hello world Hạnh ');
    }
)

    // router.listen(PORT, () => {
    //     console.log(`App is running on port : ${PORT} `);
    //     console.log(`Link vao thang web: http://localhost:${PORT}`);
    //     console.log('ENV PORT:', process.env.PORT);

app.use('/', router);
}
export default webrouters;

