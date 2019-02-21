const express = require('express')
const app = express()

const exec = require('child_process').exec; 
 
const fs = require('fs')



   




app.post('/back', function (req, res) {


  var code = [];
    
  
  req.on('data', function (data) {
       
       code.push(data);
        
    });
    





fs.writeFile('slice/data/testfile.c', code,  function(err) {});

exec("llvm-slicing slice/data/testfile.c ", function(err,stdout,stderr){


fs.readFile('slice/data/testfile.c.SliceResult_Bwd-Symbolic', function (err, data) {
   if (err) {
       return console.error(err);
   }
 res.send(data.toString());
});


})

})
	

	
 



	
		
		
	
	



app.post('/front', function (req, res) {


  var code = [];
    
  
  req.on('data', function (data) {
       
       code.push(data);
        
    });
    





fs.writeFile('slice/data/testfile.c', code,  function(err) {});

exec("llvm-slicing slice/data/testfile.c -d Fwd -m IFDS ", function(err,stdout,stderr){


fs.readFile('slice/data/testfile.c.SliceResult_Fwd-IFDS', function (err, data) {
   if (err) {
       return console.error(err);
   }
 res.send(data.toString());
});


})

})
	

	
 



	
		
		
	





app.post('/back', function (req, res) {


  var code = [];
    
  
  req.on('data', function (data) {
       
       code.push(data);
        
    });
    





fs.writeFile('slice/data/testfile.c', code,  function(err) {});

exec("llvm-slicing slice/data/testfile.c ", function(err,stdout,stderr){


fs.readFile('slice/data/testfile.c.SliceResult_Bwd-Symbolic', function (err, data) {
   if (err) {
       return console.error(err);
   }
 res.send(data.toString());
});


})

})
	

	
 



	
		
		
	
	



app.post('/image', function (req, res) {


  var code = [];
    
  
  req.on('data', function (data) {
       
       code.push(data);
        
    });
    





fs.writeFile('/usr/local/src/testfile.c', code,  function(err) {});

exec("cd /usr/local/src/ && llvm-slicing testfile.c -g Sdg ", function(err,stdout,stderr){


exec("cp /usr/local/src/testfile_SDG.png   /opt/slice/slice/data/", function(err,stdout,stderr){



 res.end()

})


})

})
	


	




app.use(express.static('slice'))
app.listen(8000, function() {

})
       
      
   
       

    



    









