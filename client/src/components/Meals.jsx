import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Meals = ({meals2,findmeals}) => {
  const [meals, setMeals] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/api/meals')
   .then(res => {console.log(res.data)
    setMeals(res.data)}
  )
   .catch(err => console.log(err))
}, [])
useEffect(() => {
  findmeals();
}, [findmeals]);
  return (
<div>
<Link to={`/meals/new`}> <button className="btn btn-primary active">Add a meal</button></Link>
<div className="card-header d-flex justify-content-between">
          <h3>Find Inspiration with these delicious meals! </h3>
        </div>
  <div className="table-responsive">
    <table className="table table-primary">
      <thead>
        <tr>
          <th scope="col">Meal</th>
          <th scope="col">Prep Time</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        {meals ? (
          meals.map((meal) => (
            <tr key={meal._id}>
              <td>{meal.name}</td>
              <td>{meal.cooktime}</td>
              <td>
                <Link to={`/meals/${meal._id}/edit/`}> <button className="btn btn-primary active">Edit</button></Link><span>&nbsp;&nbsp;</span>
                <Link to={`/meals/${meal._id}/details`}> <button className="btn btn-primary active">Detail</button></Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">
              <h1>Loading...</h1>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
  )
}

export default Meals
