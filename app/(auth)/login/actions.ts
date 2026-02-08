/**
 * RATIONALE FOR USING SERVER ACTIONS FOR AUTH:
 * 1. BYPASS CORS RESTRICTIONS: Browsers block cookies from APIs using "Access-Control-Allow-Origin: *" 
 *    when credentials are required. Node.js (server-side) ignores these browser-level CORS enforcements.
 * 2. BYPASS HttpOnly RESTRICTIONS: The backend sets the session token as an 'HttpOnly' cookie.
 *    Client-side JavaScript cannot read this header, but the server can inspect the 'Set-Cookie' 
 *    header directly to extract the token for manually syncing to the client.
 */
"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us";
  
  try {
    const response = await fetch(`${apiUrl}/website/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resBody = await response.json();
    const headers = response.headers;
    
    // Node.js fetch allows us to see all headers, including Set-Cookie
    let token = headers.get("x-auth-token") || headers.get("token");
    
    // If not in headers, manually parse it from Set-Cookie
    if (!token) {
      const setCookie = headers.get("set-cookie");
      if (setCookie) {
        const tokenMatch = setCookie.match(/token=([^;]+)/);
        if (tokenMatch) {
          token = tokenMatch[1];
        }
      }
    }

    // Fallback: search in response body if the backend included it there too
    if (!token) {
      token = resBody?.data?.token || resBody?.token;
    }

    if (!response.ok) {
      return { 
        success: false, 
        error: resBody?.message || resBody?.data?.message || "Login failed" 
      };
    }

    if (token) {
      // Set the token in a browser-accessible cookie if we want (or just return it to client)
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return {
        success: true,
        user: resBody?.data || resBody,
        token: token,
      };
    }

    return { 
      success: false, 
      error: "Authentication successful, but no session token was found." 
    };

  } catch (error: any) {
    console.error("Server Action Login Error:", error);
    return { 
      success: false, 
      error: error.message || "A network error occurred during login." 
    };
  }
}
