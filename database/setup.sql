CREATE DATABASE coupon_system;
USE coupon_system;

CREATE TABLE coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('available', 'claimed') DEFAULT 'available'
);

CREATE TABLE claims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(50),
    cookie_id VARCHAR(50),
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO coupons (code) VALUES ('COUPON1'), ('COUPON2'), ('COUPON3');
