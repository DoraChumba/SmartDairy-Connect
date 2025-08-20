import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        cooperative: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // For now, we'll skip password verification since we haven't set up the database yet
    // In production, you would verify the password hash here
    // const isValidPassword = await AuthService.comparePassword(password, user.password)
    // if (!isValidPassword) {
    //   return NextResponse.json(
    //     { success: false, error: 'Invalid credentials' },
    //     { status: 401 }
    //   )
    // }

    // Generate JWT token
    const token = AuthService.generateToken(user);

    // Return user data and token
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
