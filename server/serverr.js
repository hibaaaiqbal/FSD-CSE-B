import http from "http";
import os from "os";
const userdata=[];
const serverr=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url=="/" && method=="GET"){
        res.end("HomePage");
    }
    else if(url=="/contact" && method=="GET"){
        res.end("ContactPage");
    }
    else if(url=="/system" && method=="GET"){
        const sysdata={
            platform:os.platform(),
            Arch:os.arch(),
            CPUlength:os.cpus().length,
            totalMemory:(os.totalmem()/1024**3).toFixed(2)+"GB",
            freeMemory:(os.freemem()/1024**3).toFixed(2)+"GB"
        }
        res.write("System Info");
        res.end(JSON.stringify(sysdata));
    }
    else if(url=="/senddata" && method=="POST"){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            console.log(body,"Data send successfully");
            res.statusCode=201;
            userdata.push(body)
            res.end(JSON.stringify(userdata))
        })
    }
    else if(url=="/viewdata" && method=="GET"){
        res.end(JSON.stringify(userdata));
    }
    else{
        res.statusCode=404;
        res.end("Error page");
    }
})
serverr.listen(5001,()=>{
    console.log(`server is running on port 5001`)
})