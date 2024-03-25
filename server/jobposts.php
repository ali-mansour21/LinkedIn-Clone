<?php

include "./connection.php";


switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $id = intval($_POST['user_id']);
        $title = $_POST['title'];
        $description = $_POST['description'];
        $query = $conn->prepare('SELECT company_id FROM users WHERE user_id = ?');
        $query->bind_param('i', $user_id);
        $query->execute();
        $query->bind_result($company_id);
        $query->fetch();

        $insert_query = $conn->prepare('INSERT INTO jobposts (company_id, job_title, job_description) VALUES (?, ?, ?)');
        $insert_query->bind_param('iss', $company_id, $job_title, $job_description);
        if ($insert_query->execute()) {
            $response['status'] = 200;
            $response['message'] = "Job post added successfully";
        } else {
            $response['status'] = 400;
            $response['message'] = "Job post not added";
        }
        echo json_encode($response);
        break;
    case 'GET':
        $query = $conn->prepare('SELECT jobposts.JobPostID, jobposts.CompanyID, jobposts.Title, jobposts.Description,jobposts.PostedAt, companies.Name 
                            FROM jobposts 
                            INNER JOIN companies ON jobposts.CompanyID = companies.CompanyID');
        $query->execute();
        $query->bind_result($job_id, $company_id, $job_title, $job_description, $job_date, $company_name);

        $response = array();
        while ($query->fetch()) {
            $response[] = array(
                'job_id' => $job_id,
                'company_id' => $company_id,
                'company_name' => $company_name,
                'job_title' => $job_title,
                'job_description' => $job_description,
                'job_date' => $job_date
            );
        }
        echo json_encode($response);
        break;
}
