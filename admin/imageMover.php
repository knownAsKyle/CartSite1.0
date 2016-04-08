<?php
if(isset($_FILES)){
	add($_FILES);
}

function add($d){
	$filePath = explode('/', getcwd());
	array_pop($filePath);
	$filePath = implode('/', $filePath);
	$filePath = $filePath."/images/";
	if ( 0 < $d['file']['error'] ) {
        echo 'Error: ' . $d['file']['error'] . '<br>';
    }else{
	    echo "moving to $filePath ".$d['file']['name'];
	    move_uploaded_file($d['file']['tmp_name'], $filePath . $d['file']['name']);
    }
}
?>