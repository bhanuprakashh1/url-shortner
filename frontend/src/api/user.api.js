import axiosInstance from "../utils/axiosInstance"

const loginUser = async (password, email) => {
    const { data } = await axiosInstance.post("/api/auth/login", { email, password })
    return data
}

const registerUser = async (name, password, email) => {
    const { data } = await axiosInstance.post("/api/auth/register", { name, email, password })
    return data
}

const logoutUser = async () => {
    const { data } = await axiosInstance.get("/api/auth/logout")
    return data
}

const getCurrentUser = async () => {
    const { data } = await axiosInstance.get("/api/auth/me")
    return data
}

const getAllUserUrls = async () => {
    const { data } = await axiosInstance.post("/api/user/urls")
    return data
}

export { loginUser, registerUser, logoutUser, getCurrentUser, getAllUserUrls }