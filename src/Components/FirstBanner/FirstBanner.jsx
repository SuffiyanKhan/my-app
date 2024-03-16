import React, { memo, useEffect, useState } from 'react'
import { studentData } from '../../Context/Context'
import { useContext } from 'react'
import './FirstBanner.css'

function FirstBanner(data) {
  const [loader , setLoader] = useState(false)
  
  const getData = useContext(studentData)
  if (!getData) {
    setLoader(true)
    return <div>Loading...</div>;
  }
 
 const { TeacherName, CourseName, Days, Timing,   } = getData;

 return (
    <>
    {
      loader ? "data not found" : (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mt-4 bg-color w-100 py-5 px-5 rounded">
                     <h3 className='fs-2 text-uppercase text-color  fw-bold text-center'> {CourseName ? `Course ${CourseName}` : ""}</h3>
                     <p className='text-capitalize fw-semibold fs-5'>{TeacherName ? `Trainer By sir ${TeacherName}` : ""}</p>
                     <p className='text-capitalize fw-semibold '> { Days ? `Available Days are ${Days}` : "" }</p>
                     <p className='text-capitalize fw-semibold '> { Timing ? `Class timing ${Timing}` : "" }</p>
                </div>
            </div>
        </div>
      )
    }
    </>
  )
}

export default memo(FirstBanner)