// Logout user
const toggleSidebar = () => sessionStorage.setItem('menu', (prevstate) => !prevstate)

const layoutService = {
  toggleSidebar
}

export default layoutService