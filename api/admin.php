<?php
require_once '../config/database.php';

// Check if user is logged in and is admin
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in'] || $_SESSION['user_role'] !== 'admin') {
    sendResponse(false, 'Admin access required', null, 403);
}

try {
    $db = new Database();
    $method = $_SERVER['REQUEST_METHOD'];
    
    // Get action parameter
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    
    switch ($action) {
        case 'users':
            if ($method === 'GET') {
                // Get all users
                $users = $db->fetchAll("SELECT id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC");
                sendResponse(true, 'Users retrieved successfully', $users);
            }
            break;
            
        case 'user-details':
            if ($method === 'GET' && isset($_GET['id'])) {
                $userId = (int)$_GET['id'];
                $user = $db->fetch("SELECT id, name, email, phone, role, created_at, updated_at FROM users WHERE id = ?", [$userId]);
                
                if (!$user) {
                    sendResponse(false, 'User not found', null, 404);
                }
                
                // Get user's appointments
                $appointments = $db->fetchAll(
                    "SELECT a.*, s.name as service_name, s.price 
                     FROM appointments a 
                     JOIN services s ON a.service_id = s.id 
                     WHERE a.user_id = ? 
                     ORDER BY a.appointment_date DESC, a.appointment_time DESC",
                    [$userId]
                );
                
                $user['appointments'] = $appointments;
                sendResponse(true, 'User details retrieved successfully', $user);
            }
            break;
            
        case 'services':
            if ($method === 'GET') {
                // Get all services
                $services = $db->fetchAll("SELECT * FROM services ORDER BY name");
                sendResponse(true, 'Services retrieved successfully', $services);
                
            } elseif ($method === 'POST') {
                // Add new service
                $input = json_decode(file_get_contents('php://input'), true);
                
                $requiredFields = ['name', 'price', 'duration'];
                $missingFields = validateRequiredFields($input, $requiredFields);
                
                if (!empty($missingFields)) {
                    sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
                }
                
                $name = sanitizeInput($input['name']);
                $description = isset($input['description']) ? sanitizeInput($input['description']) : null;
                $price = (float)$input['price'];
                $duration = (int)$input['duration'];
                $image = isset($input['image']) ? sanitizeInput($input['image']) : null;
                
                $result = $db->execute(
                    "INSERT INTO services (name, description, price, duration, image) VALUES (?, ?, ?, ?, ?)",
                    [$name, $description, $price, $duration, $image]
                );
                
                if ($result) {
                    $serviceId = $db->lastInsertId();
                    $service = $db->fetch("SELECT * FROM services WHERE id = ?", [$serviceId]);
                    sendResponse(true, 'Service added successfully', $service, 201);
                } else {
                    sendResponse(false, 'Failed to add service', null, 500);
                }
                
            } elseif ($method === 'PUT' && isset($_GET['id'])) {
                // Update service
                $serviceId = (int)$_GET['id'];
                $input = json_decode(file_get_contents('php://input'), true);
                
                $requiredFields = ['name', 'price', 'duration'];
                $missingFields = validateRequiredFields($input, $requiredFields);
                
                if (!empty($missingFields)) {
                    sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
                }
                
                $name = sanitizeInput($input['name']);
                $description = isset($input['description']) ? sanitizeInput($input['description']) : null;
                $price = (float)$input['price'];
                $duration = (int)$input['duration'];
                $image = isset($input['image']) ? sanitizeInput($input['image']) : null;
                $status = isset($input['status']) ? sanitizeInput($input['status']) : 'active';
                
                $result = $db->execute(
                    "UPDATE services SET name = ?, description = ?, price = ?, duration = ?, image = ?, status = ? WHERE id = ?",
                    [$name, $description, $price, $duration, $image, $status, $serviceId]
                );
                
                if ($result) {
                    $service = $db->fetch("SELECT * FROM services WHERE id = ?", [$serviceId]);
                    sendResponse(true, 'Service updated successfully', $service);
                } else {
                    sendResponse(false, 'Service not found or no changes made', null, 404);
                }
                
            } elseif ($method === 'DELETE' && isset($_GET['id'])) {
                // Delete service
                $serviceId = (int)$_GET['id'];
                
                // Check if service has appointments
                $appointments = $db->fetch("SELECT COUNT(*) as count FROM appointments WHERE service_id = ?", [$serviceId]);
                
                if ($appointments['count'] > 0) {
                    sendResponse(false, 'Cannot delete service with existing appointments', null, 409);
                }
                
                $result = $db->execute("DELETE FROM services WHERE id = ?", [$serviceId]);
                
                if ($result) {
                    sendResponse(true, 'Service deleted successfully');
                } else {
                    sendResponse(false, 'Service not found', null, 404);
                }
            }
            break;
            
        case 'appointments':
            if ($method === 'GET') {
                // Get all appointments with user and service details
                $appointments = $db->fetchAll(
                    "SELECT a.*, u.name as user_name, u.email as user_email, u.phone as user_phone,
                            s.name as service_name, s.price as service_price, s.duration as service_duration
                     FROM appointments a
                     JOIN users u ON a.user_id = u.id
                     JOIN services s ON a.service_id = s.id
                     ORDER BY a.appointment_date DESC, a.appointment_time DESC"
                );
                
                sendResponse(true, 'Appointments retrieved successfully', $appointments);
                
            } elseif ($method === 'PUT' && isset($_GET['id'])) {
                // Update appointment status
                $appointmentId = (int)$_GET['id'];
                $input = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($input['status'])) {
                    sendResponse(false, 'Status is required', null, 400);
                }
                
                $status = sanitizeInput($input['status']);
                $validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
                
                if (!in_array($status, $validStatuses)) {
                    sendResponse(false, 'Invalid status', null, 400);
                }
                
                $result = $db->execute(
                    "UPDATE appointments SET status = ? WHERE id = ?",
                    [$status, $appointmentId]
                );
                
                if ($result) {
                    $appointment = $db->fetch(
                        "SELECT a.*, u.name as user_name, u.email as user_email,
                                s.name as service_name, s.price as service_price
                         FROM appointments a
                         JOIN users u ON a.user_id = u.id
                         JOIN services s ON a.service_id = s.id
                         WHERE a.id = ?",
                        [$appointmentId]
                    );
                    
                    sendResponse(true, 'Appointment updated successfully', $appointment);
                } else {
                    sendResponse(false, 'Appointment not found', null, 404);
                }
            }
            break;
            
        case 'dashboard-stats':
            if ($method === 'GET') {
                // Get dashboard statistics
                $stats = [];
                
                // Total users
                $userCount = $db->fetch("SELECT COUNT(*) as count FROM users WHERE role = 'user'");
                $stats['total_users'] = $userCount['count'];
                
                // Total services
                $serviceCount = $db->fetch("SELECT COUNT(*) as count FROM services WHERE status = 'active'");
                $stats['total_services'] = $serviceCount['count'];
                
                // Total appointments
                $appointmentCount = $db->fetch("SELECT COUNT(*) as count FROM appointments");
                $stats['total_appointments'] = $appointmentCount['count'];
                
                // Pending appointments
                $pendingCount = $db->fetch("SELECT COUNT(*) as count FROM appointments WHERE status = 'pending'");
                $stats['pending_appointments'] = $pendingCount['count'];
                
                // Today's appointments
                $todayCount = $db->fetch(
                    "SELECT COUNT(*) as count FROM appointments WHERE appointment_date = CURDATE()"
                );
                $stats['today_appointments'] = $todayCount['count'];
                
                // Monthly revenue (completed appointments)
                $revenue = $db->fetch(
                    "SELECT SUM(s.price) as total 
                     FROM appointments a 
                     JOIN services s ON a.service_id = s.id 
                     WHERE a.status = 'completed' 
                     AND MONTH(a.appointment_date) = MONTH(CURDATE()) 
                     AND YEAR(a.appointment_date) = YEAR(CURDATE())"
                );
                $stats['monthly_revenue'] = $revenue['total'] ?? 0;
                
                sendResponse(true, 'Dashboard stats retrieved successfully', $stats);
            }
            break;
            
        default:
            sendResponse(false, 'Invalid action or action not specified', null, 400);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage(), null, 500);
}
?>