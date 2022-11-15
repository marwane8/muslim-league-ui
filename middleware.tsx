import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { JWT_KEY } from "./utils/api/api-utils";

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token');
    
    if (request.nextUrl.pathname.startsWith('/login')){
        if(token==="") return NextResponse.next()

        if(token) {
            try {
                await jwtVerify(token, new TextEncoder().encode(JWT_KEY))
                return NextResponse.redirect(new URL('/admin', request.url));
            } catch(e) {
                console.error("/login JWT Verification Failed: ", e)
                return NextResponse.next();
            }
        }            
    }

    if (request.nextUrl.pathname.startsWith('/admin')){
        if(token === undefined) {
            return NextResponse.redirect(new URL('/login', request.url) )
        } else {
            try {
                const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_KEY))
                if (!payload.admin) {
                    //TODO: Make a not an admin page
                    return console.log('Not an Admin')
                }
            } catch(e) {
                console.error("/admin JWT Verification Failed: ", e)
                return NextResponse.redirect(new URL('/login', request.url) )
            }
        }
    }
}

export const config = {
    matcher: ['/admin/:path*','/login']
}