import jwt, { type JwtPayload } from "jsonwebtoken"

import type { IUser } from "../models/user.model.js"
import type { Request, Response, NextFunction } from "express"

export interface IAuthenticatedRequest extends Request {
    user?: IUser | null
}

export const isAuth = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please login - no auth header"
            })
            return
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            res.status(401).json({
                message: "Please login - token missing"
            })
            return
        }

        const decodedValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                message: "Invalid token"
            })
            return
        }

        req.user = decodedValue.user
        next()
    } catch (error) {
        res.status(500).json({
            message: "Please login - JWT error"
        })
    }
}
