TRUNCATE TABLE "fan_event_connections" CASCADE;
TRUNCATE TABLE "fans" CASCADE;


INSERT INTO fans (id, username, email, "favoriteGenres", "favoriteArtistIds", "createdAt", "updatedAt") VALUES
('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'AliceFan', 'alice@example.com', '{Rock,Pop}', '{a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11,b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22}', NOW(), NOW()),
('11eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'BobConcertGoer', 'bob@example.com', '{Electronic,Jazz}', '{c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33}', NOW(), NOW()),
('12eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'CharlieMusicLover', 'charlie@example.com', '{Blues}', '{}', NOW(), NOW());

INSERT INTO fan_event_connections ("fanId", "eventId", "connectionType", "createdAt") VALUES
('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Attended', NOW()), -- Alice attends Rock Mania
('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'Interested', NOW()), -- Alice is interested in Jazz Night
('11eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'RSVP', NOW()); -- Bob RSVP'd to Electronic Summit
