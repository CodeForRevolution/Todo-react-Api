import React from 'react'
import axios from 'axios'
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

    const [value, setValue] = useState();
    const [item, setItem] = useState(getlocalStroge);  //setting all the hooks which will require
    const [edit, setEdit] = useState('');
    const [toggle, setToggle] = useState(false);



    useEffect(() => {   //using useEffect hooks to fetch the data from
                        //ApI at inital when app is loaded

        const DataFetch = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/todos/');//making get request to url for todos data
            const todoData = await data.json();
            const only10 = todoData.filter((element) => { //only taking first 20 record for rendering
                return element.id <= (25);
            })
            setItem(only10)      //updaing the item after feching the data from url     
        }
        DataFetch();
    }, [])//passing the empty array to useEffect to render only once when app will loaded or mounted





    const addItem = () => {
        if (value !== '' && toggle) { //this is for the edit functionality 
            console.log('editing item')
            setValue(
                item.map((current) => {
                    if (current.id === edit) {//finding the todo item which one to be updated
                        current.title = value;//updating the todo item 
                        return current;
                    }
                    return current;
                })

            )
            setValue('');
            setToggle(false);//changing the icon 
            return
        }
        if (value !== '') {
            const newitem = {     //making new object of item from the user value 
                title: value,
                id: new Date().getTime().toString(),
            }
            setItem([newitem, ...item]);//apending the new todo item to the item hook
            setValue("");
        }

    }





    const deleteItem = async (id) => {

        const updatedItem = item.filter((item) => { //deleting the todo item by filtering the item from the list
            return item.id !== id;
        })
        setItem(updatedItem);//inserting the updated list to setItem for rendering the updated list 


        const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {   //dummy api call to delete the item
            method: 'DELETE',
        });

    }




    // useEffect(() => {
    //     localStorage.setItem('todo', JSON.stringify(item));
    // }, [item])


    const editItem = async (id) => {
        setToggle(true);//toggling the save button icon
        setEdit(id);
        item.map((current) => {
            if (current.id === id) {
                setValue(current.title);//apending the item title to input field
            }
        })
        const dataupdate = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {//making the dummy call to update the item
            method: 'PUT',
        });

    }


    const completed = (id) => { //toggle the icon that showing the work is completed or not
        setToggle(true);
        setEdit(id);
        console.log('you are in edit ', id);
        const updatedItem = item.map((current) => {
            if (current.id === id) {
                var complete = (!current.completed)//toggle the work is completed or not
                console.log('your work', complete)
                current.completed = complete;
            }
            return current
        })

        console.log('your completed data',updatedItem);
        setItem(updatedItem);//updating the item list for rendering new list

        // 

    }




    // 
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
                                <div className="item">

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
