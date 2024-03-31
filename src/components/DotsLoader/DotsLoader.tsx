const DotsLoader = () => {
    return (
      <div className='fixed top-1/2 left-1/2 translate-x-[-52px] translate-y-[-45px]'>
        <div className='p-2 rounded-full'>
          <div className='dots-loader'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }
  
  export default DotsLoader
  
  // This component's animation is made with CSS.
  // Check 'dots-loader' in 'globals.css' for details
  