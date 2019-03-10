<?php 
include('server.php'); 
session_start();

function logout(){
    session_unset(); 
    // destroy the session 
    session_destroy(); 
    header('Location: ./login.html');
    exit();
}
if(isset($_SESSION['ukey'])){
    header('Location: ./index.php');
    exit();
}
else{

if ($con->connect_errno) {

    echo "Failed to connect to MySQL: " . $con->connect_error;
    header('Location: ./login.html');
    exit();

}
$usr = $_POST['username'];
$pass =$_POST['passwd'];
$hashpass= hash('sha256',$_POST['passwd']);

$db_usr = "select ID from iedc_users where (user_login = '".$usr."' or user_email = '".$usr."') and user_pass = '".$pass."'";

$token = $con->query($db_usr);

if ($token->num_rows > 0) {
    // output data of each row
    while($row = $token->fetch_assoc()) {
        session_start();
        $_SESSION['ukey']=$row[0];
        header('Location: ./index.html');
        echo  $_SESSION['ukey']." successfully logged in!";
        exit();
       
    }
}else{
    header('Location: ./login.html');
    exit();
}
exit();
}?>