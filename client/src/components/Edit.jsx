import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const Edit = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [Onemeal, setOnemeal] = useState(null)
  const [name, setName] = useState("");
  const [cooktime, setCooktime] = useState(0);
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [errors, setErrors] = useState([]);
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  useEffect(()=> {
    axios.get(`http://localhost:8000/api/meals/${id}`)
   .then(res=> {console.log(res.data) 
    setName(res.data.name)
    setCooktime(res.data.cooktime)
    setDirections(res.data.directions)
    setIngredients(res.data.ingredients)

    })
   .catch(err => console.error(err))
},[id])
const submitHandler = (e) =>{
  e.preventDefault();
  const tempObj = { name, cooktime, directions, ingredients };
  axios.patch(`http://localhost:8000/api/meals/${id}`,
      tempObj)
      .then(res=>{console.log(res.data)
        navigate("/")
      })
      .catch(err=>{
          const errorResponse = err.response.data.errors; // Get the errors from err.response.data
          const errorArr = []; // Define a temp error array to push the messages in
          for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
              errorArr.push(errorResponse[key].message)
          }
          // Set Errors
          setErrors(errorArr);
      })    
}
  return (
    <div>
      <Link to={`/meals/${id}/details`}> <button className="btn btn-primary active">Detail</button></Link>
    <div className='container'>
      <h1>Update Meal</h1>
      <form onSubmit={submitHandler}>
        {errors.map((err, index) => (
          <p style={{ color: 'red' }} key={index}>{err}</p>
        ))}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cooktime" className="form-label">Cook Time:</label>
          <input
            value={cooktime}
            onChange={e => setCooktime(e.target.value)}
            type="number"
            className="form-control"
            id="cooktime"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="directions" className="form-label">Directions:</label>
          <textarea
            value={directions}
            onChange={e => setDirections(e.target.value)}
            className="form-control"
            id="directions"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="mb-2">
              <input
                value={ingredient}
                onChange={e => handleIngredientChange(index, e.target.value)}
                type="text"
                className="form-control"
                placeholder={`Ingredient ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
  )
}

export default Edit
