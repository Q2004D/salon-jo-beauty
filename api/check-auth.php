<?php
require_once '../config/database.php';

try {
    // Check if user is logged in
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
        $userData = [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email'],
            'role' => $_SESSION['user_role'],
            'session_id' => session_id()
        ];
        
        sendResponse(true, 'User is authenticated', $userData);
    } else {
        sendResponse(false, 'User not authenticated', null, 401);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage(), null, 500);
}
?>