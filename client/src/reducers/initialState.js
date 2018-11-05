export default {
    posts: {
        loading: false,
        entities: {
            posts: {
                byId: {},
                allIds: []
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
