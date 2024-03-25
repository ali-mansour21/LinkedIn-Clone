<?php
include "./connection.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $user_id = intval($_POST['user_id']);
        $skill_id = intval($_POST['skill_id']);

        $query = $conn->prepare('INSERT INTO userskill (user_id, skill_id) VALUES (?,?)');

        $query->bind_param('ii', $user_id, $skill_id);
        if ($query->execute()) {
            $response['status'] = 200;
            $response['message'] = "User Skill added successfully";
        } else {
            $response['status'] = 400;
            $response['message'] = "User Skill not added";
        }
        echo json_encode($response);
        break;
    case 'GET':
        $user_id = intval($_GET['user_id']);
        $query = $conn->prepare('SELECT skill.name
                         FROM userskill
                         JOIN skill ON userskill.skill_id = skill.skill_id
                         WHERE userskill.user_id = ?');
        $query->bind_param('i', $user_id);
        $query->execute();

        $query->bind_result($skill_name);

        $response = array();
        while ($query->fetch()) {
            $response[] = $skill_name;
        }
        echo json_encode($response);
        break;
}
