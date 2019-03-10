<?php

if(isset($_GET['total'])){
	$usr_id = $_GET['total']; 
    include('server.php');
    if ($con->connect_errno) {
    
        echo "Failed to connect to MySQL: " . $con->connect_error;
    
    }    
    $data_q = "select sensor1, sensor2,stamp from mq135 ";

    if(isset($_GET['order'])){
        switch($_GET['order']){
            case 'latest':
                $data_q = "select sensor1, sensor2,stamp from mq135 order by stamp DESC";
           

        }
    }
    $token = $con->query($data_q);
    
    if ($token->num_rows > 0) {
        // output data of each row
         /* output in necessary format */
         header('Content-type: text/xml');
         echo '<payload>';
        $id =0;
        while($row = $token->fetch_assoc()) {
            $data1 = $row['sensor1'];
            $data2 = $row['sensor2'];
            $stamp = $row['stamp'];
            $id = $id+1;
            if($id >$usr_id )
                break;
            if($data1!=null){
                echo '<data>';
                echo '<id>';echo $id ;echo '</id>';
                echo '<sensor1>';echo $data1;echo '</sensor1>';
                echo '<sensor2>';echo $data2;echo '</sensor2>';
                echo '<timestamp>';echo $stamp;echo '</timestamp>';
                
                echo '</data>';
                }else{
                    header('Content-type: text/xml');
                        echo '<data>';
                        echo "No data Found";
                        echo '</data>';
                
                }


        }
        echo '</payload>';

    }
    

	

	/* disconnect from the db */
	//mysqli_close($link);
}else{
    header('Content-type: text/xml');
        echo '<error>';
        echo "total parameter not set";
		echo '</error>';

}

?>