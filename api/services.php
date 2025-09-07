<?php
require_once '../config/database.php';

try {
    $db = new Database();
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'GET') {
        // Get all active services (public endpoint)
        $services = $db->fetchAll("SELECT * FROM services WHERE status = 'active' ORDER BY name");
        sendResponse(true, 'Services retrieved successfully', $services);
        
    } else {
        sendResponse(false, 'Method not allowed', null, 405);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage(), null, 500);
}
?>