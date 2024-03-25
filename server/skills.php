<?php
include './connection.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $skill_name = $_POST['name'];

        $query = $conn->prepare('INSERT INTO skill (name) VALUES (?)');

        $query->bind_param('s', $skill_name);

        if ($query->execute()) {
            $skill_id = $query->insert_id;
            $response['status'] = 200;
            $response['message'] = "Skill added successfully";
        } else {
            $response['status'] = 400;
            $response['message'] = "Something went wrong";
        }
        echo json_encode($response);
        break;
    case 'GET':
        $query = $conn->prepare('select * from skill');
        $query->execute();
        $result = $query->get_result();
        $response = array();
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        echo json_encode($response);
        break;
}
