import getAllCats from '@/api/getCats.api'
import { log } from 'console'
import CatsSlidering from '../catsSidering/page'


export default async function CatSlider() {

    const {data}=await getAllCats()
    log(data)
  return (
    <>
    <div className='w-[90%]'>
        <h2 className='text-xl'>Categories</h2>

     <CatsSlidering data={data}/>
      
    </div>
    </>
  )
}
