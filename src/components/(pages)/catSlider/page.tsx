import getAllCats from '@/api/getCats.api'
import { log } from 'console'
import CatsSlidering from '../catsSidering/page'


export default async function CatSlider() {

    const {data}=await getAllCats()
    log(data)
  return (
    <>
    <div className='w-[90%]'>
        <h2 className='w-full text-center py-5 text-3xl text-green-600 shadow rounded-2xl my-3'>Categories</h2>

     <CatsSlidering data={data}/>
      
    </div>
    </>
  )
}
