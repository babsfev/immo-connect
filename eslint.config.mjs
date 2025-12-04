import nextLint from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    extends: [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
    ],
    plugins: {
      "@next/next": nextLint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error",
    },
  }
);