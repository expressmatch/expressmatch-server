export default {
    user: {
        name: null,
        email: null,
        photo: null
    },
    posts: {
        loading: false,
        pageNumber: 0,
        hasNext: true,
        entities: {
            posts: {
                byId: {},
                allIds: []
            },
            comments: {
                byId: {},
                allIds: [],
                loading: false
            }
        },
        filters: {
            date: new Date(),
            quick: {
                city: false,
                caste: false,
                motherTongue: false
            },
            advanced: {}
        }
    },
    profile: {
        loading: false,
        age: 21,
        gender: "",
        currentCity: "",
        homeTown: "",
        motherTongue: "",
        caste: "",
        subCaste: "",
        organization: "",
        job: "",
        interests: []
    }
}
