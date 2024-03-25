<?php
include "./connection.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $id = intval($_GET['user_id']);
            $query = $conn->prepare('select * from experiences where user_id =?');
            $query->bind_param('s', $id);
            $query->execute();
            $result = $query->get_result();
            $response = array();

            while ($row = $result->fetch_assoc()) {
                $response[] = array(
                    'user_id' => $row['user_id'],
                    'id' => $row['experience_id'],
                    'company_name' => $row['company_name'],
                    'description' => $row['description'],
                    'start_date' => $row['start_date'],
                    'end_date' => $row['end_date'],
                );
            }
        } else {
            $response['status'] = 400;
            $response['message'] = "Bad request";
        }
        echo json_encode($response);
        break;
    case 'POST':
        $user_id = intval($_POST['user_id']);
        $company_name = $_POST['company_name'];
        $description = $_POST['description'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $query = $conn->prepare('INSERT INTO experiences (user_id, company_name, description, start_date, end_date) VALUES (?,?,?,?,?)');
        $query->bind_param('issss', $user_id, $company_name, $description, $start_date, $end_date);
        if ($query->execute()) {
            $response['status'] = 200;
            $response['message'] = "Experience added successfully";
        } else {
            $response['status'] = 500;
            $response['message'] = "Something went wrong";
        }
        echo json_encode($response);
        break;
}
