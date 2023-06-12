import React from 'react'
import './todo.css'
import { useState, useEffect } from 'react'

// const getlocalStroge = () => {
//     const data = JSON.parse(localStorage.getItem('todo'))
//     if (data) {
//         return data;
//     } else {
//         return [];
//     }
// }






const Todo = () => {


    const [value, setValue] = useState('');
    const [item, setItem] = useState([]);                                //setting all the hooks which will require
    const [edit, setEdit] = useState('');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const DataFetch = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/todos/');//making get request to url for todos data
            const todoData = await data.json();
            const ApiDataOnly50 = todoData.filter((element) => {          //only taking first 50 record for rendering
                return element.id <= (50);
            })
            setItem(ApiDataOnly50)                                         //updaing the item after feching the data from url     
        }
        DataFetch();
    }, [])                                                                //passing the empty array to useEffect to render only once when app will loaded or mounted





    const addItem = async () => {

        if (value !== '' && toggle) {                                       //this is for the edit functionality 
            console.log('editing item')
            setValue(
                item.map((current) => {
                    if (current.id === edit) {                              //finding the todo item which one to be updated
                        current.title = value;                              //updating the todo item 
                        return current;
                    }
                    return current;
                })

            )

            setValue('');
            setToggle(false);                                                //changing the icon  


            //making a put request to url 
            try {


                const itemUpdate = item.find((item) => {
                    return item.id === Number(edit)
                })

                console.log('your are updating the item ', itemUpdate);
                const url = `https://jsonplaceholder.typicode.com/todos/${edit}`//passing the item id in request url as params
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemUpdate),
                });

                let result = await response.json();
                console.log('after making put request to api', result);

            } catch (error) {
                console.log('error is', error);
            }
            return;
        }




        if (value !== '') {
            const newitem = {                                                     //making new object of item from the user value 
                title: value,
                completed: false,
                id: new Date().getTime().toString(),
            }
            setItem([newitem, ...item]);                                          //apending the new todo item to the item list
            setValue("");                                                         //making the input field blank



            //making a dummmy post request to the url to add the item into the list 
            const url = 'https://jsonplaceholder.typicode.com/todos/'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newitem),
            });

            let result = await response.json();
            console.log('after making post request to api', result);


        }

    }





    const deleteItem = async (id) => {

        const updatedItem = item.filter((item) => {                                 //deleting the todo item by filtering the item from the list
            return item.id !== id;
        })
        setItem(updatedItem);                                                       //inserting the updated list to setItem for rendering the updated list 
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });
            let result = await response.json();
            console.log('after making delelte request to api', result);
        } catch (error) {
            console.log('error is ', error);
        }

    }
    

    const editItem = async (id) => {
        setToggle(true);                                                                //toggling the save button icon
        setEdit(id);
        item.map((current) => {
            if (current.id === id) {
                setValue(current.title);                                                //apending the item title to input field
            }
            return current;
        })
    }


    const completed = (id) => {                                                           //toggle the icon that showing the work is completed or not
        setToggle(true);
        setEdit(id);
        console.log('you are in edit ', id);
        const updatedItem = item.map((current) => {
            if (current.id === id) {
                var complete = (!current.completed)                                      //toggle the work is completed or not
                console.log('your work', complete)
                current.completed = complete;
            }
            return current
        })
        console.log('your completed data', updatedItem);
        setItem(updatedItem);                                                            //updating the item list for rendering new list
    }



    return (
        <>
            <div className="page">
                <h1 className='heading'>Todo App</h1>
                <div className="write">
                    <input type="text" className="input" placeholder='write 📅' value={value} onChange={(event) => setValue(event.target.value)} />
                    {
                        toggle ? (<button type='submit' className="control" onClick={addItem}><i className="fa-regular fa-pen-to-square"></i></button>) : (<button type='submit' className="control" onClick={addItem}><i className="fa-solid fa-file-circle-plus"></i></button>)
                    }
                </div>
                <div className="list">
                    {
                        item.map((item) => {
                            return (
                                <div className="item" key={item.id}>

                                    <h1 className='title'>
                                        <span onClick={() => completed(item.id)}><img src={item.completed ? "https://cdn-icons-png.flaticon.com/128/8187/8187987.png" : 'https://cdn-icons-png.flaticon.com/128/3549/3549052.png '} alt="completed" /></span>
                                        {item.title}</h1>
                                    <div className="action">
                                        <span onClick={() => editItem(item.id)}><i className="fa-regular fa-pen-to-square"></i></span>
                                        <span onClick={() => deleteItem(item.id)}><i className="fa-solid fa-trash"></i></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Todo
