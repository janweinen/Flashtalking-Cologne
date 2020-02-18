<?php
   $file = $_REQUEST['file'];
   $path = $_SERVER['DOCUMENT_ROOT']."Studio/Jan/build/upload/$file";
   unlink($path)
?>