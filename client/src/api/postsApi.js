const posts = [
    {
        "id": 1,
        "dateCreated": "June 20",
        "title" : "Do we need a Title",
        "content": "Every time I look at you, my heart skips a beat, I wonder if you know, my love, that my heart is at your feet, I leave it there for you to do, whatever that you wish, You could take my heart,, and love me,, Or just leave me in this bliss.",
        "tags": [
            "love",
            "friendship"
        ],
        "city": "chennai",
        "contact": {
            "mobile": "444-555-9999",
            "email": "abc@github.com",
            "gender": "male",
            "firstName": "Bill",
            "lastName": "West",
            "images" : [

            ]
        },
        "userInfo": [

        ],
        "comments": [

        ]
    },
    {
        "id": 2,
        "dateCreated": "May 02, 2017",
        "title" : "Proposal 2",
        "content": "Love is blind but I am not, hence I am writing this to you. ",
        "tags": [
            "Love",
            "beautiful"
        ],
        "city": "bombay",
        "contact": {
            "mobile": "444-555-8888",
            "email": "def@github.com",
            "gender": "female",
            "firstName": "Steffy",
            "lastName": "Graph",
            "images" : [

            ]
        },
        "userInfo": [

        ],
        "comments": [

        ]
    },
    {
        "id": 3,
        "dateCreated": "12-Apr-2017",
        "title" : "Proposal 3",
        "content": "Lorem Ipsum dole from tomnom is the better batter, Lorem Ipsum dole from tomnom is the better batter, Lorem Ipsum dole from tomnom is the better batter",
        "tags": [
            "friendship"
        ],
        "city": "bombay",
        "contact": {
            "mobile": "444-555-7777",
            "email": "xyz@github.com",
            "gender": "male",
            "firstName": "Bob",
            "lastName": "West",
            "images" : [
                {
                    "path": "/usr/img/img1.jpg",
                    "type": "jpg",
                    "size": "102kb"
                }
            ]
        },
        "userInfo": [

        ],
        "comments": [

        ]
    },
    {
        "id": 4,
        "dateCreated": "June 16",
        "title" : "Proposal 4",
        "content": "What is love, nothing but friendship. Have a good day all of you.",
        "tags": [

        ],
        "city": "los angels",
        "contact": {
            "mobile": "444-555-6666",
            "email": "los@github.com",
            "gender": "",
            "firstName": "",
            "lastName": "",
            "images" : [

            ]
        },
        "userInfo": [

        ],
        "comments": [
            {
                "id": 1,
                "comment": "That is a nice post. Thank you."
            },
            {
                "id": 2,
                "comment": ""
            }
        ]
    },
    {
        "id": 5,
        "dateCreated": "22-Dec-2016",
        "title" : "Proposal 5",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tags": [
            "love",
            "friendship",
            "marriage",
            "boy friend",
            "blind"
        ],
        "city": "",
        "contact": {
            "mobile": "",
            "email": "",
            "gender": "male",
            "firstName": "",
            "lastName": "",
            "images" : [

            ]
        },
        "userInfo": [
            {
                "firstName": "XYZ",
                "lastName": "",
                "id": 100022344,
                "city": "delhi",
                "contact": [

                ]
            }
        ],
        "comments": [

        ]
    }
];

const getPosts = () => {
  return [...posts];
};

export default {
    getPosts
}