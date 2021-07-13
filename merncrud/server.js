const express= require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');



const app = express();

const postRoutes = require('./routes/posts');


app.use(bodyparser.json());
app.use(cors());

app.use(postRoutes);


const PORT = 8000;

const DB_URL = 'mongodb+srv://it20088682:minosh@project.vxoci.mongodb.net/merncurd?retryWrites=true&w=majority'



mongoose.connect(DB_URL,{

    useUnifiedTopology: true,
    useNewUrlParser:true,
})

.then(()=>{
    console.log("db conneted scuess")
        
    
}).catch((err) => console.log('db connection error' , err));

app.listen(PORT , ()=>{
    console.log(`app is running  on ${PORT} `);

});
