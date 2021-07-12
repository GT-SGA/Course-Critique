# RDS Documentation

## Tables

Tables:
1. Courses
2. Courses Aggregated
3. Course Info
4. Instructors
5. Ratemyprof

### Courses 

Columns:

Term: varchar(50) PK (example: Fall 2010)

course_id: varchar(50) PK (example: CS 1331)

Section: varchar(50) PK (example: TSA, A)

instructor_gt_username: varchar(50) PK (example: xk3)

instructor_name: varchar(50) (example: Kuang, Xi)

Level: varchar(50) PK (example: Undergraduate)

A: (double) example: 23.12

B: (double) example: 23.12

C: (double) example: 23.12

D: (double) example: 23.12

F: (double) example: 23.12

W: (double) example: 23.12

Total: varchar(50) example: 100.00%

GPA:(double) example: 2.22

class_size_group: varchar(50) example: 'Very Large (50 students or more)'


### Courses Aggregated

Additional Columns (in addition to courses)

I: (double)  23.12

NR: (double)  23.12

S: (double)  23.12

U: (double)  23.12

### Course Info

id: varchar(20) PK

course_name: text

credits: int(11)

description: text

### Instructors
(for easier querying purposes)

instructor_gt_username: varchar(50) PK

instructor_name: varchar(50)

instructor_first_name: varchar(50)

instructor_last_name: varchar(50)

### Ratemyprof

instructor_gt_username: varchar(50)

link: varchar(80)

rating: varchar(10)

num_ratings: int(11)