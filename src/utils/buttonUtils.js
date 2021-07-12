export function calculateDropdownItems(data, filter){
    switch (filter) {
        case "Courses":
            const uniqueCourses = [...new Set(data.map(dataPoint => dataPoint.Course))]
            return uniqueCourses
        default: 
            return 1
    }
} 