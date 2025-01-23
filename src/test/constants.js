export const validResponse = [
    {   "desc": "Go To the Gym",
        "id": 1,
        "when": [
            {
                "day": "Sunday",
                "startTime": "08:00"
            },
            {
                "day": "Monday",
                "startTime": "08:00"
            },
            {
                "day": "Wednesday",
                "startTime": "08:00"
            },
            {
                "day": "Friday",
                "startTime": "08:00"
            },
            {
                "day": "Saturday",
                "startTime": "08:00"
            }
        ],
        "reasoning": "Gym is a high priority and should be done early in the day. Scheduling it 5 days a week ensures consistent fitness habits."
    },
    {
        "desc": "Work on Project",
        "id": 2,
        "when": [
            {
                "day": "Monday",
                "startTime": "09:30"
            },
            {
                "day": "Wednesday",
                "startTime": "09:30"
            },
            {
                "day": "Friday",
                "startTime": "09:30"
            }
        ],
        "reasoning": "Working on the project is also a high priority, scheduled after gym sessions to allow for a focused energy period."
    },
    {
        "desc": "Payment for Dentis",
        "id": 3,
        "when": [
            {
                "day": "Tuesday",
                "startTime": "10:00"
            }
        ],
        "reasoning": "Dentist payment is a low priority task, scheduled once on a less busy day (Tuesday) to manage time efficiently."
    },
    {
        "desc": "Take mom out to eat",
        "id": 4,
        "when": [
            {
                "day": "Thursday",
                "startTime": "18:00"
            }
        ],
        "reasoning": "Eating with mom is a medium priority task, scheduled for the evening when both might be more available."
    }
]

export const reorderTask = [
    {
        "desc": "gym",
        "reasoning": "Gym workouts are typically best done in the morning to energize the day. I've scheduled it five times a week with consistency.",
        "time": "07:00",
        "day": "Friday"
    },
    {
        "desc": "gym",
        "reasoning": "Gym workouts are typically best done in the morning to energize the day. I've scheduled it five times a week with consistency.",
        "time": "07:00",
        "day": "Monday"
    },
    {
        "desc": "gym",
        "reasoning": "Gym workouts are typically best done in the morning to energize the day. I've scheduled it five times a week with consistency.",
        "time": "07:00",
        "day": "Saturday"
    },
    {
        "desc": "gym",
        "reasoning": "Gym workouts are typically best done in the morning to energize the day. I've scheduled it five times a week with consistency.",
        "time": "07:00",
        "day": "Sunday"
    },
    {
        "desc": "gym",
        "reasoning": "Gym workouts are typically best done in the morning to energize the day. I've scheduled it five times a week with consistency.",
        "time": "07:00",
        "day": "Wednesday"
    },
    {
        "desc": "project code",
        "reasoning": "Coding tasks often require uninterrupted time. I chose morning sessions on three weekdays to allow for focused work after gym.",
        "time": "09:00",
        "day": "Friday"
    },
    {
        "desc": "project code",
        "reasoning": "Coding tasks often require uninterrupted time. I chose morning sessions on three weekdays to allow for focused work after gym.",
        "time": "09:00",
        "day": "Monday"
    },
    {
        "desc": "project code",
        "reasoning": "Coding tasks often require uninterrupted time. I chose morning sessions on three weekdays to allow for focused work after gym.",
        "time": "09:00",
        "day": "Wednesday"
    },
    {
        "desc": "take mom out to eat",
        "reasoning": "Evenings are typically more suitable for dining out. I scheduled two outings during the week which allows for a nice break.",
        "time": "18:00",
        "day": "Thursday"
    },
    {
        "desc": "take mom out to eat",
        "reasoning": "Evenings are typically more suitable for dining out. I scheduled two outings during the week which allows for a nice break.",
        "time": "18:00",
        "day": "Tuesday"
    }
]