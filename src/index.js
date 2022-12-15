
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Jsonrpc from '@koalex/koa-json-rpc';
import { createReadStream } from 'fs';
import serve from "koa-static"; 
const app     = new Koa();
const router  = new Router();

const jsonrpc = new Jsonrpc({
    bodyParser: bodyParser({
        onerror: (err, ctx) => {
            ctx.status = 200;
            ctx.body = Jsonrpc.parseError;
        }
    })
});

jsonrpc.method('kill_bill', (ctx, next) => {
    ctx.body = 'kill_bill';
});

jsonrpc.method('get_pet_by_id', (ctx, next) => {
    ctx.body = 'get_pet_by_id';
});

jsonrpc.method('someMethod', (ctx, next) => {
    ctx.body = 'Hello world!';
});

jsonrpc.method('delete_pet_by_id', (ctx, next) => {
    console.log('xx')
    ctx.body = 'delete_pet_by_id';
});







router.post('/api', jsonrpc.middleware);

router.get('/docs',(ctx)=>{
    ctx.type='html';
    ctx.body = createReadStream('./docs/index.html')
})

app.use(serve("."));





app.use(router.routes());
/*
    REQUEST -> {id: 987, jsonrpc: '2.0', method: 'someMethod'}
    RESPONSE <- {jsonrpc: '2.0', id: 987, result: 'Hello world!'}
*/

console.log(Object.entries(jsonrpc._handlers).map(v=>[v[0], v[1]]))

app.listen(3000,()=>{
        console.log('server start 3000!!!\n http://localhost:3000/docs');
})

export default app;