<?php
include "./connection.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $id = intval($_GET['user_id']);
        $query = $conn->prepare('SELECT * FROM educations WHERE user_id = ?');
        $query->bind_param('i', $id);
        $query->execute(); // Execute the prepared statement
        $result = $query->get_result();
        $response = array();

        while ($row = $result->fetch_assoc()) {
            $response[] = array(
                'user_id' => $row['user_id'],
                'id' => $row['education_id'],
                'degree' => $row['degree'],
                'institution' => $row['institution'],
                'start_date' => $row['start_date'],
                'end_date' => $row['end_date'],
            );
        }
        echo json_encode($response);
        break;
    case 'POST':
        $id = intval($_POST['user_id']);
        $degree = $_POST['degree'];
        $institution = $_POST['institution'];
        $start_date = $_POST['start_date'];
        $end_date = $_POST['end_date'];
        $query = $conn->prepare('insert into educations (user_id, degree, institution, start_date, end_date) values (?,?,?,?,?)');
        $query->bind_param('sssss', $id, $degree, $institution, $start_date, $end_date);
        if ($query->execute()) {
            $response['status'] = 200;
            $response['message'] = "Education added successfully";
        } else {
            $response['status'] = 500;
            $response['message'] = "Something went wrong";
        }
        echo json_encode($response);
        break;
}
