<?php
include "../connection.php";

$email = $_POST['email'];
$password = $_POST['password'];

$query = $conn->prepare('select * from users where email =?');

$query->bind_param('s', $email);

$query->execute();

$result = $query->get_result();

$row = $result->fetch_assoc();
if ($result->num_rows > 0) {
    if (password_verify($password, $row['Password'])) {
        $token = generateJWT($row['UserID'], $row['UserType'], $secretKey, $algorithm);
        $response['status'] = 200;
        $response['token'] = $token;
        $response['message'] = "Login successful";
    } else {
        $response['status'] = 500;
        $response['message'] = "Incorrect Password";
    }
} else {
    $response['status'] = 500;
    $response['message'] = "Incorrect Email";
}
echo json_encode($response);
