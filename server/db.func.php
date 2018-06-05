<?php
    include_once("config.php");
    
    function albums_list($year, $month) {
    	if ($year!="0" && !preg_match('/^[0-9]{4}$/', $year)) return ['error' => 'Wrong playlist year format'];
    	if (!preg_match('/^[0-9]{2}$/', $month)) return ['error' => 'Wrong playlist month format'];

        global $host, $user, $pass, $dbname;
        
        $year = intval($year);
        $month = intval($month);
        
        $link = mysql_connect($host, $user, $pass);
        if (!$link) return ["error" => "Could not connect : " . mysql_error()];
        
        $sel_db = mysql_select_db($dbname);
        if (!$sel_db) {
        	mysql_close($link);
        	return ["error" => "Could not select database"];
        }
		
		$conditions = [];

		if ($year) $conditions[] = "year = $year";
		if ($month) $conditions[] = "month = $month";

		$conditions_str = count($conditions) > 0 ? " WHERE ".implode(" AND ", $conditions) : "";
		
		$query = "SELECT id, artist, title, year, month, itunes_link, cover, copyright FROM albums$conditions_str ORDER BY year DESC, month ASC, artist ASC";
		
		$result = mysql_query($query);
		
		if (!$result) { 
			$mysql_err = mysql_error();
			mysql_close($link);
			return ["error" => "Select query failed " . $mysql_err];
		}
		
		$res = ["ok" => true, "albums" => [], "query" => $query];
		
		while ($line = mysql_fetch_assoc($result))
			array_push($res["albums"], $line);
		mysql_close($link);	
		return $res;
    }
   
    function albums_add($data) { 
		$fields = ['artist', 'title', 'year', 'month', 'itunes_link', 'copyright'];
		
		foreach ($fields as $field)
			if (!isset($data[$field])) return ['error' => 'No field "'.$field.'" specified'];
		
		if (!preg_match('/^[0-9]{4}$/', $data['year'])) return ['error' => 'Wrong playlist year format'];
    	if (!preg_match('/^[0-9]{2}$/', $data['month'])) return ['error' => 'Wrong playlist month format'];
    	if ($data['artist']=='') return ['error' => 'No artist specified'];
    	if ($data['title']=='') return ['error' => 'No title specified'];
		
		$year = $data['year'];
		$month = $data['month'];
		$data['year'] = intval($data['year']);
        $data['month'] = intval($data['month']);
        
        if (isset($_FILES['cover'])) {
			if (!is_dir("../img")) mkdir("../img");
			$fileBaseName = $data['year'].'_'.$data['month'].'_'.time();
			$filePath = '../img/'.$fileBaseName;
			move_uploaded_file($_FILES['cover']['tmp_name'], $filePath);
			$fields[] = 'cover';
			$data['cover'] = $fileBaseName;
		}
        
        global $host, $user, $pass, $dbname;
        
        $link = mysql_connect($host, $user, $pass);
        if (!$link) return ["error" => "Could not connect : " . mysql_error()];
        
        $sel_db = mysql_select_db($dbname);
        if (!$sel_db) {
        	mysql_close($link);
        	return ["error" => "Could not select database"];
        }
        
        $values = [];
        foreach ($fields as $field)
			$values[] = htmlspecialchars($data[$field], ENT_QUOTES);
        
        $query = "INSERT INTO albums (".join(', ', $fields).") VALUES ('".join("', '", $values)."')";

        $result = mysql_query($query);
		if (!$result)
		{
			$mysql_err = mysql_error();
			mysql_close($link);	
			return ["error" => "Insert query failed $query_insert_playlist: ".$mysql_err];
		}
		
		mysql_close($link);	
		return ["ok" => true, "year" => $year, "month" => $month];
		
	}
	
	function albums_delete($id , $pass) {
		
		global $delete_pass;
		if ($delete_pass!==$pass) return ['error' => 'Wrong password'];
		
		$id = intval($id);
		if ($id <= 0) return ["error" => "Wrong album id specified"];
		
		global $host, $user, $pass, $dbname;
                
        $link = mysql_connect($host, $user, $pass);
        if (!$link) return ["error" => "Could not connect : " . mysql_error()];
        
        $sel_db = mysql_select_db($dbname);
        if (!$sel_db) {
        	mysql_close($link);
        	return ["error" => "Could not select database"];
        }
        
        $query = "DELETE FROM albums WHERE id = $id";
        
        $result = mysql_query($query);
		if (!$result)
		{	
			$mysql_err = mysql_error();
			mysql_close($link);
			return ["error" => "Delete album failed: ".$mysql_err];
		}
	
		mysql_close($link);		
		return ['ok' => true];
		
	}
    
?>
