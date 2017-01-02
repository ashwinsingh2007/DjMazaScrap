//var song="http://www.djmaza.com/tum%20hi%20ho.html";
var song="http://www.djmaza.com/tumi.html";
var str="tum hi ho";

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
  console.log(counts);
}


