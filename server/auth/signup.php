<?php
include "../connection.php";

$user_name = $_POST['user_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$type = $_POST['type'];

$query = $conn->prepare('INSERT INTO users (Username, email, password, Usertype) VALUES (?,?,?,?)');

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$query->bind_param('sssi', $user_name, $email, $hashed_password, $type);

if ($query->execute()) {
    $user_id = $query->insert_id;
    $jwt = generateJWT($user_id, $type, $secretKey, $algorithm);
    $response['status'] = 200;
    $response['message'] = "User added successfully";
    $response['token'] = $jwt;
} else {
    $response['status'] = 500;
    $response['message'] = "Something went wrong";
}

echo json_encode($response);
