-- Test seed data for Wish List Portal
INSERT INTO User (fullName, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$testadminhash', 'ADMIN'),
('Test User', 'user@example.com', '$2a$10$testuserhash', 'USER');

INSERT INTO Wish (productName, productLink, description, purchased, userId) VALUES
('Test Product 1', 'https://example.com/1', 'A cool product', false, 2),
('Test Product 2', 'https://example.com/2', 'Another product', true, 2);
