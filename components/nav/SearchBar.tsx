'use client'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex items-center'>
     <input
      autoComplete='off'
      type='text'
      placeholder='Explore RippleStore'
      className='p-2 border-gray-300 rounded-1-md focus:outline-none focus:border-[0.5px] focus:border-slate-500'/>
     <button className='bg-slate-700 hover:opacity-80 text-white p-2 rounded-md'>Search </button>
    </div>
  )
}

export default SearchBar