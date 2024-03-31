CREATE TABLE users (
    id INT PRIMARY KEY,
    userId VARCHAR(255) UNIQUE NOT NULL,
    clerkId VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(50),
    avatarUrl VARCHAR(255),
    createAt DATETIME,
    credit INT
);

CREATE TABLE image (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    imageUrl VARCHAR(255),
    width INT,
    height INT,
    tag VARCHAR(255),
    prompt VARCHAR(1000),
    createAt DATETIME
);
