import React from "react";

const ShowCar = ({results}) => {
    if (results === null) return null;
    if (results.length === 0) {
        return <p className="text-center text-gray-500 mt-4"> No results found</p>; 
    }

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
          {results.map((car) => (
            <div key={car.id} className="border p-3 rounded-lg shadow">
              <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
            </div>
          ))}
        </div>
      );
}
export default ShowCar;