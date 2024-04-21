import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export function middleware(req, res) {


    // Retrieve token from transformed cookies object
    // const name = req.cookies.__client_uat
    // console.log(token);
    const cookieStore = cookies();
    // console.log(cookieStore);
    const token = cookieStore.has("token");//.has return boolean while .get return key and value
    // const { value } = token;
    const { pathname } = req.nextUrl;
    if (!token && !['/login', '/register', '/resetPassword'].includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    } else if (token && (pathname === "/login" || pathname === "/register" || pathname === "/resetPassword")) {
        return NextResponse.redirect(new URL('/', req.url))
    } else {
        return NextResponse.next();
    }
}
export const config = {
    matcher: ['/', '/login', '/register', '/resetPassword', '/edit-profile', '/profile', '/uploadPost', '/friendProfile'],
}