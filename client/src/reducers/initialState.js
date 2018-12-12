export default {
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
            date: null,
            quick: {
                city: false,
                caste: false,
                motherTongue: false
            },
            advanced: {}
        }
    },
    profile: {
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
