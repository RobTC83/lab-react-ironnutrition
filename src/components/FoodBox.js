import React,{useState} from 'react'
import foods from '../foods.json'

export default function FoodBox() {

    const [formState, setFormState] = useState(false)

    const [newItem, setNewItem] = useState(
        {   name:"",
            calories:"",
            image:"",
            quantity: 0
        })

    const [item, setItem] = useState(foods)

    const [search, setSearch] = useState(item)

    const [listaDerecha, setListaDerecha]  = useState([])

    console.log(formState)

    function displayForm(){
    setFormState(true) 

    }

    function handleChange(event){

        console.log(event.target.name, event.target.value)

        setNewItem({
            ...newItem,
            [event.target.name]: event.target.value
        })
        console.log("newItem es:",newItem)

        const filt = item.filter((element)=>{
            return(  element.name === newItem.search)
          })
          console.log("newItem es:",newItem)
          console.log("el filtro es:",filt)
    }


    function addClient(event){

        event.preventDefault()

        setItem([
            ...item,
            newItem
        ])

        setSearch([
            ...item,
            newItem
        ])

        setNewItem({
            name:"",
            calories:"",
            image:"",
            quantity:""
        })

        console.log(item)

        setFormState(false)
    }

    function searchEngine(event) {

        const searchArr = search.filter((e)=>{
            return e.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setItem(searchArr)
        console.log(searchArr)
    
    }

const sumarALista = (elemento)=>{

    setListaDerecha(...listaDerecha, elemento)

    const elementoSumado = listaDerecha.filter((elem)=>{ return elemento.name===elem.name})
        console.log("este es ",elementoSumado)

    elementoSumado.quantity+=1
    elementoSumado.calories+=elementoSumado.calories

    setListaDerecha(elementoSumado)
    console.log("este es elem sumado",elementoSumado)

    // listaDerecha.map((element)=>{

    //     if(element.name ===elementoSumado.name) {

    //     return (elementoSumado) }
    //     else {
    //         return elemento
         

    

   
    // setListaDerecha([...listaDerecha,elemento])


}

    function form(){
        return (
            <form>
    <p><label >Name: </label>
    <input name="name" type="text" value={newItem.name} onChange={(e)=>handleChange(e)}/></p>

    <p><label>Number of calories: </label>
    <input name="calories" type="number" value={newItem.calories} onChange={(e)=>handleChange(e)}/></p>

    <p><label>Image: </label>
    <input name="image" type="text" value={newItem.image} onChange={(e)=>handleChange(e)}/></p>

    <button onClick={(e)=>addClient(e)}type="submit">Add</button>
</form>
        )
    }
    
    

    
    
    return (

        
<div>

<button className="button is-info" onClick={()=>{displayForm()}}>Add New Food</button>

{formState? form() : null }

<hr></hr>
<input onChange={(e)=>searchEngine(e)} 
name="search" placeholder="Search"/>

    {item.map((e,id)=>{
        return(
    <div key={id}>
        <div className="box">
        <article className="media">
            <div className="media-left">
                <figure className="image is-64x64">
                    <img src={e.image} />
                </figure>
            </div>
        <div className="media-content">
            <div className="content">
                <p>
                <strong>{e.name}</strong> <br />
                <small>{e.calories} cal</small>
                </p>
            </div>
        </div>
        <div className="media-right">
            <div className="field has-addons">
                <div className="control">
                    <input className="input" type="number" value={e.quantity} />
                </div>
         
          
                <button className="button is-info" onClick={()=>sumarALista(e)}>
                     +
                </button>

           
        </div>
    </div>
            </article>
</div>
</div>
)

    })
}

<div>
    <p>Today's Food</p>
 
    {listaDerecha.map((element)=>{
        return (
        <div>
            <p>Name: {element.name}</p>
            <p>Quantity: {element.quantity}</p>
            <p>Calories: {element.calories}</p>
        </div>
        )
    })
        
    }
</div>

        </div>
    )
}
