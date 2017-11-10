<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  include_once("db.func.php");
  $response = getResponse();
  header('Content-Type: application/json');
  echo json_encode($response);

  function getResponse() {
    	    //temp $_GET instead of $_POST
        $request = $_POST;
    	if (isset($request['action'])) {
    	switch ($request['action']) {
    		case 'list': return isset($request['year']) && isset($request['month']) ? albums_list($request['year'], $request['month']) : 
    		['error' => 'No date specified'];
    		case 'add': return isset($request['year']) && isset($request['month']) ? albums_add($request) : 
    		['error' => 'No date specified'];
    		default: return ['error' => 'Unknown action'];
    	}
    	}
    	return ['error' => 'No action specified'];
  }
    
?>
