import React from 'react'

function FirstBanner(data) {
    console.log(data)
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                     <h3>sir {data.data}</h3>
                     <p>Course {}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default FirstBanner