<?php
   $file = $_REQUEST['file'];
   $path = $_SERVER['DOCUMENT_ROOT']."library/upload/$file";
   unlink($path)
?>