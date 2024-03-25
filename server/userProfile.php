<?php
include "./connection.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $user_id = intval($_GET['user_id']);

            $query = $conn->prepare('SELECT users.*, profiles.*
          FROM users
          LEFT JOIN profiles ON users.UserID = profiles.UserID
          WHERE users.UserID = ?');

            $query->bind_param('i', $user_id);
            $query->execute();

            $result = $query->get_result();

            if ($result) {

                $response = array();
                while ($row = $result->fetch_assoc()) {
                    $response[] = $row;
                }
            }
        } else {
            $response['status'] = 400;
            $response['message'] = "Bad Request";
        }
        echo json_encode($response);
        break;
    case 'POST':
        $user_id = intval($_POST['user_id']);
        $bio = $_POST['Bio'];
        $profile_image = $_POST['profile_image'];
        $cover_image = $_POST['cover_image'];
        $summary = $_POST['summary'];
        $query = $conn->prepare('INSERT INTO profiles (UserID,Bio,profile_image,cover_image,summary) VALUES(?,?,?,?,?) ');
        $query->bind_param('issss', $user_id, $bio, $profile_image, $cover_image, $summary);
        if ($query->execute()) {
            $response['status'] = 200;
            $response['message'] = "User added successfully";
        } else {
            $response['status'] = 400;
            $response['message'] = "Bad Request";
        }
        echo json_encode($response);
        break;
}
