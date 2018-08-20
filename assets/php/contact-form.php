<?php
session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));
header('Content-type: application/json');


if($_POST) {

	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject= 'Заполнили контактную форму';
	
	$fields = array(
		0 => array(
			'text' => 'Имя',
			'val' => $_POST['name']
		),
		1 => array(
			'text' => 'Email',
			'val' => $_POST['email']
		),
		2 => array(
			'text' => 'Телефон',
			'val' => $_POST['phone']
		),
		3 => array(
			'text' => 'Сообщение',
			'val' => $_POST['message']
		),
		4 => array(
			'text' => 'Дата',
			'val' => date('Y-m-d H:i'),
		)
	);
	
	$message = '';
	
	foreach($fields as $field) {
		$message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
	}

	
	include 'TEmail.php'; 

	$emails[]='evgeny.sokolenko@gmail.com';
	$email1 = new TEmail; // инициализируем супер класс отправки
	foreach ($emails as $email) { 
		
		$email1->from_email = 'info@ssn-design.com.ua'; // от кого
		$email1->from_name = 'SSN Site';
		$email1->to_email = $email; // кому 
		$email1->to_name = ''; 
		$email1->subject = $subject; // тема 
		$email1->body('text/html', '' . $message . ''); // сообщение 
		$email1->send(); 
	}

	$arrResult = array ('status' => true);

	echo json_encode($arrResult);
	
} else {

	$arrResult = array ('response'=>'error');
	echo json_encode($arrResult);

}
?>