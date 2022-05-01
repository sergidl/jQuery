import express from 'express';
import moviesRouter from './routers/moviesRouter.js';
import userRouter from './routers/userRouter.js';
import clientErrorHandler from './middleware/errorHandler.js';
import errorRouter from './routers/errorRouter.js';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log('---->app.js');
    next();
});

app.use('/movies',moviesRouter);
app.use('/users',userRouter);


app.get('/movies',(req,res)=>{
    console.log('---->app.js:getMovies');
    res.json({msg: 'This is CORS-enabled for all origins!'})
});
//Otros direccionaminetos ...


app.use('*',errorRouter);
app.use(clientErrorHandler);


export default app;