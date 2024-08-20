Things to do: deadline 14th Aug.

<WidgetIdeas>
- Analytics chart that shows number of tasks completed per day.
- create reminder widget for upcoming tasks. For the 4 most upcoming widgets.
  -> If the user happens to not use due dates, remove the widget entirely.
</WidgetIdeas>

<CurrentPlan>

-- less importantance --
- error boundary component for important parts of application.
- An input element must have an autocomplete attribute. (later)
- gradient for the backgrounds of all pages. (half complete) (not sure on what type of gradient...)

-- mid importantance --
- Correct UserContextType.user structure for type safety.
- Subtask uploading for the user.

-- high importantance --
- add useMutation from react-query to update and remove functions in taskspage component.
- create a function that asserts an object begin a tasktype[] upon being true (if checks).

- Create verification component.
- Create a verification function that refreshes the
  page and checks verification status again. (only solution to think of currently).
</CurrentPlan>

<AppWideIdeas>
- the phone design of the application.
- set up firebase for the application.
- flatten the architecture as much as possible with the collections.
</AppWideIdeas>


<Processes>
Branch 1: User signup:
    -> Create account -> update displayName.
    -> Create a user account in user collection.
    -> inside "users"/"userId"/"tasks-collection"

Branch 2: User login:
    ->
    ->
</Processes>


Task Structure:
--------------
task: {
  id: string,
  title: string,
  description: string, (optional)
  dueDate: string, (unix timestamp)
  status: string, (draft, inProgress, completed)
  subtasks: [
    {
      id: string,
      title: string,
      position: number,
      completed: boolean,
    }
  ],
}
