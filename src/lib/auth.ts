import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, UserRole } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  cooperativeId?: string;
}

export class AuthService {
  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a password with its hash
   */
  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate a JWT token for a user
   */
  static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      cooperativeId: user.cooperativeId,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  /**
   * Verify and decode a JWT token
   */
  static verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Check if user has required role
   */
  static hasRole(user: User, requiredRole: UserRole): boolean {
    return user.role === requiredRole;
  }

  /**
   * Check if user has any of the required roles
   */
  static hasAnyRole(user: User, requiredRoles: UserRole[]): boolean {
    return requiredRoles.includes(user.role);
  }

  /**
   * Check if user is admin
   */
  static isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  /**
   * Check if user is cooperative staff
   */
  static isCooperativeStaff(user: User): boolean {
    return [UserRole.COOPERATIVE_STAFF, UserRole.ADMIN].includes(user.role);
  }

  /**
   * Check if user is farmer
   */
  static isFarmer(user: User): boolean {
    return user.role === UserRole.FARMER;
  }
}
