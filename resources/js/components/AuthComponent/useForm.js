import React, { useState } from 'react'

export default function useForm({formData, setFormData}) {


    const handleFieldChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = () => {

      }

    return {handleFieldChange}
}
