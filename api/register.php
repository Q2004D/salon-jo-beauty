
<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../config/database.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}
try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $requiredFields = ['name', 'email', 'password'];
    $missingFields = validateRequiredFields($input, $requiredFields);
    
    if (!empty($missingFields)) {
        sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
    }
    
    // Sanitize input
    $name = sanitizeInput($input['name']);
    $email = sanitizeInput($input['email']);
    $password = $input['password'];
    $phone = isset($input['phone']) ? sanitizeInput($input['phone']) : null;
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, 'Invalid email format', null, 400);
    }
    
    // Validate password strength
    if (strlen($password) < 6) {
        sendResponse(false, 'Password must be at least 6 characters long', null, 400);
    }
    
    // Initialize database
    $db = new Database();
    
    // Check if email already exists
    $existingUser = $db->fetch("SELECT id FROM users WHERE email = ?", [$email]);
    if ($existingUser) {
        sendResponse(false, 'Email already registered', null, 409);
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    $result = $db->execute($sql, [$name, $email, $hashedPassword, $phone]);
    
    if ($result) {
        $userId = $db->lastInsertId();
        
        // Get user data (without password)
        $user = $db->fetch("SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?", [$userId]);
        
        sendResponse(true, 'User registered successfully', $user, 201);
    } else {
        sendResponse(false, 'Failed to register user', null, 500);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage(), null, 500);
}
?>