<?php
   $file = $_REQUEST['file'];
   $path = $_SERVER['DOCUMENT_ROOT']."app/upload/$file";
   unlink($path)
?>