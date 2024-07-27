CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    email TEXT NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verified BOOL DEFAULT FALSE
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    address_one VARCHAR(255) NOT NULL,
    address_two VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    skills JSONB NOT NULL,
    preferences TEXT,
    availability JSONB NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    required_skills TEXT[] NOT NULL,
    event_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    urgency TEXT NOT NULL,
    date DATE NOT NULL,
    matched_volunteers JSONB
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    participation_status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE notification (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    is_read BOOL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);