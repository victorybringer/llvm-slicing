



var app = angular.module('app', []);





window.oncontextmenu=function(e){
	//取消默认的浏览器自带右键 很重要！！
	e.preventDefault();

	//获取我们自定义的右键菜单
	var menu=document.querySelector("#menu");

	//根据事件对象中鼠标点击的位置，进行定位
	menu.style.left=e.clientX+'px';
	menu.style.top=e.clientY+'px';

	//改变自定义菜单的宽，让它显示出来
	menu.style.width='125px';
	}
	//关闭右键菜单，很简单
	window.onclick=function(e){

	//用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
	　　　　document.querySelector('#menu').style.width=0;
	}

if(window.name!="hasLoad"){    

    location.reload();    
    window.name = "hasLoad";    
}else{    
    window.name="";    
} 
	
	
	
	

var editor = ace.edit("editor");
var Range = ace.require('ace/range').Range;
var markers=[]
editor.session.setMode("ace/mode/c_cpp");

editor.on('focus', function() {

 	for(var a=0;a<markers.length;++a){
		
		editor.session.removeMarker(markers[a])
	}
	});
    

app.controller('myCtrl', function($http,$scope,$compile) {

    $scope.text=[];
    $scope.input="";
    $scope.show = false;
    $scope.result=[];
    $scope.number=[];
    $scope.right=[];
   
    $scope.searchresult = [];
    $scope.showhighlight = false;
      
    	
    	   
    

$scope.change=function(){
	var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(document.getElementById("file").files[0]);//读取文件的内容


 	for(var a=0;a<markers.length;++a){
		
		editor.session.removeMarker(markers[a])
	}

    
    reader.onload = function(){
    	


	    $scope.input="";
	    $scope.number=[];
	    $scope.result=[];
	    $scope.currentname="";
		
	    $scope.searchresult = [];
	    $scope.showhighlight = false;


   editor.setValue(this.result.trim(), -1)


 $scope.$apply()

};


    	
    	
  
     
    };
  


	 
    $scope.cursor =function(e){
    	
    	
    	editor.gotoLine(e)
    	
    	
    	for(var a=0;a<markers.length;++a){
    		
    		editor.session.removeMarker(markers[a])
    	}
    	markers=[]
    	 markers[0]=editor.session.addMarker(new Range(e-1, 0, e-1, 1), "myMarker", "fullLine");
    	
  
    };  

$scope.slice =function(){


	$scope.show=!$scope.show
	

};

$scope.highlight = function(index){
	console.log(index)
	var str= $scope.searchresult[index]
	
	var name=$scope.searchresult[index].indexOf("@")
	$scope.currentname=$scope.searchresult[index].substring(0,name)
	
	
	
	
	
	var regex = /\[(.+?)\]/g;
	
	var a=str.match(regex)+""
	a=a.replace("[",'');
	
	
	var b=a.replace("]",'');
	
	 $scope.showhighlight = true;
	 $scope.number=b.split(",")
  	for(var a=0;a<markers.length;++a){
    		
    		editor.session.removeMarker(markers[a])
    	}
    	markers=[]
  for(var a=0;a< $scope.number.length;++a){
	  
	  markers[a]=editor.session.addMarker(new Range($scope.number[a]-1, 0, $scope.number[a]-1, 1), "myMarker", "fullLine");
  }
	editor.gotoLine($scope.number[0])
	
	 
	};

	$scope.search = function(){
		
		var a=[];
		
	for(var n=0;n<$scope.result.length;++n){
		
		if($scope.result[n].substring(0,1)==$scope.input){
			a.push($scope.result[n])
		}
		
	}
	
	$scope.searchresult=a
		if($scope.input==""){
			$scope.searchresult=$scope.result
			
		}
	

		};
$scope.file = function(){



	document.getElementById("file").click();
	
};
	
	$scope.net= function(){
		
		editor.gotoLine(1)
		for(var a=0;a<markers.length;++a){
			
			editor.session.removeMarker(markers[a])
		}
    	document.getElementById("load").style="display:inline-block"
		   $scope.result=[];
		    $scope.currentname="";
		    $scope.number=[];
		    $scope.right=[];

		    $http({  

			    method:'post',  

			   url:'back',  

			    data:editor.getValue()  ,
			  

			}).success(function(req){  

			 	document.getElementById("load").style="display:none"
		        	var origin=req.trim().split("\n")
		        	for(var n=0;n<origin.length;++n){
		        		if(origin[n].length>0)
		        		$scope.result.push(origin[n])
		        		
		        	}
		        	
		        $scope.searchresult=$scope.result
		     console.log(  $scope.searchresult)
			    $scope.showhighlight = false;
		    
		        	 $scope.showresult=true
		        	 
		       
		        	 for(var a=0;a< $scope.searchresult.length;++a){
		        		 var name=$scope.searchresult[a].indexOf("@")
		        		
		        		 if(name!=-1){
		        			 
		        			 
		        			 $scope.right.push($scope.searchresult[a].substring(0,name));
			        
			      
			        	
			        	
			        	 }
		        		 
		        	 }
		        	 var element=document.getElementById("menu");
		        	 element.style.height=$scope.right.length*25+"px"
		        	 

			})  
			
		
		
	};
	

$scope.net2= function(){
	editor.gotoLine(1)
	for(var a=0;a<markers.length;++a){
		
		editor.session.removeMarker(markers[a])
	}
 	document.getElementById("load").style="display:inline-block"
    $scope.result=[];
    $scope.currentname="";
    $scope.number=[];
    $scope.right=[];
    $http({  

	    method:'post',  

	   url:'front',  

	    data:editor.getValue()  ,
	    headers:{'Content-Type': 'plain/text'},

	}).success(function(req){  

	 	document.getElementById("load").style="display:none"
        	var origin=req.trim().split("\n")
        	for(var n=0;n<origin.length;++n){
        		if(origin[n].length>0)
        		$scope.result.push(origin[n])
        		
        	}
        	
        $scope.searchresult=$scope.result
     
	    $scope.showhighlight = false;
    
        	 $scope.showresult=true
        
       
        	 for(var a=0;a< $scope.searchresult.length;++a){
        		 var name=$scope.searchresult[a].indexOf("@")
        		 	
        		 if(name!=-1){
        		
        			 
        			 $scope.right.push($scope.searchresult[a].substring(0,name));
	        
	      
	        	
	        	
	        	 }
        		 
        	 }
        	 var element=document.getElementById("menu");
        	 element.style.height=$scope.right.length*25+"px"
        	 
        	 
        	 
        	 
        	 
        
	})  
	
	
	}

$scope.net3= function(){

	document.getElementById("load").style="display:inline-block"


	    $http({  

		    method:'post',  

		   url:'image',  

		    data:editor.getValue()  ,
		    headers:{'Content-Type': 'plain/text'},

		}).success(function(req){  

		 	document.getElementById("load").style="display:none"
	      
         
		        	window.location.href='index2.html';

		})  
		
		     
		        	
		
	
	}
});


  










