function mSearchArchive(){
    var order = 'latest';
    var total = 30;

    var canvas = document.getElementById('display_fetched_data');
    var payload = '';
	$.ajax({ url: "http://localhost:8080/iedc/fetchdata.php?total="+total+"&order="+order+"",
            type:"GET",
            cache: false,
            dataType: "xml",
            success: function(xml) {
                $(xml).find('data').each(function(){
                    var sensor1 = "";
                    var sensor2 = "";

                    payload+="<tr>";
                    $(this).find("id").each(function(){
                        var id = $(this).text();
                        payload+="<td>"+id+"</td> <td>Rajendra Nagar</td>";
                    });

                    $(this).find("sensor1").each(function(){
                         sensor1 = $(this).text();
                        payload+="<td>"+sensor1+"</td>";
                    });
                    $(this).find("sensor2").each(function(){
                         sensor2 = $(this).text();
                        payload+="<td>"+sensor2+"</td>";
                    });
                    $(this).find("timestamp").each(function(){
                        var timestamp = $(this).text();
                        payload+="<td>"+timestamp+"</td>";
                    });
                    if(parseInt(sensor1) > 1000 && parseInt(sensor2)>1000)
                    {
                        payload+="<td>Poor</td>";

                    }
                    else if((parseInt(sensor1) > 600 && parseInt(sensor2)>600)&&(parseInt(sensor1) < 1000 && parseInt(sensor2)<1000) )
                    {
                        payload+="<td>Average</td>";
                    }else{
                        payload+="<td>Normal</td>";
                    }
                    
                    payload+="</tr>";

                });
                canvas.innerHTML+=payload;
            }
		
			})
}
		

window.setInterval(mSearchArchive(),1000);        