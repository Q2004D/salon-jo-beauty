<?php
require_once '../config/database.php';

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    sendResponse(false, 'Authentication required', null, 401);
}

try {
    $db = new Database();
    $userId = $_SESSION['user_id'];
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'GET') {
        // Get user's appointments
        $appointments = $db->fetchAll(
            "SELECT a.*, s.name as service_name, s.price as service_price, s.duration as service_duration
             FROM appointments a
             JOIN services s ON a.service_id = s.id
             WHERE a.user_id = ?
             ORDER BY a.appointment_date DESC, a.appointment_time DESC",
            [$userId]
        );
        
        sendResponse(true, 'Appointments retrieved successfully', $appointments);
        
    } elseif ($method === 'POST') {
        // Book new appointment
        $input = json_decode(file_get_contents('php://input'), true);
        
        $requiredFields = ['service_id', 'appointment_date', 'appointment_time'];
        $missingFields = validateRequiredFields($input, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(false, 'Missing required fields: ' . implode(', ', $missingFields), null, 400);
        }
        
        $serviceId = (int)$input['service_id'];
        $appointmentDate = sanitizeInput($input['appointment_date']);
        $appointmentTime = sanitizeInput($input['appointment_time']);
        $notes = isset($input['notes']) ? sanitizeInput($input['notes']) : null;
        
        // Validate date format
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $appointmentDate)) {
            sendResponse(false, 'Invalid date format. Use YYYY-MM-DD', null, 400);
        }
        
        // Validate time format
        if (!preg_match('/^\d{2}:\d{2}$/', $appointmentTime)) {
            sendResponse(false, 'Invalid time format. Use HH:MM', null, 400);
        }
        
        // Check if date is not in the past
        if (strtotime($appointmentDate) < strtotime(date('Y-m-d'))) {
            sendResponse(false, 'Cannot book appointment for past dates', null, 400);
        }
        
        // Check if service exists
        $service = $db->fetch("SELECT * FROM services WHERE id = ? AND status = 'active'", [$serviceId]);
        if (!$service) {
            sendResponse(false, 'Service not found or inactive', null, 404);
        }
        
        // Check for conflicting appointments (same date and time)
        $conflict = $db->fetch(
            "SELECT id FROM appointments WHERE appointment_date = ? AND appointment_time = ? AND status != 'cancelled'",
            [$appointmentDate, $appointmentTime]
        );
        
        if ($conflict) {
            sendResponse(false, 'Time slot already booked. Please choose another time.', null, 409);
        }
        
        // Insert new appointment
        $result = $db->execute(
            "INSERT INTO appointments (user_id, service_id, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?)",
            [$userId, $serviceId, $appointmentDate, $appointmentTime, $notes]
        );
        
        if ($result) {
            $appointmentId = $db->lastInsertId();
            
            // Get the created appointment with service details
            $appointment = $db->fetch(
                "SELECT a.*, s.name as service_name, s.price as service_price, s.duration as service_duration
                 FROM appointments a
                 JOIN services s ON a.service_id = s.id
                 WHERE a.id = ?",
                [$appointmentId]
            );
            
            sendResponse(true, 'Appointment booked successfully', $appointment, 201);
        } else {
            sendResponse(false, 'Failed to book appointment', null, 500);
        }
        
    } elseif ($method === 'PUT' && isset($_GET['id'])) {
        // Update appointment (user can only update their own appointments)
        $appointmentId = (int)$_GET['id'];
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Check if appointment belongs to user
        $appointment = $db->fetch(
            "SELECT * FROM appointments WHERE id = ? AND user_id = ?",
            [$appointmentId, $userId]
        );
        
        if (!$appointment) {
            sendResponse(false, 'Appointment not found or access denied', null, 404);
        }
        
        // Only allow updates for pending appointments
        if ($appointment['status'] !== 'pending') {
            sendResponse(false, 'Can only modify pending appointments', null, 400);
        }
        
        $serviceId = isset($input['service_id']) ? (int)$input['service_id'] : $appointment['service_id'];
        $appointmentDate = isset($input['appointment_date']) ? sanitizeInput($input['appointment_date']) : $appointment['appointment_date'];
        $appointmentTime = isset($input['appointment_time']) ? sanitizeInput($input['appointment_time']) : $appointment['appointment_time'];
        $notes = isset($input['notes']) ? sanitizeInput($input['notes']) : $appointment['notes'];
        
        // Validate date and time if provided
        if (isset($input['appointment_date']) && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $appointmentDate)) {
            sendResponse(false, 'Invalid date format. Use YYYY-MM-DD', null, 400);
        }
        
        if (isset($input['appointment_time']) && !preg_match('/^\d{2}:\d{2}$/', $appointmentTime)) {
            sendResponse(false, 'Invalid time format. Use HH:MM', null, 400);
        }
        
        // Check if date is not in the past
        if (strtotime($appointmentDate) < strtotime(date('Y-m-d'))) {
            sendResponse(false, 'Cannot schedule appointment for past dates', null, 400);
        }
        
        // Check for conflicts (exclude current appointment)
        $conflict = $db->fetch(
            "SELECT id FROM appointments WHERE appointment_date = ? AND appointment_time = ? AND status != 'cancelled' AND id != ?",
            [$appointmentDate, $appointmentTime, $appointmentId]
        );
        
        if ($conflict) {
            sendResponse(false, 'Time slot already booked. Please choose another time.', null, 409);
        }
        
        // Update appointment
        $result = $db->execute(
            "UPDATE appointments SET service_id = ?, appointment_date = ?, appointment_time = ?, notes = ? WHERE id = ?",
            [$serviceId, $appointmentDate, $appointmentTime, $notes, $appointmentId]
        );
        
        if ($result) {
            // Get updated appointment with service details
            $updatedAppointment = $db->fetch(
                "SELECT a.*, s.name as service_name, s.price as service_price, s.duration as service_duration
                 FROM appointments a
                 JOIN services s ON a.service_id = s.id
                 WHERE a.id = ?",
                [$appointmentId]
            );
            
            sendResponse(true, 'Appointment updated successfully', $updatedAppointment);
        } else {
            sendResponse(false, 'No changes made or update failed', null, 400);
        }
        
    } elseif ($method === 'DELETE' && isset($_GET['id'])) {
        // Cancel appointment (user can only cancel their own appointments)
        $appointmentId = (int)$_GET['id'];
        
        // Check if appointment belongs to user
        $appointment = $db->fetch(
            "SELECT * FROM appointments WHERE id = ? AND user_id = ?",
            [$appointmentId, $userId]
        );
        
        if (!$appointment) {
            sendResponse(false, 'Appointment not found or access denied', null, 404);
        }
        
        // Only allow cancellation for pending or confirmed appointments
        if (!in_array($appointment['status'], ['pending', 'confirmed'])) {
            sendResponse(false, 'Cannot cancel this appointment', null, 400);
        }
        
        // Update status to cancelled instead of deleting
        $result = $db->execute(
            "UPDATE appointments SET status = 'cancelled' WHERE id = ?",
            [$appointmentId]
        );
        
        if ($result) {
            sendResponse(true, 'Appointment cancelled successfully');
        } else {
            sendResponse(false, 'Failed to cancel appointment', null, 500);
        }
        
    } else {
        sendResponse(false, 'Method not allowed or missing appointment ID', null, 405);
    }
    
} catch (Exception $e) {
    sendResponse(false, 'Server error: ' . $e->getMessage(), null, 500);
}
?>