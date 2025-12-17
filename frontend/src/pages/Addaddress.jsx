import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/Appcontex'
import { toast } from 'react-hot-toast'

const InputField = ({ type, placeholder, name, handlechange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handlechange}
    name={name}
    value={address[name]}
    required
    className="border w-full p-2 rounded"
  />
)

const Addaddress = () => {
  const { axios, user, authLoading, navigate } = useAppContext()

  const [address, setAddress] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handlechange = (e) => {
    setAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onsubmithandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/address/add', { address })
      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // ✅ Wait for auth check
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/cart')
    }
  }, [authLoading, user, navigate])

  if (authLoading) return null // or loader

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onsubmithandler} className="space-y-3 mt-6 text-sm">

            <div className="flex gap-3">
              <InputField handlechange={handlechange} address={address} name="firstname" type="text" placeholder="First Name" />
              <InputField handlechange={handlechange} address={address} name="lastname" type="text" placeholder="Last Name" />
            </div>

            <InputField handlechange={handlechange} address={address} name="email" type="email" placeholder="Email" />
            <InputField handlechange={handlechange} address={address} name="street" type="text" placeholder="Street" />

            <div className="grid grid-cols-2 gap-4">
              <InputField handlechange={handlechange} address={address} name="city" type="text" placeholder="City" />
              <InputField handlechange={handlechange} address={address} name="state" type="text" placeholder="State" />
              <InputField handlechange={handlechange} address={address} name="zipcode" type="text" placeholder="Zip Code" />
              <InputField handlechange={handlechange} address={address} name="country" type="text" placeholder="Country" />
            </div>

            <InputField handlechange={handlechange} address={address} name="phone" type="text" placeholder="Phone Number" />

            <button className="bg-primary text-white px-4 py-2 rounded w-full">
              Save Address
            </button>

          </form>
        </div>

        <img className="md:mr-16" src={assets.add_address_iamge} alt="Add address" />
      </div>
    </div>
  )
}

export default Addaddress
