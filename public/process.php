<?php 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['files'])) {
        $errors = [];
        $path = 'upload/';
		$extensions = ['jpg', 'jpeg', 'png', 'gif', 'pptx', 'ppsx', 'ppt', 'docx', 'doc', 'xlsx', 'xls', 'pdf', 'zip', 'csv', 'mp4', 'mov', 'txt'];
		
        $all_files = count($_FILES['files']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {  
		$file_name = preg_replace('/[^a-zA-Z0-9._]/', '', $_FILES['files']['name'][$i]);//$_FILES['files']['name'][$i];
		$file_tmp = $_FILES['files']['tmp_name'][$i];
		$file_type = $_FILES['files']['type'][$i];
		$file_size = $_FILES['files']['size'][$i];
		$file_ext = strtolower(end(explode('.', $_FILES['files']['name'][$i])));

		$file = $path . $file_name;

		if (!in_array($file_ext, $extensions)) {
			$errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
		}

		if ($file_size > 419430400) {
			$errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
		}

		if (empty($errors)) {
			move_uploaded_file($file_tmp, $file);
		}
	}

	if ($errors) print_r($errors);
    }
}