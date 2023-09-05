type isValidEmailProps = (email: string) => boolean
const isValidEmail: isValidEmailProps = (email) => {
    return !!(email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
}
export default isValidEmail;