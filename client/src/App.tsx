import { useState } from 'react';
import {Login} from './components/Login';
import { Register } from './components/Register';
import { TabsList } from './components/TabsList';

function App() {
  const [form, setForm] = useState<'login' | 'register'>('login');

  const handleTabChange = (selectedForm: string) => {
    setForm(selectedForm.toLowerCase() as 'login' | 'register');
  }

  return (
    <>
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <TabsList 
        tabList={["LOGIN", "REGISTER"]} 
        onTabChange={handleTabChange} 
        activeTab={form}/>

        {form === 'login' && <Login/>}
        {form === 'register' && <Register/>}
      </div>
    </>
  )
}


export default App
