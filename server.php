<?php

session_start();

// initializing variables

$username = "ggooiugo_iedc";

$pass= "Smart@iedc";

$errors = array();
$db ='iedc';
// connect to the database

$con = mysqli_connect('localhost', 'root', '', $db);

?>