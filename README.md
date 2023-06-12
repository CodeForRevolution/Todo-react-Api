*we have define the four react hooks name "item","value","edit","toggle"

*we have set the intial data for hooks item=[] ,value='',edit='',toggle=false

*item is storing the array of object which we are getting from api "https://jsonplaceholder.typicode.com/todos/" this work is we are doing in useEffect hooks because we want all the data while App is getting mounted 

*App contain  4 function addItem ,deleteItem,editItem,completed,

*addItem function  will add the new todo Item to the list or Edit the existing todo Item from the list if the "toggle "is set to true

*clicking on edit icon editItem function    will call and will set the toggle to "true"
if the toggle will true icon of add item change to edit item icon 
and and set the "item" title to the value that will display in the input field
now when we will click to save button it will modify the existing todo-item
also we are making a put request the url "https://jsonplaceholder.typicode.com/todos/"

*clicking on the delete icon delete makes a call to delte function where we are sending the id of particular todo item from that we are deleting the Item from the Item list also we are making delete request to this url "https://jsonplaceholder.typicode.com/todos/"


*cliking on calender icon that showing the status of work wheather its completed or not completed function will call that set the todo-item property "completed" from "false" to "true" todo-item status icon will be change fron pending to completed
