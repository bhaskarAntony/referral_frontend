import React from 'react'

function WhyShouldRefer() {
    const data = [
        'Help individuals discover a top-notch learning experience at Be Practical',
        'Receive rewards and good karma points for referring friends or colleagues to Be Practical.',
        'Become an enabler for individuals to enhance their career prospects through the Be Practical learning program.',
        'Empower individuals to get the right kind of mentorship via Be Practical top-rated mentors.',
        'Become a co-creator of the Be Practical community with top professionals from across the tech industry.'
    ]
  return (
   <div className="bg-light  py-4">
     <section className="container p-3 p-md-2">
        <div className="row">
            <div className="col-md-6">
                <img src="https://img.freepik.com/premium-vector/group-business-people-silhouette-businesspeople-walk-step-forward-abstract-background_48369-15949.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid" alt="" className="w-100 rounded" />
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
                <h1 className="fs-3 fw-bold"><span className="text-primary">Why</span> should I refer?</h1>

                <ul className="mt-3" style={{padding:'0', marginLeft:'15px'}}>
                    {
                        data.map((item, index)=>(
                            <li className="fs-5 mt-2">{item}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </section>
   </div>
  )
}

export default WhyShouldRefer