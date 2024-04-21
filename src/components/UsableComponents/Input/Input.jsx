
const Input = ({ label, htmlFor, type, name, value, onChange, placeholder }) => {
    return (
        <div className="w-full flex flex-col items-center gap-2 p-3 relative">
            <label htmlFor={htmlFor} className="w-full text-start text-lg">{label}</label>
            <input type={type} id={htmlFor} name={name} value={value} required onChange={onChange} placeholder={placeholder} className="w-full p-1.5 outline-none text-lg border-b border-black" />
        </div>
    )
}

export default Input