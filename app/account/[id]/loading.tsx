export default async function Loading() {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
        background: "#262626",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: "99999999999"
    }}>
        <h1 color="white">Loading...</h1>
    </div>
  )
}