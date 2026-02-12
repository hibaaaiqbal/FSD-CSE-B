import http from "http";
import os from "os";
 let body="";
 let data=[];
const server=http.createServer((req,res)=>{
    const url=req.url;
     
    if(url=="/" && req.method=="GET"){
        res.write("Home Page");
    }
    else if(url=="/about" && req.method=="GET"){
        res.write("about Page");
    }
    else if(url=="/contact" && req.method=="GET"){
        res.write("Contact Page");
    }
    else if(url=="/senddata" && req.method=="POST"){
       
        req.on("data",(chunk)=>{
             body=body+chunk;
        })
        req.on("end",()=>{
            console.log(body,"data received");
            data.push(body);
            res.end(body+"data received");
        })
    }
    else if(url=="/viewdata" && req.method=="GET"){
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(data));
       
    }
     else if(url=="/system" && req.method=="GET"){
        const sysdata={
            plaform:os.platform(),
            arch:os.arch(),
            cpu:os.cpus().length,
            totalRam:(os.totalmem()/1024**3).toFixed(2)+"GB",
            freemem:(os.freemem()/1024**3).toFixed(2)+"GB"
        }
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify(sysdata));
       
    }
    else{
        res.statusCode=404;
        res.end("Page not found, error");
    }
    res.end();
})
server.listen(4001, ()=>{
    console.log(`Servrer is running on port 4001`)
});