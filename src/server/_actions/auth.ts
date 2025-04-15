"use server";
import { loginSchema, signupSchema } from "@/app/validations/auth";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/transilation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
export const login = async (
  credentials: Record<"email" | "password", string> | undefined,
  locale: Locale
) => {
  const translations = await getTrans(locale);
  const result = loginSchema(translations).safeParse(credentials);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return { message: translations.messages.userNotFound, status: 401 };
    }
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(
      result.data.password,
      hashedPassword!
    );
    if (!isValidPassword) {
      return {
        message: translations.messages.incorrectPassword,
        status: 401,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: translations.messages.loginSuccessful,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const signUp = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = signupSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        formData,
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${createUser.id}/${Pages.EDIT}`)
    return {
      status: 201,
      message: translations.messages.accountCreated,
      user: {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
