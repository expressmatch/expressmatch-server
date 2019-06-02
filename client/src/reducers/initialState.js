export default {
    user: {
        name: null,
        email: null,
        photo: null
    },
    posts: {
        entities: {
            posts: {
                byId: {},
                allIds: [],
                loading: false
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
        gender: "male",
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
