<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

$host = "127.0.0.1";
$user = "root";
$password = "";
$db_name = "linked_db";
$randomBytes = random_bytes(32);

$secretKey = base64_encode($randomBytes);
$algorithm = 'HS256';
$conn = new mysqli($host, $user, $password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
function generateJWT($userId, $userType, $secretKey, $algorithm)
{
    $payload = [
        'user_id' => $userId,
        'user_type' => $userType,
        'exp' => time() + (60 * 60) // Token expiration time (1 hour)
    ];

    // Create the JWT token
    $jwtToken = JWT::encode($payload, $secretKey, $algorithm);

    return $jwtToken;
}
