'use client'
export const PostForm = () => {
    const submitFunction = async(e: any) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const formData = Object.fromEntries(data.entries())
        console.log(formData)
        const res = await fetch('/api/post', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST"
        })
        const result = await res.json()
    }
  return (
    <form onSubmit={submitFunction}>
        <input name='title' type='text'/>
        <input name='snippet' type='text'/>
        <input name='image' type='text'/>
        <input name='body' type='text'/>
        <input name='timestamp' type='date'/>
        <button type="submit">Wyślij</button>
    </form>
  )
}