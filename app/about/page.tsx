'use client';

import { ChangeEvent, useState } from 'react';

export default function About() {
  const [name, setName] = useState<string>()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1>This is about me</h1>
      <input name='name' onChange={handleInputChange} value={name}/>
    </main>
  )
}
