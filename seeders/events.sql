TRUNCATE TABLE "event_artists" CASCADE;
TRUNCATE TABLE "events" CASCADE;
TRUNCATE TABLE "artists" CASCADE;

INSERT INTO artists (id, name, genres, biography, "createdAt", "updatedAt") VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'The Sonic Boomers', '{Rock,Blues}', 'A legendary rock band known for their explosive live shows.', NOW(), NOW()),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Synthwave Dreamers', '{Electronic,Synthwave}', 'Pioneers of the modern synthwave sound.', NOW(), NOW()),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Jazzy Groove', '{Jazz,Funk}', 'Smooth melodies and infectious rhythms.', NOW(), NOW());

('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Rock Mania Festival', '2025-08-20 18:00:00+00', 'Arena Stage', NOW(), NOW()),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'Electronic Summit', '2025-09-10 20:00:00+00', 'Convention Hall', NOW(), NOW()),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'Jazz Night Live', '2025-10-05 19:30:00+00', 'The Blue Note Club', NOW(), NOW());

INSERT INTO event_artists ("eventId", "artistId", "createdAt") VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW()),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', NOW()),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', NOW()),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', NOW());
