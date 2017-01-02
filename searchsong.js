var http=require('http');
var request=require('request');
var cheerio=require('cheerio');
var path=require('path');
var fs=require('fs');
var progress=require('progress');
var prompt=require('prompt');
var ProgressBar = require('progress');
var chk=0;
function check(song,str)
{
	//console.log(song);
	//console.log(str);
						var count=0;
						var counts=0;
						var mxcount=0;
						for(var i=0;i<str.length;i++)
						{
						  
						  if(str[i]===" ")
						  {
						    break;
						  }
						  counts++;
						}

						for(var i=0;i<song.length;i++)
						{
						  count=0;
						  if(song[i]===str[0])
						  {
						    var k=i;
						    for(var j=0;j<counts;j++)
						    {
						      if(str[j]===" ")
						      {
						        break;
						      }
						      if(song[k]===str[j])
						      {
						        k++;
						        count++;
						        
						        if(mxcount<count)
						        {
						          mxcount=count;
						          
						        }
						      }
						      else
						      {
						        
						        break;
						      }
						    }
						  }

						}


						if(mxcount===counts)
						{
						  //console.log(counts);
						  chk=1;
						}

}


//https://www.youtube.com/results?search_query=ashwin
console.log("Enter Song or any keyword to search .....");
var url="http://djmaza.info/";
request(url,function(error,res,body)
{
	var key;
	var indi=0;
	var songd=["start"];
	prompt.start();
	prompt.get(['keyword'],function (err,result)
	{
		key=result.keyword;
		var songlink=["start"];
		var song=['start'];
		var $=cheerio.load(body);
		$('#fasy4').each(function (i,ele) 
		{
			var id=$(ele).children();
			songlink.push(id.attr('href'));	
		})
		
		var songs=['start'];
		var songsname=['start'];
		var k=1;
		for(var i=1;i<songlink.length;i++)
		{
			//console.log(songlink[i]);
			
			if(path.extname(songlink[i])==='.html')
			{
				//console.log(songlink[i]);
				var url="http://www.djmaza.info/"+songlink[i];
				request(url,function(error,res,body)
				{
					
					var $=cheerio.load(body);
					$('a').each(function(i,ele)
					{
						var id=$(ele).attr('href');
						var temp=$(ele).children();
						song=temp.text();
						if(path.extname(id)==='.mp3')
						{
							
								check(id.toLowerCase(),key);
								if(chk==1)
								{
									//console.log("  ->  "+song+"\n");
									chk=0;
									songs.push(id);
									songsname.push(song);
									
									console.log("\n"+k+" -> "+songsname[k])
									k++;
								}
							
						}
						

					})
				})
			}
			
			
		}



		prompt.get(['Please Wait while songs are shown Then Press Enter....'],function (error,result)
		{
			//console.log("dd\n")
		
			//console.log("Enter Index number corresponding to the song to download-");
			prompt.get(['index'], function (err, result) 
			{
				var path;
				console.log("Enter Name to save by-");
				prompt.get(['songname'],function(err,res)

				{
					path="H:/nodejs/programs/webscrapping/scrap/Downloads/"+res.songname+'.mp3';
			    	//console.log(path);
			    	//console.log(songList[result.index]);
			    	console.log("File is being downloaded please wait :)")
			    	fs.open(path, 'w', function(err, fd)
					{
							    
						var bar;    
						//console.log(songList[result.index]);	
						request.get(songs[result.index])
						.on('response', function(res)
						{
							
						  	var len = parseInt(res.headers['content-length'], 10);

						  	console.log("\n");
						  	bar = new ProgressBar('Downloading [:bar] :percent :etas',
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