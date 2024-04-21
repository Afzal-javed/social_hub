
const Button = ({ type, btnName, onClick, btnStyle }) => {
    return (
        <button type={type} onClick={onClick} className={` bg-black text-white  transition ease-in-out hover:-translate-y-110 hover:scale-110 duration-300 ${btnStyle}`}>{btnName}</button>

    )
}

export default Button