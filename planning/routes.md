### ROUTES
RESTful

# MyLists
BROWSE
- GET users/:id/lists
READ
- GET users/:id/lists/:idList
EDIT
- POST users/:id/lists/:idList/edit <!-- edit list name -->
- POST users/:id/tasks/:idTasks/edit <!-- edit task -->
ADD
- POST users/:id/lists/:idList
- POST users/:id/tasks/:idTasks <!-- category is passed with the task's body -->
DELETE
- POST users/:id/lists/:idList/delete <!-- cascade and delete tasks associated -->
- POST users/:id/tasks/:idTasks/delete

# Users
READ
-GET users/:id
EDIT
-POST users/:id/edit

