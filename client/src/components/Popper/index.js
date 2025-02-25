import './popper.css'

function Popper({children, className}) {
    return ( 
        <div className='popper-wrapper'>
            {children}
        </div>
     );
}

export default Popper;