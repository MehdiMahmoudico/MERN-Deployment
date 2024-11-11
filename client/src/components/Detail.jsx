import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [Onemeal, setOnemeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/meals/${id}`)
      .then((res) => {
        console.log(res.data);
        setOnemeal(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const deleteme = (id) => {
    axios
      .delete(`http://localhost:8000/api/meals/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Link to={`/`}>
        {" "}
        <button className="btn btn-primary active mb-3 mt-3">Back Home</button>
      </Link>

      <div className="card">
        <div className="card-header d-flex justify-content-between">
          {Onemeal ? <h3>{Onemeal.name} </h3> : "Loading..."}
          {Onemeal && (
            <button
              className="btn btn-primary active"
              onClick={() => deleteme(Onemeal._id)}
            >
              Delete
            </button>
          )}
        </div>
        <div key={Onemeal?._id} className="card-body">
          <div className="d-flex justify-content-center">
            <h5 className="card-title">Cook Time:</h5>
            <span>&nbsp;&nbsp;</span>
            <p className="card-text">
              {Onemeal ? Onemeal.cooktime + " " + "minutes" : "Loading..."}
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <h5 className="card-title">Ingredients List:</h5>
            <span>&nbsp;&nbsp;</span>
            <ul className="card-text">
              {Onemeal ? (
                Onemeal.ingredients[0].length > 0 || Onemeal.ingredients[1].length > 0 || Onemeal.ingredients[2].length > 0 ? (
                  Onemeal.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                ) : (
                  <li>No ingredients available</li>
                )
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
          <div className="d-flex justify-content-center">
            <h5 className="card-title">Directions:</h5>
            <span>&nbsp;&nbsp;</span>
            <p className="card-text">
              {Onemeal ? Onemeal.directions : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
