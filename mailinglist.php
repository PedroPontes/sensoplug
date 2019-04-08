<?php
if(isset( $_POST['email'])) {
$email = $_POST['email'];
$email .= "; ";


$fp = fopen('mailinglist.txt', 'a');
fwrite($fp, $email);
fclose($fp);

echo "Subscribed successfully!";
}
?>