import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken"

const generateNanoId = (length) => {
    return nanoid(length);
}

const signToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
}

const verifyToken = (token) => {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    return decoded.id
}

export { generateNanoId, signToken, verifyToken }