import { useNavigate } from "react-router-dom"

const navigateToPreviousPage = () => {
    const navigate = useNavigate(); 
    const goBack = () => {
        navigate(-1)
    };

    return { goBack };

}

export { navigateToPreviousPage }