import React from 'react'

export default function Submit() {
    return (

        <div className='text-center py-5'>

        {
            success ?
         
                <div>
                    <CheckCircleIcon style={{color:'green'}} />
                    <div>Result Added.</div>
                </div>
            :
      
                <SubmitBtn 
                    label='Submit Result'
                    handleSubmit={handleSubmitResult}
                    disabled={btnDisable}
                    submitDisabled={loading}
                    progressStyle={{left:'41%',top:'20%'}}
                />
            
        }


    </div>
    )
}
