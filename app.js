const http = require('http');
const fs = require('fs');// fs = file system

const fileText = fs.readFileSync('./www/file.txt');

console.log("Hola mundo");

http.createServer((request, response) => {
    console.log(request.url);

    let file = request.url;

    if(file == '/'){
        response.writeHead(200, {"Content-Type":"text/plain"});
        response.write("Hola mundo");
        response.end();
    } else{
        const fileText = fs.readFileSync('./www/file.txt');
        
        file = `./www${request.url}`;
        
        fs.readFile(file, (error, data) => {
            if(error){
                response.writeHead(404, {"Content-Type":"text/plain"});
                response.write("Not found:(");
                response.end();
            } else{
                const extension = file.split('.').pop();

                switch (extension) {
                    case 'txt':
                        response.writeHead(200, {"Content-Type":"text/plain"});
                        break;
                    case 'html':
                        response.writeHead(200, {"Content-Type":"text/html"});
                        break;
                    case 'jpeg':
                        response.writeHead(200, {"Content-Type":"image/jpeg"});
                        break;
                    case 'css':
                        response.writeHead(200, {"Content-Type":"text/css"});
                        break;
                    case 'js':
                        response.writeHead(200, {"Content-Type":"text/javascript"});
                        break;
                    default:
                        response.writeHead(200, {"Content-Type":"text/plain"});
                        break;
                }

                response.write(fileText);
                response.write(data);
                response.end();
            }
        });
    }

}).listen(4444);