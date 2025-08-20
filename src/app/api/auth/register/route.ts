import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      phoneNumber,
      firstName,
      lastName,
      cooperativeId,
      password,
      confirmPassword,
    } = await request.json();

    // Validate input
    if (
      !email ||
      !phoneNumber ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email or phone number already exists",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await AuthService.hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        firstName,
        lastName,
        cooperativeId,
        role: "FARMER", // Default role
        // Note: We need to add password field to our schema
        // password: hashedPassword,
      },
      include: {
        cooperative: true,
      },
    });

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
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
