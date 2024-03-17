module.exports = ({type, sortBy, profileId}) => {
    const filterQuery = {
        profileId: profileId
    };

// Apply filtering based on the provided filter criteria
    if (type === 'MBTI') {
        filterQuery.mbti = {$ne: null};
    } else if (type === 'Enneagram') {
        filterQuery.enneagram = {$ne: null};
    } else if (type === 'Zodiac') {
        filterQuery.zodiac = {$ne: null};
    }

// Determine the sorting field and order based on the provided sort criteria
    let sortField;
    if (sortBy === 'best') {
        sortField = {likes: -1}; // Sort by likes in descending order
    } else {
        sortField = {createdAt: -1}; // Sort by createdAt in descending order by default
    }

    return {filterQuery, sortField};
};
