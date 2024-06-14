"use client"

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import GradientsBg from '@/app/_data/GradientsBg'
import Styles from '@/app/_data/Styles'


const Controller = ({ setSelectedTheme, selectedBackground,setSelectStyle, saveChanges }) => {


  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]

  const [showMore, setShowMore] = useState(6)

  return (
    <div className='p-5 space-y-3' >
      {/* Theme selection controller   */}
      <h2> Themes</h2>
      <Select onValueChange={(value) => setSelectedTheme(value)} >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((item, i) =>

            <SelectItem key={i} value={item}>{item}</SelectItem>
          )
          }

        </SelectContent>
      </Select>

      {/* Backgroud selection controller  */}
      <h2 className='my-2 mt-8' > Background</h2>
      <div className='grid grid-cols-3 gap-3' >
        {
          GradientsBg.map((bg, i) => i < showMore && (

            <div
              key={i}
              className='w-full h-[50px] rounded-md text-center font-bold flex justify-center items-center border hover:border-2 hover:border-black cursor-pointer border-gray-400'
              style={{ background: bg.gradient }}
              onClick={() => selectedBackground(bg.gradient)}
            >{i == 0 && "None"} </div>
          )
          )
        }
      </div>
      <button onClick={() => setShowMore(showMore > 6 ? 6 : GradientsBg.length)} className='w-full btn btn-ghost' > {showMore > 6 ? "Show Less" : "Show more"} </button>

     <div>
     {/* border style  */}
     <div className='grid grid-cols-3 gap-3' >
      
       {
         Styles.map((st,i)=>(
           <div key={i} onClick={()=>setSelectStyle(st.style)} className={`flex items-center justify-center px-3 py-2 w-full h-[50px]  text-xs cursor-pointer `+st.style}  >{st.name} </div>
           ))
           }
          </div>

     </div>


      <button onClick={saveChanges} className='w-full btn btn-success' > Save </button>
    </div>
  )
}

export default Controller