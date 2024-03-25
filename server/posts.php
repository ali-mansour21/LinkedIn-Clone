<?php
include "./connection.php";
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $id = intval($_GET['user_id']);
            $response = getUserInfo($conn, $id);
            echo json_encode($response);
        } else {
            $response = getAllUserInfo($conn);
            echo json_encode($response);
        }
        break;
    case 'POST':
        $id = intval($_POST['user_id']);
        $description = $_POST['description'];
        $post_image = $_FILES['post_image'];
        $image = '';
        if (isset($_FILES['post_image']) && $_FILES['post_image']['error'] == 0) {
            $target_dir = "../frontend/src/assets/";
            $image = $target_dir . uniqid() . '_' . basename($_FILES["post_image"]["name"]);
            if (move_uploaded_file($_FILES["post_image"]["tmp_name"], $image)) {
                echo "The file " . basename($_FILES["post_image"]["name"]) . " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
                exit();
            }
        }
        $response = createPost($conn, $id, $description, $image);
        echo json_encode($response);
        break;
}
function getUserInfo($conn, $user_id)
{
    $query = $conn->prepare('SELECT 
            users.Username,
            profiles.*,
            posts.*
        FROM 
            users
        JOIN 
            profiles ON users.UserID = profiles.UserID
        JOIN 
            posts ON users.UserID = posts.user_id
        WHERE 
            users.UserID = ?');
    $query->bind_param('i', $user_id);
    $query->execute();

    $response = array();
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
        $response[] = array(
            'user_id' => $row['user_id'],
            'user_name' => $row['Username'],
            'profile_bio' => $row['Bio'],
            'profile_image' => $row['profile_image'],
            'cover_image' => $row['cover_image'],
            'summary' => $row['summary'],
            'post_id' => $row['post_id'],
            'post_description' => $row['description'],
            'post_image' => $row['post_image']
        );
    }

    return $response;
}
function getAllUserInfo($conn)
{
    $query = $conn->prepare('SELECT 

            users.Username,
            profiles.*,
            posts.*
        FROM 
            users
        JOIN 
            profiles ON users.UserID = profiles.UserID
        JOIN 
            posts ON users.UserID = posts.user_id');
    $query->execute();

    $response = array();
    $result = $query->get_result();
    while ($row = $result->fetch_assoc()) {
        $response[] = array(
            'user_id' => $row['user_id'],
            'user_name' => $row['Username'],
            'profile_bio' => $row['Bio'],
            'profile_image' => $row['profile_image'],
            'cover_image' => $row['cover_image'],
            'summary' => $row['summary'],
            'post_id' => $row['post_id'],
            'post_description' => $row['description'],
            'post_image' => $row['post_image']
        );
    }

    return $response;
}
function createPost($conn, $user_id, $description, $image)
{
    $response = [];
    $query = $conn->prepare('INSERT INTO posts (user_id, description, post_image) VALUES (?, ?, ?)');
    $query->bind_param('iss', $user_id, $description, $image);

    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = 200;
        $response['message'] = "Post added successfully";
    } else {
        $response['status'] = 500;
        $response['message'] = "Something went wrong";
    }
    return $response;
}
