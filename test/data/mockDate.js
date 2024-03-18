const faker = require('faker');

// Function to generate mock profiles
const generateProfiles = (count) => {
    const profiles = [];
    for (let i = 1; i <= count; i++) {
        const profile = {
            _id: i, // Numeric ID for profile
            name: faker.name.findName(),
            description: faker.lorem.sentence(),
            mbti: faker.random.arrayElement(['INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ', 'ISFP', 'ISFJ', 'ESFP', 'ESFJ', 'ISTP', 'ISTJ', 'ESTP', 'ESTJ']),
            enneagram: faker.random.arrayElement(['1w2', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1']),
            zodiac: faker.random.arrayElement(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']),
            variant: faker.lorem.word(),
            tritype: faker.datatype.number({ min: 100, max: 999 }), // Random 3-digit number
            socionics: faker.lorem.word(),
            temperaments: faker.lorem.word(),
            sloan: faker.lorem.word(),
            psyche: faker.lorem.word(),
            image: faker.image.avatar()
        };
        profiles.push(profile);
    }
    return profiles;
};

// Function to generate mock comments
const generateComments = (count, profiles) => {
    const comments = [];
    for (let i = 0; i < count; i++) {
        const profileCommentId = faker.random.arrayElement(profiles)._id; // Get random profile ID for comment
        const profileId = faker.random.arrayElement(profiles)._id; // Get random profile ID for commenter
        const comment = {
            profileCommentId: profileCommentId,
            profileId: profileId,
            mbti: faker.random.arrayElement(['INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ', 'ISFP', 'ISFJ', 'ESFP', 'ESFJ', 'ISTP', 'ISTJ', 'ESTP', 'ESTJ']),
            enneagram: faker.random.arrayElement(['1w2', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1']),
            zodiac: faker.random.arrayElement(['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']),
            title: faker.lorem.words(5),
            comment: faker.lorem.paragraphs(2)
        };
        comments.push(comment);
    }
    return comments;
};

// Function to generate mock likes
const generateLikes = (count, comments, profiles) => {
    const likes = [];
    for (let i = 0; i < count; i++) {
        const commentId = faker.random.arrayElement(comments).profileCommentId; // Get random comment ID for like
        const profileLikeId = faker.random.arrayElement(profiles)._id; // Get random profile ID for like
        const like = {
            profileLikeId: profileLikeId,
            commentId: commentId
        };
        likes.push(like);
    }
    return likes;
};

// Generate mock profiles
const mockProfiles = generateProfiles(100);

// Generate mock comments
const mockComments = generateComments(1000, mockProfiles);

// Generate mock likes
const mockLikes = generateLikes(5000, mockComments, mockProfiles);

// Export mock data
module.exports = {
    profiles: mockProfiles,
    comments: mockComments,
    likes: mockLikes
};
