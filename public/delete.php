<?php
   $file = $_REQUEST['file'];
   $path = $_SERVER['DOCUMENT_ROOT']."ftcologne/upload/$file";
   unlink($path)
?>