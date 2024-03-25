<?php
include "./connection.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $user_id = intval($_POST['user_id']);
        $name = $_POST['name'];
        $descritpion = $_POST['descritpion'];
        $query = $conn->prepare('INSERT INTO companies (Name, Description,UserID) VALUES (?,?,?)');
        $query->bind_param('ssi', $name, $descritpion, $user_id);
        if ($query->execute()) {
            $response['status'] = 200;
            $response['message'] = "Company added successfully";
        } else {
            $response['status'] = 500;
            $response['message'] = "Something went wrong";
        }
        echo json_encode($response);
        break;
    case 'GET':
        $user_id = intval($_GET['user_id']);
        $query = $conn->prepare('SELECT * FROM companies WHERE UserID =?');
        $query->bind_param('i', $user_id);
        $query->execute();
        $result = $query->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response['status'] = 200;
                $response['data'] = $row;
            }
        } else {
            $response['status'] = 500;
            $response['message'] = "Something went wrong";
        }
        echo json_encode($response);
        break;
}
