import React from "react";
import Search from "../components/forms/Search";
import Jumbotron from "../components/cards/Jumbotron";


const Lab = () => {
    return (
        <>
          <div className="jumbotron text-primary h1 font-weight-bold text-center">
            <Jumbotron text={["LAB PAGE"]} />
          </div>
    
          <div className="container">
            <div className="row">
                <div className="col md-1">
              
                    <Search />
               
                </div>
                
            </div>
          </div>
        </>
      );
}

export default Lab;