import React from 'react';
import './form.style.css';

const Form = props => {
    return (
        <div className="contianer">
            <div>{props.error ? error(): null}</div>
            <form onSubmit={props.loadweather}>
            <div className="row">
                <div className="col-md-3 offset-md-2">
                    <input 
                    type="text" 
                    placeholder="City"
                    className="form-control" 
                    name="city" 
                    autoComplete="on"/>
                </div>
                <div className="col-md-3">
                    <input 
                    type="text" 
                    placeholder="Country"
                    className="form-control" 
                    name="country" 
                    autoComplete="on"/>
                </div>
                <div className="col-md-3 mt-2">
                    <button className="btn btn-warning mt-md-0 text-md-left">Get Weather</button>
                </div>
            </div>
        </form>
        </div>
    );
};

function error(){
    return (
        <div className="alert alert-danger mx-5" role="alert">Please Enter Location</div>
    )
}

export default Form;