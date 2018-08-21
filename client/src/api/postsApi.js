const postsDBData = [{
    id: "1",
    content: "Every time I look at you, my heart skips a beat, I wonder if you know, my love, that my heart is at your feet, I leave it there for you to do, whatever that you wish, You could take my heart,, and love me,, Or just leave me in this bliss.",
    dateCreated: 1534432262,
    dateLastModified: 1534432262,
    active: true,
    anonymous: true,
    totalComments: 14,
    totalLikes: 28,
    totalShares: 12,
    tags: ["proposal", "love"]
}, {
    id: "2",
    content: "Love is blind but I am not, hence I am writing this to you. ",
    dateCreated: 1534432263,
    dateLastModified: 1534432263,
    active: true,
    anonymous: true,
    totalComments: 24,
    totalLikes: 38,
    totalShares: 22,
    tags: ["proposal", "love"]
}];

const getPosts = () => {
    return [...postsDBData];
};

export default {
    getPosts
}