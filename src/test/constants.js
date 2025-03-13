export const validResponse = 
[
    {
        "id": 1,
        "desc": "go to gym ",
        "when": [
            {
                "day": "SUNDAY",
                "startTime": "08:00"
            },
            {
                "day": "MONDAY",
                "startTime": "08:00"
            },
            {
                "day": "WEDNESDAY",
                "startTime": "08:00"
            },
            {
                "day": "FRIDAY",
                "startTime": "08:00"
            }
        ],
        "reasoning": "Since going to the gym is a high-priority task and needs to be done frequently (4 days), I've scheduled the sessions on Sunday, Monday, Wednesday, and Friday mornings when motivation is typically higher."
    },
    {
        "id": 2,
        "desc": "take mom out to eat",
        "when": [
            {
                "day": "SATURDAY",
                "startTime": "12:00"
            }
        ],
        "reasoning": "This task is of low priority and only needs to be done once, so I've scheduled it for Saturday afternoon which is generally a good time for social activities."
    },
    {
        "id": 3,
        "desc": "pay HOA",
        "when": [
            {
                "day": "TUESDAY",
                "startTime": "09:00"
            }
        ],
        "reasoning": "This is a high-priority task that needs to be completed by a specific due date (March 11), so I've scheduled it for Tuesday morning, allowing for any necessary follow-up after paying."
    },
    {
        "id": 4,
        "desc": "clean car",
        "when": [
            {
                "day": "THURSDAY",
                "startTime": "10:00"
            }
        ],
        "reasoning": "This is a medium-priority task that should fit into a weekday. Thursday provides some time during the week when the schedule is lighter, making it a suitable choice."
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