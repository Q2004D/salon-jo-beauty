<?php
require_once '../config/database.php';

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    sendResponse(false, 'Authentication required', null, 401);
}

try {
    $db = new Database();
    $userId = $_SESSION['user_id'];
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get user profile
        $user = $db->fetch(
            "SELECT id, name, email, phone, role, created_at, updated_at FROM users WHERE id = ?", 
            [$userId]
        );
        
        if (!$user) {
            sendResponse(false, 'User not found', null, 404);
        }
        
        sendResponse(true, 'Profile retrieved successfully', $user);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Update user profile
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields for update
        $requiredFields = ['name', 'email'];
        $missingFields = validateRequiredFields($input, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
        }
        
        $name = sanitizeInput($input['name']);
        $email = sanitizeInput($input['email']);
        $phone = isset($input['phone']) ? sanitizeInput($input['phone']) : null;
        
        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendResponse(false, 'Invalid email format', null, 400);
        }
        
        // Check if email already exists for another user
        $existingUser = $db->fetch(
            "SELECT id FROM users WHERE email = ? AND id != ?", 
            [$email, $userId]
        );
        
        if ($existingUser) {
            sendResponse(false, 'Email already exists for another user', null, 409);
        }
        
        // Update user profile
        $sql = "UPDATE users SET name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        $result = $db->execute($sql, [$name, $email, $phone, $userId]);
        
        if ($result) {
            // Update session data
            $_SESSION['user_name'] = $name;
            $_SESSION['user_email'] = $email;
            
            // Get updated user data
            $updatedUser = $db->fetch(
                "SELECT id, name, email, phone, role, created_at, updated_at FROM users WHERE id = ?", 
                [$userId]
            );
            
            sendResponse(true, 'Profile updated successfully', $updatedUser);
        } else {
            sendResponse(false, 'No changes made or update failed', null, 400);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'change-password') {
        // Change password
        $input = json_decode(file_get_contents('php://input'), true);
        
        $requiredFields = ['current_password', 'new_password'];
        $missingFields = validateRequiredFields($input, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
        }
        
        $currentPassword = $input['current_password'];
        $newPassword = $input['new_password'];
        
        // Validate new password strength
        if (strlen($newPassword) < 6) {
            sendResponse(false, 'New password must be at least 6 characters long', null, 400);
        }
        
        // Get current password from database
        $user = $db->fetch("SELECT password FROM users WHERE id = ?", [$userId]);
        
        if (!password_verify($currentPassword, $user['password'])) {
            sendResponse(false, 'Current password is incorrect', null, 401);
        }
        
        // Hash new password and update
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $result = $db->execute(
            "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", 
            [$hashedNewPassword, $userId]
        );
        
        if ($result) {
            sendResponse(true, 'Password changed successfully');
        } else {
            sendResponse(false, 'Failed to change password', null, 500);
        }
        
    } else {
        sendResponse(false, 'Method not allowed', null, 405);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage(), null, 500);
}
?>