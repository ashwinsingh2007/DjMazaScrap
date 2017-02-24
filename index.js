var http=require('http');
var express=require('express');
var request=require('request');
var path=require('path');
var fs=require('fs');
var cheerio=require('cheerio');
var app=express();
var url0="http://djmaza.info/";
var prompt = require('prompt');
var child=require('child_process');
var ProgressBar = require('progress');

request(url0,function(error,res,body)
{
	var $=cheerio.load(body);
	var nameSong=["Please Select the number corresponding to song to download that song"];
	$('#fasy4').each(function(i,ele)
		{
			var id=$(ele).children();
			nameSong.push(id.attr('href'));
		});

	for(var i=0;i<nameSong.length;i++)
	{
		console.log(" -> "+i+" for "+nameSong[i]+"\n");
	}
	 
 		
   	prompt.start();
	prompt.get(['index'], function (err, result) 
	{
	    
		indi=result.index;

		console.log("\n"+"-----------------------Next Process--------------------------"+"\n");
		var url=url0+nameSong[indi];
		var songList=["Enter the number corresponding to the song to be download : "];
		var song=["start"];
		request(url,function(error,res,body)
		{
			var $=cheerio.load(body);
			
			$('a').each(function(i,link)
			{
				songList.push($(link).attr('href'));
				var temp=$(link).children();
				song.push(temp.text());
				var extName=path.extname(songList[i]);
				if(extName===".mp3")
				{
					//console.log(i+"  -  "+songList[i]+"\n\n");
					console.log(i+"  -  "+song[i]);
				}
				
			});
		
			prompt.start();
			prompt.get(['index'], function (err, result) 
			{
				var path;

				prompt.get(['songname'],function(err,res)

				{
					path="Downloads/"+res.songname+'.mp3';
			    	//console.log(path);
			    	//console.log(songList[result.index]);
			    	console.log("File is being downloaded please wait ....")
			    	fs.open(path, 'w', function(err, fd)
					{
							    
						var bar;    
						//console.log(songList[result.index]);	
						request.get(songList[result.index])
						.on('response', function(res)
						{
							
						  	var len = parseInt(res.headers['content-length'], 10);

						  	console.log();
						  	bar = new ProgressBar('  downloading [:bar] :percent :etas',
						   	{	
							    complete: '=',
							    incomplete: ' ',
							    width: 30,
							    total: len
							})
						  })
						.on('data',function(data)
						{
							bar.tick(data.length);
						})
						.on('end',function()
						{
							console.log("Download completed :)");
						})
		  		    	.on('error', function(error) 
		  		    	{
		   		   			console.log("Error occured could not download:(");
		  				}).pipe(fs.createWriteStream(path));
		  				
					

					});
			    	
			    			
				});
				
	    
	    		
	  		});
	
		
		});

	});
	
});

