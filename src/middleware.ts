import { withClerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req: NextRequest) => {
    return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
    matcher: [
        "/((?!_next/image|_next/static|favicon.ico|images|assets).*)",
        "/",
    ],
}
