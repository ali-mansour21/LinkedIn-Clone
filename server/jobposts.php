<?php

include "./connection.php";


switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $id = intval($_POST['user_id']);
        $title = $_POST['title'];
        $description = $_POST['description'];
        $query = $conn->prepare('SELECT CompanyID FROM companies WHERE UserID = ?');
        $query->bind_param('i', $user_id);
        $query->execute();
        $query->bind_result($company_id);
        $query->fetch();

        $insert_query = $conn->prepare('INSERT INTO jobposts (CompanyID, Title, Description) VALUES (?, ?, ?)');
        $insert_query->bind_param('iss', $company_id, $title, $description);
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
                            FROM jobposts ,companies');
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
